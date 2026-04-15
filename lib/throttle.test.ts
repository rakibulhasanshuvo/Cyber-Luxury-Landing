import { describe, it, expect, beforeEach, vi } from "vitest";
import { throttle } from "./throttle";

describe("throttle utility", () => {
  beforeEach(() => {
    // @ts-ignore
    globalThis.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
      return setTimeout(() => cb(Date.now()), 16) as unknown as number;
    });
    // @ts-ignore
    globalThis.cancelAnimationFrame = vi.fn((id: number) => {
      clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    });
  });

  it("should call the function at most once per animation frame", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(0);

    await new Promise(resolve => setTimeout(resolve, 32));
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    await new Promise(resolve => setTimeout(resolve, 32));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should pass arguments to the throttled function", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn);

    throttled("arg1", 123);
    await new Promise(resolve => setTimeout(resolve, 32));

    expect(fn).toHaveBeenCalledWith("arg1", 123);
  });

  it("should be able to cancel the throttled call", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn);

    throttled();
    throttled.cancel();

    await new Promise(resolve => setTimeout(resolve, 32));
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("should allow calling again after an animation frame", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn);

    throttled();
    await new Promise(resolve => setTimeout(resolve, 32));
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    await new Promise(resolve => setTimeout(resolve, 32));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should only execute the first call among multiple calls in the same frame", async () => {
    const fn = vi.fn();
    const throttled = throttle(fn);

    throttled(1);
    throttled(2);
    throttled(3);

    await new Promise(resolve => setTimeout(resolve, 32));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);
  });
});
