# Runtime Configuration - Request Flow Diagrams

These diagrams show how `/config.json` is fetched and consumed across the three supported
deployment topologies.

---

## CSR (browser-only, no SSR)

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Static Host (Caddy / Dev Proxy)
    participant O as OCC Backend

    B->>S: GET /index.html
    S-->>B: index.html (no ng-state)
    B->>S: GET /config.json
    S-->>B: { OCC_BASE_URL, MEDIA_BASE_URL }
    Note over B: getRuntimeEnvironment() parses config.json<br/>provides RUNTIME_ENVIRONMENT before bootstrapApplication()
    B->>O: OCC API calls (using OCC_BASE_URL from config.json)
```

---

## SSR Path A - TransferState reuse (zero browser config fetch)

```mermaid
sequenceDiagram
    participant B as Browser
    participant E as Express (Node SSR)
    participant C as Config Endpoint (CONFIG_URL)
    participant A as Angular SSR (CommonEngine)
    participant O as OCC Backend

    B->>E: GET /
    Note over E: per-request: getServerRuntimeEnvironment(CONFIG_URL)
    E->>C: GET CONFIG_URL (fresh, never cached)
    C-->>E: { OCC_BASE_URL, MEDIA_BASE_URL }
    E->>A: render(indexHtml, { providers: [RUNTIME_ENVIRONMENT] })
    Note over A: provideEnvironmentServer() BEFORE_APP_SERIALIZED hook<br/>writes cx-runtime-config to TransferState
    A->>O: OCC API calls during SSR render
    O-->>A: data
    A-->>E: rendered HTML + <script id="ng-state">{cx-runtime-config:...}</script>
    E-->>B: full HTML with ng-state
    Note over B: getRuntimeEnvironment() detects ng-state → returns {} immediately<br/>bootstrapApplication() reads ENVIRONMENT from TransferState<br/>no /config.json request ever made by browser
    B->>O: subsequent OCC calls (OCC_BASE_URL from TransferState)
```

---

## SSR Path B - SSR timeout → browser fetches config via Express proxy

```mermaid
sequenceDiagram
    participant B as Browser
    participant E as Express (Node SSR)
    participant C as Config Endpoint (CONFIG_URL)
    participant O as OCC Backend

    B->>E: GET /
    Note over E: getServerRuntimeEnvironment() called but SSR times out or errors
    E-->>B: plain CSR HTML (no ng-state script)
    Note over B: getRuntimeEnvironment() - no ng-state found in DOM
    B->>E: GET /config.json (Express proxy route)
    Note over E: proxy route re-fetches CONFIG_URL upstream on every request (never cached)
    E->>C: GET CONFIG_URL
    C-->>E: { OCC_BASE_URL, MEDIA_BASE_URL }
    E-->>B: filtered config.json (secrets stripped)
    Note over B: getRuntimeEnvironment() parses response<br/>provides RUNTIME_ENVIRONMENT before bootstrapApplication()
    B->>O: OCC API calls (using OCC_BASE_URL from config.json)
```
