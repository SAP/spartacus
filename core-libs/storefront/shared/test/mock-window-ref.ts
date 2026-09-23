import { vi } from "vitest";

export class MockWinRef {
  localStorage = { setItem: vi.fn(), getItem: vi.fn(), removeItem: vi.fn() };

  sessionStorage = { setItem: vi.fn(), getItem: vi.fn(), removeItem: vi.fn() };

  location = { href: '' } as Location;

  get nativeWindow(): Window {
    return { location: this.location } as Window;
  }

  isBrowser(): boolean {
    return true;
  }
}
