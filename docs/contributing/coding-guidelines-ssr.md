# Server-Side Rendering Coding Guidelines

The following guidelines are highly recommended when working with server-side rendering (SSR).

## Working with Global Objects

Do not access global objects that are available in the browser. For example, do not use the `window`, `document`, `navigator`, and other browser types, because they do not exist on the server. If you try to use them, or any library that uses them, it will not work. For most cases, it is better to inject `WindowRef` and then do additional checks. For example, you can check if `WindowRef.nativeWindow` is defined.

## Working with Timeouts

Limit or avoid using `setTimeout`. It slows down the server-side rendering process and should be removed from the `ngOnDestroy` method of your components.

For RxJs timeouts, cancel their stream on success, because they can slow down rendering as well.

## Manipulating the nativeElement

Do not manipulate the `nativeElement` directly. Instead, use the `Renderer2` and related methods. We do this to ensure that, in any environment, we are able to change our view. The following is an example:

```typescript
constructor(element: ElementRef, renderer: Renderer2) {
  renderer.setStyle(element.nativeElement, 'font-size', 'x-large');
}
```
## Using Transfer State Functionality

We recommend using transfer state functionality. The application runs XHR requests on the server, and then again on the client-side (when the application bootstraps). 

Use a cache that is transferred from the server to the client.

For more information, see [Configurable State Management](../../projects/core/src/state/docs/configurable-state-management.md).
