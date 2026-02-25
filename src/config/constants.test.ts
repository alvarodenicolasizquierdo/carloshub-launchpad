import { describe, it, expect, beforeEach } from "vitest";
import { getAppUrl, STORAGE_KEYS, APP_URLS } from "./constants";

describe("getAppUrl", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default URL when no overrides exist", () => {
    expect(getAppUrl("portal")).toBe(APP_URLS.portal);
  });

  it("returns empty string for unknown app with no override", () => {
    expect(getAppUrl("nonexistent")).toBe("");
  });

  it("accepts override from trusted .lovable.app domain", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify({ portal: "https://custom.lovable.app" }));
    expect(getAppUrl("portal")).toBe("https://custom.lovable.app");
  });

  it("returns lovable.app default when no override", () => {
    expect(getAppUrl("portal")).toBe("https://tht-carlos.lovable.app");
  });

  it("accepts override from trusted .lovable.dev domain", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify({ ai: "https://test.lovable.dev" }));
    expect(getAppUrl("ai")).toBe("https://test.lovable.dev");
  });

  it("accepts override from trusted .dnaventures.es domain", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify({ portal: "https://tht-carlos.dnaventures.es" }));
    expect(getAppUrl("portal")).toBe("https://tht-carlos.dnaventures.es");
  });

  it("rejects override from untrusted domain", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify({ portal: "https://evil.com/phish" }));
    expect(getAppUrl("portal")).toBe(APP_URLS.portal);
  });

  it("rejects non-http protocols", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify({ portal: "javascript:alert(1)" }));
    expect(getAppUrl("portal")).toBe(APP_URLS.portal);
  });

  it("falls back when override is not a string", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify({ portal: 12345 }));
    expect(getAppUrl("portal")).toBe(APP_URLS.portal);
  });

  it("falls back when stored JSON is an array", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify(["bad"]));
    expect(getAppUrl("portal")).toBe(APP_URLS.portal);
  });

  it("falls back when stored value is invalid JSON", () => {
    localStorage.setItem(STORAGE_KEYS.appUrls, "not-json{{{");
    expect(getAppUrl("portal")).toBe(APP_URLS.portal);
  });
});
