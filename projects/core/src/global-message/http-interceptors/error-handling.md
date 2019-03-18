# HTTP Error Handling

Like any decoupled JS application, Spartacus relies heavily on back end APIs to fuel the storefront. The back end APIs are used over HTTP. Whenever an HTTP request is done, there are several things that can go wrong. From simple network connectivity issues to very specific errors at the back end. In order to handle the back end responses, an HTTP response contains a status.

Some of the http responses might provide more details on the error, where others only provide a status (code).
Different errors are typically handled in different ways. Quite a number of errors should be shown to the end users, where others might only end up in the console logs.

Spartacus has implemented a number of standard error *handlers*. These handlers provide the standard error handling in Spartacus. This error handling is coupled to the Spartacus UI and would be a potential area of customization by customers. In order to allow for custom error handler, Spartacus provides a way to override existing handlers and add new handlers. The handlers are evaluated in an http interceptor, the (first) corresponding handlers is used to *handle* the error response.

In order to allow for full flexibility, error handlers can be customized or added, using the standard Angular dependency injection (DI) system.

## Status Codes

Spartacus supports standard error handlers for the following error status codes:

- 400 – `BAD_REQUEST`
- 403 – `FORBIDDEN`
- 404 – `NOT_FOUND`
- 409 – `CONFLICT`
- 502 – `BAD_GATEWAY`
- 504 – `GATEWAY_TIMEOUT`

If no handler is available, the `UNKNOWN` handler is returned.

Custom status codes can be added in custom code.

## Provide (custom) Error Handlers

### Example

The example below shows a standard implementation for a forbidden status code.

```typescript
@Injectable({
  providedIn: 'root'
})
export class ForbiddenHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.FORBIDDEN;

  handleError() {
    this.globalMessageService.add({
      type: GlobalMessageType.MSG_TYPE_ERROR,
      text: 'You are not authorized to perform this action.'
    });
  }
}

```

The handler is registered in the DI system with the following snippet:

```typescript
{
    provide: HttpErrorHandler,
    useExisting: ForbiddenHandler,
    multi: true
},
```

The handler is provided as a multi provider for the `HttpErrorHandler` abstract super class. The `useExisting` property is explicetly used so that custom variants of the `ForbiddenHandler` can be injected.

Custom error handlers can be added in a similar fashion, either by adding new error handlers or by replacing existing.

If multiple handlers are provided, the first handler with a match on the `responseStatus` will be used. In order to always use the custom provided handlers, the handlers are sorted in reverse order initially at runtime.
