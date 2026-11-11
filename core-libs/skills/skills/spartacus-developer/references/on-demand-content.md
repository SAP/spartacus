# Build around the first visible use

Before writing the feature, list the content, media, data and code required by its initial state and the first action that needs each remaining item. Inspect the generated storefront, its actual CMS slot, and the imports of the supplied data or library. A component created on the homepage through a lazy CMS mapping still runs during homepage navigation. Keep the original host, link, content order, dimensions and navigation working as the shopper changes state.

## Media and data

- Render all required controls and labels. Bind the active item's artwork in one mounted view. For different crops, use one responsive picture with real source media conditions, a fallback image and reserved space. Give the visible leading image the appropriate priority. Create the other image elements, CSS background references and embedded media only on selection. Carousels that mount every slide, CSS hiding, and native lazy loading near the viewport can all start inactive transfers.
- Inspect real asset dimensions and encoded byte sizes. For customer-owned, oversized assets, produce responsive widths in the existing asset pipeline if permitted, preserve art direction, and set `sizes` from the rendered layout. Check `currentSrc`, decoded size, quality and transferred bytes at the target DPR. Use CMS rendition URLs when available. Reserving space and choosing the correct crop alone can still transfer an oversized original.
- Keep names, summaries and small lookup keys available for the initial view. Subscribe to the detail facade in the consuming view or on activation. Move transformations that parse or index the full response there too. Eager signal creation from an observable, an application initializer, resolver or an eager service constructor can start the work before a conditional template runs.
- If the project supplies separate lightweight and detailed resources, use the light resource for the initial view. For keyed detail reads, share successful results within the correct site, language, currency and customer context if the data contract permits reuse. Clear failed in-flight requests for retry. On quick selection changes, use the latest selection (for example, RxJS `switchMap`) and keep obsolete results out of the view.

For example, the selector can iterate lightweight labels while one image-bearing child receives the active item. Keep the selected item in sync with CMS updates; implement the widget's keyboard and focus contract.

```html
@for (item of items(); track item.id) {
  <button type="button" (click)="select(item.id)"
          [attr.aria-pressed]="item.id === selected()?.id">{{ item.label }}</button>
}
@if (selected(); as item) {
  <app-item-artwork [item]="item" />
}
```

## Optional UI and libraries

For an optional, substantial standalone Angular view, an eager host can own the interaction and use a deferred child. The host below uses `open = signal(false)`. Supply a unique `panelId` per instance. Render normal project translations for the illustrative labels.

```html
<button type="button" (click)="open.set(!open())"
        [attr.aria-expanded]="open()" [attr.aria-controls]="panelId">
  Details
</button>
<section [id]="panelId" [hidden]="!open()">
  @defer (when open()) {
    <app-item-details />
  } @loading {
    <p role="status">Loading details…</p>
  } @error {
    <p role="alert">Details could not be loaded.</p>
  }
</section>
```

Import the standalone child into the host's template scope. Its heavy runtime imports, data subscriptions and images belong in that child. An eager reference to the class elsewhere in the same file (including a view query) can defeat Angular's split. A default `@defer` trigger fires on idle. Choose an explicit trigger that matches first use and consider prefetch only when acceptable for that resource. Once activated, the block stays loaded. Here the section keeps its state across reopen. If closing should stop work or destroy the view, use the appropriate structural condition and teardown. For dialogs, retain the project's focus trapping, keyboard dismissal and return-focus behavior. [Angular deferred views](https://angular.dev/guide/templates/defer)

For a supplied JS engine or large static dataset, put the **literal dynamic import inside the first-use path**. Example inside an existing async handler:

```typescript
const { calculate } = await import('./detail-engine');
const detail = await calculate(input);
```

Keep the engine's runtime imports inside its module. Import shared types with `import type`. Leave a pending/error state and handle rapid requests according to the feature's contract. Starting the import while initializing the host defeats the boundary. A split moves download and evaluation to first use. Profile heavy computation there and use the [interaction guide](performance-interactions.md) if it blocks feedback. Keep inexpensive controls already needed at startup together.

## Overlap a slow first use with deliberate intent

When loading on the final action protects arrival but makes the result slow, look for an earlier **intentional change within the same workflow**. A meaningful first edit or committed choice can start the code transfer while the shopper continues. A page view, idle callback, scroll past the control or focus on the way to another control offers weaker evidence of intent. Keep optional bytes off the cold route. If no earlier interaction naturally exists, preserve direct activation and measure it.

Keep preparation free of business effects. The final action still reads the current inputs and performs the operation once. Preserve a direct path for someone who skips the earlier step. Skip optional preparation when the app's data-saving policy or the browser's supported `navigator.connection.saveData` indicates reduced data. A requested action can still load its requirements. A dynamic import already started may complete even if the shopper leaves. Share code across calls where appropriate and keep user-specific state scoped to its owner. [Network Information API](https://wicg.github.io/netinfo/#dom-networkinformation-savedata)

The [typed loader](../assets/intent-loader.ts) can be copied into the application when its existing code has no equivalent. Create it once on the feature instance:

```typescript
private readonly engine = createIntentLoader(() => import('./feature-engine'));

// Inside the meaningful change handler, after the state changes:
this.engine.prepare(allowEarlyTransfer);

// Inside the existing final-action handler, with its pending/error UI:
const { run } = await this.engine.get();
```

Compute `allowEarlyTransfer` in the browser from the existing app policy and supported data-saving signal. Keep a single shared import for both paths. If optional preparation fails, let activation try again through the project's error handling. Keep final-action errors visible. Validate immediate activation with no earlier input, repeated edits while loading, the updated final value, a repeat or reopen, and reduced-data mode. In Chrome check which phase first fetched the chunk and count body transfers. Compare both final-click-to-result and first-intent-to-result time under the same interaction cadence. A faster last click can simply mean the shopper waited earlier.

## Prove where it loaded

1. Build the production application with `ng build --configuration production --stats-json` or the project's equivalent and serve that exact output. Use the [browser verifier](browser-verification.md) to capture a cold landing, first use, close and reopen. Assert the real result, selected image and usable navigation in each applicable state. Unexpected early requests in DevTools have an initiator pointing to the host, stylesheet or preload responsible.
2. For an Angular application-builder/esbuild project, match a source module from the stats to the actual script requests. Give the helper a source path and the **name of the first-use phase in your plan**:

   ```sh
   node path/to/skill/scripts/trace-feature-chunks.mjs \
     --stats dist/storefront/stats.json --report browser-evidence/attempt-01.json \
     --input src/app/details/detail-engine.ts --first-use open-details
   ```

   It reports each matching output and the phase that first requested it per viewport. Inspect the emitted raw contribution and the companion chunk's full size. Pass `--asset-base /storefront/` if scripts are deployed under a subdirectory, or the full asset directory URL for a CDN. Use Chrome's Network **Transferred** column or a trace for compressed wire bytes. For API/media outside the module graph, add URL checks to the browser plan. Repeat with normal HTTP caching to check realistic reuse. Compare first use latency, actual content and initial load separately. Record the observed evidence whenever build stats or a working browser are unavailable. [Angular build options](https://angular.dev/cli/build) · [esbuild metadata](https://esbuild.github.io/api/#metafile)
