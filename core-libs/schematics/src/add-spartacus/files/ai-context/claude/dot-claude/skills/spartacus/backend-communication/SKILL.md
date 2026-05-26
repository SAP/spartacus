---
name: backend-communication
description: Use this skill when wiring a service to the backend in a Spartacus app, adding an OCC endpoint, configuring `backend.occ.endpoints`, or anywhere `HttpClient` is being introduced. Explains the layered Component → Facade → Connector → Adapter → Converter pipeline that all backend communication must go through.
---

<!-- spartacus-version: 221121.7.0 -->

# Backend Communication

## Rule

NEVER inject `HttpClient` in components or services. All backend communication goes through a layered pipeline:

```
Component → Facade → Store (NgRx) → Connector → Adapter → Converter
```

Only **Adapters** use `HttpClient`. Each layer has a specific role:

- **Facade** — Public API consumed by components. Hides internal complexity.
- **Connector** — Thin delegation layer injecting the abstract Adapter.
- **Adapter** — Abstract class in `connectors/`, OCC implementation in `occ/adapters/`. This is the ONLY layer that uses `HttpClient`.
- **Converter** — Transforms data between backend and UI models. Normalizers (backend→UI) and Serializers (UI→backend) are registered as `multi: true` providers on typed `InjectionToken`s.

## OCC Endpoint Configuration

NEVER hardcode endpoint URLs. Configure them via `provideConfig`:

```typescript
provideConfig({
  backend: {
    occ: {
      endpoints: {
        myEndpoint: 'my-resource/${resourceId}?fields=DEFAULT',
      }
    }
  }
})
```

In the adapter, resolve URLs using `OccEndpointsService`:

```typescript
this.occEndpoints.buildUrl('myEndpoint', { urlParams: { resourceId } })
```

## When creating a new backend integration

Create these files:

1. **Model** — TypeScript interface for the UI model
2. **Adapter (abstract)** — Abstract class defining the contract
3. **OCC Adapter** — Implementation using `HttpClient` and `OccEndpointsService`
4. **Connector** — Injects and delegates to the adapter
5. **Facade** — Public API for components, uses the connector (via NgRx or Commands/Queries)
6. **Normalizer** (optional) — Implements `Converter<OccModel, UiModel>`, registered with a typed `InjectionToken`

## Anti-pattern

```typescript
// ❌ Component injects HttpClient directly — bypasses every layer
//    (no facade, no connector, no adapter, no converter, no NgRx caching,
//    no normalizer hook, no SSR transfer-state, no auth interceptor by default).
@Component({ /* ... */ })
export class LoyaltyPointsComponent implements OnInit {
  private http = inject(HttpClient);
  points = 0;

  ngOnInit() {
    this.http
      .get<{ points: number }>('/occ/v2/electronics-spa/users/current/loyalty')
      .subscribe((res) => (this.points = res.points));
  }
}
```

```typescript
// ✅ Component talks to a facade. The facade hides the connector/adapter
//    pipeline behind a stable public API.
@Component({ /* ... */ })
export class LoyaltyPointsComponent {
  private loyaltyFacade = inject(LoyaltyFacade);
  points$ = this.loyaltyFacade.getPoints();
}

// ✅ Adapter — the only layer that touches HttpClient and OccEndpointsService
@Injectable({ providedIn: 'root' })
export class OccLoyaltyAdapter implements LoyaltyAdapter {
  private http = inject(HttpClient);
  private occEndpoints = inject(OccEndpointsService);
  private converter = inject(ConverterService);

  load(userId: string): Observable<LoyaltyPoints> {
    return this.http
      .get<OccLoyaltyPoints>(this.occEndpoints.buildUrl('loyalty', { urlParams: { userId } }))
      .pipe(this.converter.pipeable(LOYALTY_NORMALIZER));
  }
}
```

Consequences of bypassing the pipeline: configured `backend.occ.endpoints` overrides have no effect, normalizers don't run, SSR transfer-state and auth interceptors are skipped, and the URL is hardcoded so it can't be rewritten per environment.

## Codebase reference

Look at how Product data flows for a complete example, all from `@spartacus/core`:
- `ProductService` — facade
- `ProductConnector` — connector
- `ProductAdapter` — abstract adapter
- `OccProductAdapter` — OCC implementation
- `OccEndpointsService`, `ConverterService`, `PRODUCT_NORMALIZER` — supporting tokens
