### Server Side Rendering (SSR) "Gotchas"

#### Do not access global objects available in browser 

- **window**, **document**, **navigator**, and other browser types - do not exist on the server - so using them, or any library that uses them will not work. For most cases you should inject WindowRef and do additional checks if, for example, *WindowRef.nativeWindow* is defined.

- Try to limit or avoid using setTimeout. It will slow down the server-side rendering process. Make sure to remove them in the ngOnDestroy method of your Components.

- Also for RxJs timeouts, make sure to cancel their stream on success, for they can slow down rendering as well.

#### Don't manipulate the nativeElement directly

- Use the Renderer2 and related methods

We do this to ensure that in any environment we're able to change our view.

```typescript
constructor(element: ElementRef, renderer: Renderer2) {
  renderer.setStyle(element.nativeElement, 'font-size', 'x-large');
}
```

#### Utilize transfer state functionality

The application runs XHR requests on the server & once again on the Client-side (when the application bootstraps)
Use a cache that's transferred from server to client. 

Please read [Configurable State Management](../../projects/core/src/state/docs/configurable-state-management.md) for more information.
