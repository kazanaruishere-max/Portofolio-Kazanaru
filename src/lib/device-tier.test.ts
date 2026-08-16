import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDeviceTier, type DeviceProfile } from "./device-tier";

function stubMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

function stubNavigator(cores: number, memory: number) {
  Object.defineProperty(navigator, "hardwareConcurrency", {
    configurable: true,
    get: () => cores,
  });
  Object.defineProperty(navigator, "deviceMemory", {
    configurable: true,
    get: () => memory,
  });
}

function stubWebGL(available: boolean) {
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = (() =>
    available ? ({} as RenderingContext) : null) as typeof HTMLCanvasElement.prototype.getContext;
  return () => {
    HTMLCanvasElement.prototype.getContext = orig;
  };
}

describe("getDeviceTier", () => {
  beforeEach(() => {
    stubMatchMedia(false);
    stubNavigator(8, 8);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("mengembalikan high untuk desktop high-end (fine pointer, 8 core, 8GB, webgl)", () => {
    const restore = stubWebGL(true);
    const profile: DeviceProfile = getDeviceTier();
    restore();
    expect(profile.tier).toBe("high");
    expect(profile.dprClamp).toBe(2);
    expect(profile.particleScale).toBe(1);
    expect(profile.reducedMotion).toBe(false);
    expect(profile.webglAvailable).toBe(true);
  });

  it("menurunkan tier untuk touch/mobile (pointer coarse)", () => {
    stubMatchMedia(true); // coarse pointer
    const restore = stubWebGL(true);
    const profile = getDeviceTier();
    restore();
    expect(["medium", "low"]).toContain(profile.tier);
    expect(profile.particleScale).toBeLessThan(1);
  });

  it("menurunkan tier untuk low cores (<= 4)", () => {
    stubNavigator(4, 8);
    const restore = stubWebGL(true);
    const profile = getDeviceTier();
    restore();
    expect(["medium", "low"]).toContain(profile.tier);
  });

  it("menurunkan tier untuk low memory (<= 4GB)", () => {
    stubNavigator(8, 4);
    const restore = stubWebGL(true);
    const profile = getDeviceTier();
    restore();
    expect(["medium", "low"]).toContain(profile.tier);
  });

  it("tier low saat semua constraint terpenuhi (coarse + 4 core + 4GB)", () => {
    stubMatchMedia(true);
    stubNavigator(4, 4);
    const restore = stubWebGL(true);
    const profile = getDeviceTier();
    restore();
    expect(profile.tier).toBe("low");
    expect(profile.particleScale).toBeLessThan(0.5);
  });

  it("default motion ON (reducedMotion false) meski prefers-reduced-motion OS aktif — first visit", () => {
    stubMatchMedia(true); // OS reduce
    const restore = stubWebGL(true);
    const profile = getDeviceTier();
    restore();
    expect(profile.reducedMotion).toBe(false);
  });

  it("reducedMotion true saat user eksplisit matikan motion (localStorage off)", () => {
    stubMatchMedia(true);
    window.localStorage.setItem("azka-motion", "off");
    const restore = stubWebGL(true);
    const profile = getDeviceTier();
    restore();
    expect(profile.reducedMotion).toBe(true);
  });

  it("webglAvailable false saat WebGL tidak tersedia", () => {
    const restore = stubWebGL(false);
    const profile = getDeviceTier();
    restore();
    expect(profile.webglAvailable).toBe(false);
  });

  it("aman dipanggil di server (window undefined)", () => {
    const realWindow = globalThis.window;
    vi.stubGlobal("window", undefined);
    const profile = getDeviceTier();
    expect(profile).toBeDefined();
    expect(profile.webglAvailable).toBe(true);
    vi.stubGlobal("window", realWindow);
  });
});
