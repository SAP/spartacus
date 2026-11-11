# Responsive interactions without changing results

Use for expensive click handlers, filtering, ranking, parsing or large DOM updates. Start from the actual operation and its correctness contract; do not skip work, return fabricated answers, reduce the dataset or weaken precision to make a timing check pass.

Profile input delay, handler processing and presentation/rendering separately. Check the interaction that triggers the work and a second nearby control while it runs. [INP diagnosis](https://web.dev/articles/optimize-inp) helps distinguish a long task from expensive rendering. Reduce repeated calculations and DOM churn first; use stable identities and bounded rendering where the UX permits. OnPush reduces change-detection traversal, not synchronous computation.

## Yield bounded work

Publish immediate pending feedback, then yield before starting expensive browser work. `Promise.resolve()` only schedules a microtask; it does not yield to rendering/input. A single timer around the entire calculation merely moves the same long task. Split the actual loop into bounded slices, and split any individually expensive item too.

This browser-event helper preserves item order and the same per-item function. The small time slice is an example to tune from a trace, not a universal performance threshold:

```typescript
export async function yieldToBrowser(): Promise<void> {
  const scheduler = (globalThis as typeof globalThis & {
    scheduler?: { yield?: () => Promise<void> };
  }).scheduler;
  if (scheduler?.yield) await scheduler.yield();
  else await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

export async function mapInSlices<T, R>(
  items: readonly T[], compute: (item: T, index: number) => R,
  signal: AbortSignal,
): Promise<R[]> {
  signal.throwIfAborted();
  await yieldToBrowser(); // let the pending UI and queued input progress
  const output: R[] = [];
  let deadline = performance.now() + 8;
  for (let i = 0; i < items.length; i++) {
    signal.throwIfAborted();
    output.push(compute(items[i], i));
    if (performance.now() >= deadline) {
      await yieldToBrowser();
      signal.throwIfAborted();
      deadline = performance.now() + 8;
    }
  }
  signal.throwIfAborted();
  return output;
}
```

For an aggregation, retain the original accumulator and iteration order across slices (including rounding and tie-breaking); do not substitute independent per-item results when the algorithm has cross-item state. A final synchronous sort or render can still dominate: profile it too. `scheduler.yield()` has a timer fallback here; neither promises a particular paint deadline. Verify visible feedback and the second control in the browser.

The component owns cancellation and state. For example, with Angular signals and OnPush, an event handler can set `pending` synchronously and await the sliced function. Cancel the previous run on a new request and on destruction; a stale run must not overwrite current data, errors or pending state:

```typescript
// Component fields; import signal, inject and DestroyRef from @angular/core.
readonly pending = signal(false);
readonly result = signal<number[]>([]);
readonly error = signal<string | null>(null);
private active?: AbortController;
constructor() {
  inject(DestroyRef).onDestroy(() => this.active?.abort());
}

async calculate(items: readonly number[]): Promise<void> {
  this.active?.abort();
  const run = new AbortController();
  this.active = run;
  this.pending.set(true);
  this.error.set(null);
  try {
    const output = await mapInSlices(items, (value) => this.score(value), run.signal);
    if (this.active === run && !run.signal.aborted) this.result.set(output);
  } catch (error) {
    if (this.active === run && !run.signal.aborted) {
      this.error.set(this.toUserMessage(error)); // localized application error
    }
  } finally {
    if (this.active === run) this.pending.set(false);
  }
}
```

`score` is the unchanged pure business function; `toUserMessage` preserves the application's error handling/i18n. Keep a clear cancel/error state and avoid hiding a valid previous result unless the requested UX calls for it. Invoke browser scheduling from a browser interaction, not unguarded during SSR; see [ssr-safety.md](ssr-safety.md). For RxJS-owned work, use an Observable teardown that aborts the operation; `switchMap` alone does not cancel an already running Promise or CPU loop.

## Move sustained CPU work to a worker when appropriate

A worker is useful when computation remains expensive despite slicing, not as a default for trivial clicks. Use the application's bundler-supported worker setup; feature-detect `Worker` in the browser and keep a sliced fallback for unsupported/SSR environments. Pass serializable inputs and return the same result schema; never access DOM or Angular injectors inside the worker.

```typescript
// calculation.worker.ts — use the same pure algorithm as the existing code.
import { calculateExact } from './calculation';
addEventListener('message', ({ data }) => {
  try {
    postMessage({ id: data.id, ok: true, result: calculateExact(data.input) });
  } catch {
    postMessage({ id: data.id, ok: false, error: 'calculation_failed' });
  }
});

// Browser-side operation; call only after the browser/Worker support guard.
function calculateInWorker<I, R>(input: I, id: number, signal: AbortSignal): Promise<R> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const worker = new Worker(new URL('./calculation.worker', import.meta.url), {
      type: 'module',
    });
    const cleanup = () => {
      signal.removeEventListener('abort', cancel);
      worker.terminate();
    };
    const fail = (error: unknown) => { cleanup(); reject(error); };
    const cancel = () => fail(signal.reason);
    signal.addEventListener('abort', cancel, { once: true });
    worker.onmessage = ({ data }) => {
      if (data.id !== id) return;
      if (!data.ok) { fail(new Error(data.error)); return; }
      cleanup();
      resolve(data.result as R);
    };
    worker.onerror = () => fail(new Error('worker_failed'));
    worker.addEventListener('messageerror', () => fail(new Error('worker_message_failed')));
    try { worker.postMessage({ id, input }); } catch (error) { fail(error); }
  });
}
```

Use `addEventListener` for `messageerror`: some browsers do not expose the handler property. The [event has limited browser support](https://developer.mozilla.org/en-US/docs/Web/API/Worker/messageerror_event), so verify error paths in the supported browsers.

On the caller side, handle `message`, `error` and `messageerror`; settle pending state for success and failure, ignore stale request IDs, and terminate/release workers on cancellation and component destruction. A cancel message cannot interrupt a worker's uninterrupted synchronous loop: terminate a per-operation worker, or make the worker itself cooperatively yield/check cancellation. Avoid leaking listeners or workers across repeated interactions. Test rapid repeat requests, cancel, worker failure and fallback with the same exact-output oracle.

Verify correctness and responsiveness independently: compare full results/order against the original algorithm, then use a performance trace or Event Timing/paint observation to show feedback and other controls can respond during work. Execute [browser acceptance](browser-verification.md) when the preview/tools are available; do not stop after finding a yield or worker in the source. Report lab interaction timing as such; do not label one synthetic click a field INP improvement. See [Angular worker setup](https://angular.dev/ecosystem/web-workers), [scheduler.yield](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/yield) and [subscriptions](subscriptions.md).
