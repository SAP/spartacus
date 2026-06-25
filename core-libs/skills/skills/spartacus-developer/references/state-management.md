# State Management

## Rule

Spartacus uses two state management patterns. When customizing a feature, MATCH the pattern used by the existing Spartacus code in that feature. Do NOT introduce a third pattern (e.g., plain `BehaviorSubject` or custom state services).

## NgRx pattern

Actions, Effects, Reducers, Selectors. Facades dispatch actions and select from the store. Effects call connectors.

Used by: **Product, Cart, CMS, Auth, Site Context**

## Commands/Queries pattern

`CommandService` and `QueryService` replace NgRx for newer features. Commands wrap imperative operations; Queries hold `QueryState<T>` with loading/error/data.

Used by: **Checkout, User Account, User Profile, Quote, Customer Ticketing**

### Command example

```typescript
protected myCommand: Command<Payload, Result> = this.commandService.create(
  (payload) =>
    this.userIdService.takeUserId(true).pipe(
      switchMap((uid) => this.myConnector.doSomething(uid, payload))
    ),
  { strategy: CommandStrategy.Queue }
);
```

### Query example

```typescript
protected myQuery: Query<MyData> = this.queryService.create(
  () => this.userIdService.takeUserId(true).pipe(
    switchMap((userId) => this.myConnector.getData(userId))
  ),
  { reloadOn: [MyDataChangedEvent], resetOn: [LoginEvent, LogoutEvent] }
);
```

## How to detect which pattern a feature uses

Look at the facade's service implementation in `node_modules/@spartacus/`:
- If it dispatches NgRx actions and selects from store → NgRx
- If it uses `CommandService`/`QueryService` → Commands/Queries

## Anti-pattern

```typescript
// ❌ Hand-rolled BehaviorSubject for a feature that already has a facade.
//    No caching across components, no integration with reloadOn/resetOn
//    events, no replay for late subscribers, no SSR transfer-state.
@Injectable({ providedIn: 'root' })
export class GiftCardService {
  private http = inject(HttpClient);
  private balance$ = new BehaviorSubject<number | null>(null);

  load(userId: string) {
    this.http
      .get<{ balance: number }>(`/occ/v2/users/${userId}/giftcard`)
      .subscribe((res) => this.balance$.next(res.balance));
  }

  getBalance(): Observable<number | null> {
    return this.balance$.asObservable();
  }
}
```

```typescript
// ✅ Query — declarative, deduped, integrates with the event system.
//    Resets on logout, reloads when the gift-card balance event fires.
@Injectable({ providedIn: 'root' })
export class GiftCardFacade {
  protected queryService = inject(QueryService);
  protected userIdService = inject(UserIdService);
  protected giftCardConnector = inject(GiftCardConnector);

  protected balanceQuery: Query<number> = this.queryService.create(
    () =>
      this.userIdService
        .takeUserId(true)
        .pipe(switchMap((uid) => this.giftCardConnector.getBalance(uid))),
    { reloadOn: [GiftCardChangedEvent], resetOn: [LogoutEvent] },
  );

  getBalance(): Observable<number> {
    return this.balanceQuery.get().pipe(filter((v): v is number => v != null));
  }
}
```

A new `BehaviorSubject` (or hand-written cache class) is almost always the wrong answer in Spartacus — it competes with the existing NgRx store and the Commands/Queries layer instead of plugging into them. Reach for one only when the feature truly has no facade and you have ruled out NgRx and Commands/Queries.

## Source reference (`@spartacus/*` libs in `node_modules`, not your app code)

- `CommandService`, `QueryService`, `CommandStrategy`, `Command`, `Query` from `@spartacus/core`.
- `CheckoutQueryService` (Commands/Queries example) from `@spartacus/checkout/base/core`.
