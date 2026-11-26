# Runtime Configuration - Request Flow Diagrams

These diagrams show how `/config.json` is fetched and consumed across the three supported
deployment topologies.

---

## CSR (browser-only, no SSR)

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Static Host
    participant O as OCC Backend

    B->>S: GET /index.html
    S-->>B: index.html (no ng-state)
    B->>S: GET /config.json
    S-->>B: OCC_BASE_URL, MEDIA_BASE_URL
    Note over B: getRuntimeEnvironment() parses config.json
    Note over B: provides RUNTIME_ENVIRONMENT before bootstrapApplication()
    B->>O: OCC API calls using OCC_BASE_URL from config.json
```

Note: In dev, `config.json` is served by `proxy.conf.js` bypass. In prod (New Hosting), it is served by Caddy on the same domain.

---

## SSR Path A - TransferState reuse (zero browser config fetch)

```mermaid
sequenceDiagram
    participant B as Browser
    participant E as Express Node SSR
    participant C as Config Endpoint CONFIG_URL
    participant A as Angular SSR CommonEngine
    participant O as OCC Backend

    B->>E: GET /
    Note over E: getServerRuntimeEnvironment per request not at startup
    E->>C: GET CONFIG_URL fresh never cached
    C-->>E: OCC_BASE_URL, MEDIA_BASE_URL
    E->>A: render indexHtml with RUNTIME_ENVIRONMENT provider
    Note over A: BEFORE_APP_SERIALIZED hook writes cx-runtime-config to TransferState
    A->>O: OCC API calls during SSR render
    O-->>A: data
    A-->>E: rendered HTML with ng-state script
    E-->>B: full HTML with ng-state
    Note over B: getRuntimeEnvironment detects ng-state, returns immediately
    Note over B: bootstrapApplication reads ENVIRONMENT from TransferState
    Note over B: no config.json request ever made by browser
    B->>O: subsequent OCC calls using OCC_BASE_URL from TransferState
```

---

## SSR Path B - SSR timeout, browser fetches config via Express proxy

```mermaid
sequenceDiagram
    participant B as Browser
    participant E as Express Node SSR
    participant C as Config Endpoint CONFIG_URL
    participant O as OCC Backend

    B->>E: GET /
    Note over E: getServerRuntimeEnvironment times out or errors
    E-->>B: plain CSR HTML no ng-state script
    Note over B: getRuntimeEnvironment finds no ng-state in DOM
    B->>E: GET /config.json via Express proxy route
    Note over E: reads CONFIG_URL on every request never cached
    Note over E: file scheme reads from disk, http scheme fetches upstream
    Note over E: secrets stripped, Cache-Control no-store
    E->>C: GET CONFIG_URL http or https only
    C-->>E: OCC_BASE_URL, MEDIA_BASE_URL
    E-->>B: filtered config.json
    Note over B: getRuntimeEnvironment parses response
    Note over B: provides RUNTIME_ENVIRONMENT before bootstrapApplication
    B->>O: OCC API calls using OCC_BASE_URL from config.json
```
