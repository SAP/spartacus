# Web worker storage

The intent of this spike was to assess utilizing web workers for token storage.

## Web worker setup
Creating the web worker in an angular library is a challenge.  The web worker must be an accessible asset in the library package, then included as a separate chunk in the compiled angular application.

https://github.com/angular/angular-cli/issues/15059#issuecomment-747419154
An issue was opened 6 years ago for the angular library.  It is still sees occasional activity, but not much should be expected.  

Workaround may be possible using similar techniques as described in the comment.  Otherwise we will need additional boilerplate added to the projects consuming the spartacus libraries.


## Communication

### postMessage
Messages are async

Messages can be sent from main thread (controller) to sub-thread directly.  
Messages sent from sub-thread to controller can be listened to from all contexts via `window` event handlers.  This means messages could be listened in on by malicious scripts.


### MessageChannel
1-time exchange of Channel via `postMessage`

Provides the advantage of private replies from the web worker going only to MessageChannel object.  This differs from `postMessage` in that replies from a web worker would be listenable from the global context on the main thread.

Messages are async


## Async storage issues
`angular-oauth2-oidc` library does not support async storage for tokens, and is unlikely to eventually support.
See: https://github.com/manfredsteyer/angular-oauth2-oidc/issues/943

This poses an issue for bootstrapping, which also requires some synchronous operations.  Overhauling the login process for async token storage may require significant effort in testing and could affect performance by delaying bootstrapping process.

### Mitigation
Depends on the required information.  If it is just a boolean, we could use a synchronous storage to track if sensitive values are stored asynchronously.

We could pause bootstrapping until async storage is read and then operate in-memory synchronously, with any changes written to async storage for "eventual consistency" with in-memory and persistent storage.


## In-memory storage

Auth0 stores the refresh token ONLY in worker.  The worker makes the refresh call and returns only the token into the main thread.

Notes:
- requires silent auth
- token is requested by web worker

Pros:
- refresh token never exposed to main thread

Cons:
- async
- transient storage
- incompatible with `angular-oauth2-oidc` library




## IndexDb for persistent storage

This does not provide any improvement over localstorage.

pros:
- storage is persistent
Cons:
- async
- data accessible from main thread

# Results

I would caution against web workers.  There is reasonable difficulty in setup because initiating a web worker from a library is not directly supported, especially with the layers of compilation and transpilation.  

Additionally, the strategy does not provide significant security over in-memory storage without completely isolating the refresh token in the web worker.  We cannot manage this unless we drop the `angular-oauth2-oidc` library.


If we wish to use a web-worker based approach:
- use web worker for refresh token storage
  - refresh token will not be solely isolated to worker
- no persistence across page refreshes
- use MessageChannel for communication with worker

