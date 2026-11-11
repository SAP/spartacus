/**
 * Keep an optional module out of startup while sharing a pending or fulfilled
 * import between intentional preparation and the actual feature action.
 */
export function createIntentLoader<T>(load: () => Promise<T>) {
  let pending: Promise<T> | undefined;

  function get(): Promise<T> {
    if (!pending) {
      pending = Promise.resolve().then(load).catch((error: unknown) => {
        pending = undefined;
        throw error;
      });
    }
    return pending;
  }

  return {
    get,
    prepare(allowed: boolean): void {
      if (allowed) {
        // Preparation is optional. The requested action handles its own error.
        void get().catch(() => undefined);
      }
    },
  };
}
