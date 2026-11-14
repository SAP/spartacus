# Concrete customer code migrations

Use these recipes for matching customer code after the Angular/Spartacus dependency update. The examples describe this release's changes. CustomerAnalytics, CustomerProductContext, customer providers and variable names stand for the application's existing custom code. Check the installed target declaration before applying a recipe to a different class.

## Removed DI constructor arguments

What changed: ProductService now obtains Store and ProductLoadingService through inject(). Its base constructor no longer accepts these arguments. The same pattern affects many framework classes, but classes retaining constructor logic or non-DI arguments require their own target signature.

Before, a customer subclass forwarded framework dependencies and also used its own dependency:

~~~ts
constructor(
  store: Store<StateWithProduct>,
  productLoading: ProductLoadingService,
  protected analytics: CustomerAnalytics
) {
  super(store, productLoading);
  this.analytics.initialize();
}
~~~

After, keep the customer's dependency and initialization:

~~~ts
constructor(protected analytics: CustomerAnalytics) {
  super();
  this.analytics.initialize();
}
~~~

The constructor schematic performs safely matched forwarding changes. If the customer also uses store or productLoading, retain that parameter or inject the dependency for the customer's own logic. If the constructor only forwards removed dependencies, it can be omitted. Remove now-unused imports after reviewing references. Do not replace every super(...) with super(): not all bases have the same target constructor.

If the old super call selected a customer implementation, pass it through the Angular provider for the token the base now injects. For an existing CustomerProductLoadingService instance, for example:

~~~ts
providers: [
  CustomerProductLoadingService,
  {
    provide: ProductLoadingService,
    useExisting: CustomerProductLoadingService,
  },
]
~~~

Place this provider at the injector that creates the customized feature; inspect lazy feature providers for a nearer override. Validate that the inherited behavior uses the customer implementation. Do not drop the override when removing the super argument.

## Indirect customer inheritance

What changed: the Spartacus base constructor loses its DI arguments, but an intermediate customer base can still require its own constructor arguments. The schematic does not automatically resolve every indirect chain. Trace the actual extends/import/barrel path and inspect each constructor before editing the leaf class.

In this illustrative chain, CustomerAnalytics and CustomerCatalogPolicy represent existing customer dependencies and initialization, not new services to add. Keep the application's Angular decorators/imports and provider registrations; Injectable comes from @angular/core.

Before:

~~~ts
@Injectable()
class CustomerProductBase extends ProductService {
  constructor(
    store: Store<StateWithProduct>,
    loading: ProductLoadingService,
    protected analytics: CustomerAnalytics
  ) {
    super(store, loading);
    this.analytics.initialize();
  }
}

@Injectable()
class CustomerCatalogService extends CustomerProductBase {
  constructor(
    store: Store<StateWithProduct>,
    loading: ProductLoadingService,
    analytics: CustomerAnalytics,
    protected policy: CustomerCatalogPolicy
  ) {
    super(store, loading, analytics);
    this.policy.initialize();
  }
}
~~~

After, when the published ProductService constructor takes no arguments:

~~~ts
@Injectable()
class CustomerProductBase extends ProductService {
  constructor(protected analytics: CustomerAnalytics) {
    super();
    this.analytics.initialize();
  }
}

@Injectable()
class CustomerCatalogService extends CustomerProductBase {
  constructor(
    analytics: CustomerAnalytics,
    protected policy: CustomerCatalogPolicy
  ) {
    super(analytics);
    this.policy.initialize();
  }
}
~~~

The leaf super(analytics) must remain: it calls the customer base, not ProductService. Preserve dependencies still used elsewhere by either class. Instantiate through the application's configured injector/injection context, check each retained initialization happens once, and exercise the inherited product-loading behavior with the customer policy. For mixins, factory-created bases or a customer library exported through a barrel, inspect that implementation instead of applying this chain blindly.

## Component and lazy provider scope

What changed: a former super(customService) substitution may need to be expressed through the base token that is now injected. A root alias alone cannot establish behavior when the feature/component creates its own provider.

For a customized mini-cart whose existing helper belongs to the component injector, preserve that scope with the corresponding component metadata:

~~~ts
providers: [
  CustomerMiniCartService,
  {
    provide: MiniCartComponentService,
    useExisting: CustomerMiniCartService,
  },
]
~~~

CustomerMiniCartService stands for the customer's existing helper. Do not add this component-scoped provider when the application's helper intentionally belongs to the root or a lazy/route injector. Locate the provider that actually creates the feature; inspect any nearer override before changing registration. Keep original CMS component mappings and lazy boundaries.

