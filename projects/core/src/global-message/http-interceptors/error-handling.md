# HTTP Error Handling

Spartacus is a decoupled JavaScript application that relies extensively on APIs to communicate with the back end. This communication takes place over HTTP, and whenever a request is made, there are many things that could go wrong, from simple network connectivity issues to very specific errors in the back end. As a result, every HTTP response from the back end contains a status. In some cases the status provides details about the error, while in other cases, the status just contains a status code (such as, 404 Not Found). Different errors are typically handled in different ways. Quite a number of errors should be shown to the end user, while others might only end up in the console logs.

Spartacus provides a number of "handlers" for standard error handling. You can customize these by overriding existing error handlers, or by adding new ones. Spartacus evaluates error handlers in an HTTP interceptor, and uses the first one that corresponds to the error response.

For full flexibility, you can use the standard Angular dependency injection (DI) system to customize or add error handlers.

## Status Codes

Spartacus supports standard error handlers for the following error status codes:

- 400 – `BAD_REQUEST`
- 403 – `FORBIDDEN`
- 404 – `NOT_FOUND`
- 409 – `CONFLICT`
- 502 – `BAD_GATEWAY`
- 504 – `GATEWAY_TIMEOUT`

If no handler is available, the `UNKNOWN` handler is returned.

You can write custom code to add your own, custom status codes.

## Providing Custom Error Handlers

The following example shows a standard implementation for a forbidden status code.

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

The handler is provided as a multi-provider for the `HttpErrorHandler` abstract super class. The `useExisting` property is explicitly used so that custom variants of the `ForbiddenHandler` can be injected.

Custom error handlers can be added in a similar fashion, either by adding new error handlers or by replacing existing ones.

If multiple handlers are provided, the first handler with a match on the `responseStatus` is used. To ensure that custom-provided handlers are always used, the handlers are initially sorted in reverse order at runtime.
