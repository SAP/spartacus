# Backend Communication

## Rule

NEVER inject `HttpClient` in components or services. All backend communication goes through a layered pipeline:

```
Component → Facade → state layer → Connector → Adapter → Converter
```

The **state layer** is NgRx in older features and the Commands/Queries services in newer ones — match whichever the feature already uses (see the `state-management` skill). Only **Adapters** use `HttpClient`. Each layer has a specific role:

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
//    (no facade, no connector, no adapter, no converter, no normalizer
//    hook, no OCC endpoint resolution, no state-layer caching/reuse).
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

## Debugging an existing endpoint

To see the exact URL Spartacus builds for a configured endpoint:

```typescript
inject(OccEndpointsService).buildUrl('product', { urlParams: { productCode: '123' } });
```

To inspect every configured OCC endpoint at runtime, log the merged config (see the `configuration` skill for the full debug flow):

```typescript
inject(ConfigurationService).unifiedConfig$.subscribe((c) =>
  console.log(c.backend?.occ?.endpoints)
);
```

## Source reference (in `node_modules/@spartacus/*`)

Look at how Product data flows for a complete example, all from `@spartacus/core`:
- `ProductService` — facade
- `ProductConnector` — connector
- `ProductAdapter` — abstract adapter
- `OccProductAdapter` — OCC implementation
- `OccEndpointsService`, `ConverterService`, `PRODUCT_NORMALIZER` — supporting tokens