With the real customized component fixture and required application providers already configured, verify the instance at the creating injector:

~~~ts
const injector = fixture.debugElement.injector;
expect(injector.get(MiniCartComponentService))
  .toBe(injector.get(CustomerMiniCartService));
~~~

Keep or add the behavior assertion that proves inherited quantity/loading streams and the custom preview use that helper. A root TestBed.inject assertion does not prove component-scoped identity. Registering both tokens with useClass can create two instances; switching from useExisting must not silently split shared state. When the helper is intentionally root-scoped, check identity at that root and verify the lazy feature consumes it.

## Specialized configuration and initialization order

What changed: dependencies may now be read in base field initializers or constructor logic. Removing a super(customConfig) argument can lose a specialized config, while reassigning an inherited property after super() can be too late for work already started by the base.

For a ProductListComponentService extension, a field override is applicable only when the target exposes the matching mutable config field and the relevant criteria stream reads it after subclass initialization. CustomerViewConfig must satisfy the target ViewConfig contract:

~~~ts
@Injectable()
class CustomerProductListService extends ProductListComponentService {
  protected override config = inject(CustomerViewConfig);
}
~~~

Use the actual property name/type from the published base. Preserve existing provider aliases for the list helper and the components/facets that share it. Confirm the timing from the target implementation and a behavior test: the configured page size, route reset and facets must still use the custom policy. If the base consumes its injected config earlier, a later property override is insufficient; supply the intended token at the creating injector using the application's supported configuration design.

If CustomerViewConfig itself injects ViewConfig to derive a specialized copy, globally aliasing ViewConfig to CustomerViewConfig introduces a dependency cycle and can affect unrelated features. Keep the original config available through the customer's existing configuration/provider design; do not invent a global alias or a new injector to make the code compile.

Review retained constructor side effects, subscriptions and field initializers as a unit. Keep their original count, lifecycle cleanup and required order. Do not duplicate initialization in both a moved field and the constructor, call an overridden method before the leaf's fields exist, or make an async operation synchronous just to fit an example. Use the customer's existing assertions for initialized state and the first/later stream emissions.

## Direct construction in tests

What changed: field initializers call inject(), so ordinary new CustomerProductService(...) outside Angular can throw NG0203.

After configuring providers for the base and customer dependencies, prefer:

~~~ts
const service = TestBed.inject(CustomerProductService);
const fixture = TestBed.createComponent(CustomerComponent);
~~~

For a test that needs an explicit constructor argument, preserve it and supply the injection context:

~~~ts
const service = TestBed.runInInjectionContext(
  () => new CustomerProductService(analyticsMock)
);
~~~

Run the customer's behavior/provider assertions, including initialization, rather than replacing them with a construction-only assertion.

## Layout configuration provider

What changed: the exported layoutConfig constant was removed. The factory applies the target layout behavior before returning a fresh configuration.

Before:

~~~ts
import { provideConfig } from '@spartacus/core';
import { layoutConfig } from '@spartacus/storefront';

provideConfig(layoutConfig);
~~~

After:

~~~ts
import { provideConfigFactory } from '@spartacus/core';
import { layoutConfigFactory } from '@spartacus/storefront';

provideConfigFactory(layoutConfigFactory);
~~~

Keep separate customer layout overrides and their intended precedence. Compare header slots and above-the-fold rendering: do not recreate the retired constant with an old copied layout.

## Outlet context becomes a stream

What changed: OutletContextData.context was removed; context$ can emit after the outlet has initialized and can emit again.

Before:

~~~ts
const product = outletContext.context.product;
~~~

After, for an outlet whose actual context includes product:

~~~ts
import { inject } from '@angular/core';
import { OutletContextData } from '@spartacus/storefront';
import { map } from 'rxjs';

protected readonly outletContext =
  inject<OutletContextData<CustomerProductContext>>(OutletContextData);
readonly product$ = this.outletContext.context$.pipe(
  map((context) => context.product)
);
~~~

Consume product$ with the async pipe and guard the initial absence of a value. If the customer needs an imperative side effect, subscribe with lifecycle cleanup at the appropriate time. Do not use take(1), a synchronous subscription result or a cached initial context unless the customer behavior is intentionally one-shot. Verify a delayed emission and a subsequent context update.

## Cart and product-list setters

What changed: the compatibility setters were removed; the existing public input setters now contain their behavior.

Before:

~~~ts
cartItemList.setLoading = isLoading;
productScroll.setConfig = viewConfig;
~~~

After:

~~~ts
cartItemList.cartIsLoading = isLoading;
productScroll.scrollConfig = viewConfig;
~~~

These are assignments, not setLoading(...)/setConfig(...) method calls. Existing template inputs [cartIsLoading] and [scrollConfig] already use the retained names. Review subclasses that override the old setters and relocate their custom behavior to the retained setters. Verify that loading disables/enables quantity controls without a spurious update, and that product scrolling retains the customer's configuration.

For custom code dispatching CartActions.MergeCart, use CartActions.MergeCartAndIncrementProcessesCount with the target payload contract. It also increments the cart process count: verify busy/loading state through completion rather than treating it as a cosmetic class rename.

## Store Finder coordinate and direction helpers

What changed: these helpers no longer belong to StoreFinderService/StoreFinderFacade. Search and store-list behavior remains on its existing feature services.

Before:

~~~ts
const directions = this.storeFinderService.getDirections(store);
~~~

After:

~~~ts
import { inject } from '@angular/core';
import { StoreLocationService } from '@spartacus/storefinder/core';

protected readonly storeLocation = inject(StoreLocationService);
// Inside the existing customer method:
const directions = this.storeLocation.getDirections(store);
~~~

Migrate getStoreLatitude/getStoreLongitude the same way. Keep handling missing coordinates: their target return type is number | undefined. Retain Store Finder dependencies still used for searches, lists or selection. Verify store selection and the resulting directions link.

## Configurator cards, title and messages

What changed: card options now carry the Configurator.Attribute object instead of separate attributeId/attributeLabel/attributeName compatibility fields.

Before, the options supplied attribute-derived scalar fields. After, remove those three fields and pass the existing complete attribute:

~~~ts
const options: ConfiguratorAttributeProductCardComponentOptions = {
  ...retainedCustomerOptions,
  attribute,
};
~~~

RetainedCustomerOptions must still supply the target's other required fields, including productBoundValue, itemCount and itemIndex. Do not fabricate an attribute from just its label/name: its code and other data are used for keys and focus management. Use the target component's getAttributeCode(attribute), attribute.label and attribute.name where those values are needed.

For a custom ConfiguratorProductTitleComponent template, replace product$ consumption with the view stream:

~~~html
@if (productTitleData$ | async; as view) {
  <h1>{{ view.title }}</h1>
  <cx-media [container]="view.product?.images?.PRIMARY"></cx-media>
}
~~~

Preserve customer markup. view.title can represent a nested configured container while view.product supplies base-product details; do not assume the product name is always the current heading. Replace ConfiguratorConflictAndErrorMessagesComponent.configuration$ usage with messages$ only after adapting the consumer to its message-view type. Removed ghostStyle hooks require the current loading template, not a replacement boolean field. Test configured products, container navigation, loading, messages and focus.

## APIs without a mechanical replacement

Use [the removed API table](removed-apis.md) to find the affected entry point and any recorded replacement. For tab/paragraph hooks, checkout presentation helpers, subscription date handlers, OPF cartId fields and S4 Service action hooks, preserve the underlying customer requirement and adapt it to the target feature implementation. A similarly named field is not evidence of equivalent behavior.

For example, OrderHistoryService/Facade.getQueryParams moved to OrderHistoryComponent.getQueryParams: customer routing customization belongs in that component hook. Removing the service override without moving the custom routing loses behavior. For OPF, remove stale cartId fields from the relevant typed options and inspect the current payment/cart context contract; do not rename them blindly to another ID.

## Retired EPD integration

The cleanup schematic adds review comments; it does not remove the customer's integration. Find imports and styles before uninstalling:

~~~bash
rg -n 'epd-visualization|EpdVisualization|EPD_VISUALIZATION|VisualPicking' src angular.json package.json
npm uninstall @spartacus/epd-visualization
~~~

Remove confirmed EPD module/root registrations, lazy feature configuration, CMS mappings, routes and SCSS imports; keep unrelated integrations. Reconcile the lockfile and backend CMS placements with their owner. Verify a production build and pages that previously contained EPD components. There is no replacement integration in this release.

## Template and SSR follow-through

Use Angular's control-flow migration for copied structural templates when applicable, then review conditions and @for tracking. Framework template changes do not automatically update customer copies. Keep explicit purchasable=false/stock checks while allowing cart/order entry actions whose product price resides on the entry. Test Buy Again and Add to Active Cart alongside PDP availability.

For SSR, replace an unconfigured serve command with the same command plus the application's trusted NG_ALLOWED_HOSTS environment value. The localhost prefix applied by schematics is only a development default. Configure SERVER_REQUEST_ORIGIN for prerender builds without a request. Follow [the release reference](angular-22.md#ssr-hydration-prerender-and-pwa) for host rejection, real hydration/event replay and route output checks.
