## 1. Title
Extend lazy loaded code

## 2. Status
Proposed

## 3. Involved areas
extensibility, lazy-loading, dependency injection

## 4. Context
_Explain why the decision is being taken_

Spartacus extension/integration library should be able to extend default services in a lazy-loaded feature modules coming from other libraries. We didn't have a need for it yet, but now we have a big need. It’s because we extract more-and-more code to lazy-loaded modules and we decouple more-and-more code into independent, composable “plugin-like” libraries. And the usual techniques for extending services, don't work in the case of lazy-loaded modules.

The usual technique of providing the extending service in the root injector, e.g. `{provide: ..., useClass:...}` in the `AppModule` (or any other statically imported module) doesn't overwrite the original service in the lazy-loaded module. The lazy-loaded module instantiates its own, fresh child-injector, which derives from the parent (root) injector, but locally has a higher priority than the parent one. And because the original service implementation is provided in the module that has its own child-injector, the original service shadows any extensions provided in the root injector.

So wee need to find a way to allow extension libraries for extending services in the lazy-loaded feature modules of other libraries. Moreover we should find an optimal, future-proof solution, because it might be used very often in OOTB Spartacus soon.

For details on instantiating the lazy-loaded modules and setting the parent injector, see the implementation of Spartacus' [LazyModulesService#resolveModuleInstance](https://github.com/SAP/spartacus/blob/a1421cf95481c6f2b59926a91f4e9380ff10f70b/projects/core/src/lazy-loading/lazy-modules.service.ts#L86). 

Note: at the time of writing, our schematics create in the app the dynamic imports pointing directly to the feature module imported from Spartacus library,  see for example:

```ts
()=>import('@spartacus/user/profile').then(m=>m.UserProfileService)
```

## 5. Alternatives considered
_List the alternative options you considered with their pros and cons_

### Option 1: Introduce wrapper lazy-loaded modules in the app

We can introduce a wrapper module in the app and import it dynamically (lazily) instead of the original Spartacus module:
```diff
- ()=>import('@spartacus/user/profile').then(m=>m.UserProfileService)
+ ()=>import('./wrapper-user-profile.module').then(m=>WrapperUserProfileModule)
```

Then inside the wrapper module we primarily import (statically) the original Spartacus module, but also allow for importing (statically) any other extension modules. Because the child-injector belongs to the wrapper module (becaus it's lazy-loaded), and both the original and the extension modules live inside the wrapper module, they share the same injector. Therefore the extension service can overwrite the original service inside the boundaries of this injector. See below the example implementation of the wrapper module:

```ts
import { UserProfileModule } from '@spartacus/user/profile';
import { ExtensionUserProfileModule } from '@spartacus/some-extension-library';

@NgModule({
  imports: [
     // original module providing original service
    UserProfileModule,

    // extension module with providers overwriting the original service
    ExtensionUserProfileModule 
  ]
})
export class WrapperUserProfileModule {}
```

The working example can be found in the PoC PR: https://github.com/SAP/spartacus/pull/14871

#### How the installation schematics will recognize where to add an import of the extension module?
It should locate the import of the original feature module in the customer's codebase, and append the extension module after it.

```ts
// customer app's checkout wrapper module:
@NgModule({
  imports: [
    CheckoutModule,       // <-- marker where to append extension modules
    B2bCheckoutModule,    // appended by schematics
    DigitalPaymentsModule // appended by schematics
  ],
})
export class WrapperCheckoutModule {}
```

#### Pros
- this approach allows for extending Spartacus services from other Spartacus libraries  in lazy-loaded modules
- by the way, it improves the customer's developer experience - it shows the straightforward place where customers they can overwrite our OOTB services in a lazy-loaded feature (nowadays the [documentation says customers need to create wrapper modules themselves manually](https://sap.github.io/spartacus-docs/lazy-loading-guide/#customizing-lazy-loaded-modules))
- additionally, it allows for tree-shaking any unused public API of the feature library entrypoint (which was not the case previously, when importing dynamically module from the direct path of the library)

#### Cons
- we add more modules in customer's app
- wrapper modules for non-customized features are just a redundant boilerplate
- increase the complexity of the installation schematics
- negligible increase in the production built JS bundle of the lazy-loaded feature: 100-200 bytes (depending on the length of the class name).
  - Note that the OOTB `UserProfileModule` feature has 42.15 kB at the moment of writing. So the increase in this case is 0.3% and it affects only the lazy-loaded chunk, but not the main JS chunk. 


#### Interesting (checked = answered)

- [x] does it increase the production built MAIN JS bundle size?
  - NO
- [x] does it cause producing more JS chunks than before?
  - NO
- [x] will it break lazy loading when we statically import the original module inside the wrapper module?
  - NO
- [x] should we adapt our _installation schematics_ to create wrapper modules OOTB? 
  - YES, to allow for future installation of any extensions for feature modules
- [x] should we create wrapper modules for all features or only those we expect to be extended?
  - ALL, because we don't know in advance which features will be extended
- [ ] should we automate for customers the _migration_ from old simple dynamic imports (e.g. `()=>import('@spartacus/store-finder')`)) to the new wrapper modules?
  - NO, but we need to at least document how to do it yourself as a customer.
  - [ ] A nice enhancement from our side could be a schematics migration that would just add a code comment over the old dynamic imports (`import('@spartacus/...')`) instructing to change it to wrapper module (with link to docs). 
    - [ ] should we improve old links to docs or write new docs? 
- [ ] ## CATCHUP ##:
  - [ ] 
- [ ] is it essential to have wrapper modules in app since 5.0 or we can postpone the decision/code change/schematics change to 5.x?
  - Let's push for 5.0. The major release is an occasion to force customers (by migration documentation) to create wrapper modules for every lazy loaded feature. Thanks to , we'll able to install new extensions inside those wrapper modules in the upcoming minor releases.
    - Arguments:
      - PUSH for 5.0:
        - time and effort to do it in 5.0
          - How realistic it is that we do all those thing:
            - agreeing on a scalable and stable wrapper modules structure
              - stable means: if we need to update the structure for any new requirement, we don't like to go through the same story again (discuss decision, amend schematics and documentation) 
            - prepare the schematics - takes time to create them and test. and run them against a few feature combinations
            - doing it in the rush (because of rushing we might miss some cases)
              - we have now only 3 examples: digital payments and checkout, and cdc
          - in the future we might need to do some other changes that could affect our solution. It would not look good on us, if we force customers again to rewrite their app structure
          - possible delay of 5.0
          - assigning one person from Blamed to it and devote time to it
        - risk we missed something in our plan, but find out obstacles when implementing... 
        - We take tha occasion to TELL customers they HAVE to do some changes in their app (= create wrapper modules)
      - POSTPONE after 5.0:
        - we cannot solve OOTB DigitalPayments compatibility with B2B or Sched.Repl. Chekcout 
        - we keep having the baked-in wrapper modules in our API
          - cdc importing user
          - B2bCheckoutModule importing BaseCheckout
          - SchedReplModule importing B2bCheckout
          - DigitalPayments importing BaseCheckout
            - this COULD be problematic because of importing BaseCheckout 2 times.
              - how customers can mitigate: lookup structure of our modules, and pick only what is necessary (not conveninet but there is a workaround)
        - to install any extension that contributes to an existing LL feature in an automated way, we would need to create custom (complex?) schematics that:
          1. detects if the original feature module is original import or already in a customized wrapper module
            1. original import -> replace the import
            2. inside custom wrapper modules -> replace the original module reference
      - PUSH for 5.0 ONLY SELECTED MODULES:
        - e.g. user, checkout, cart
        - what if customer already have a customized feature (their own wrapper module)?
    - NOTES:
      - console.warn! when we cannot find out where to append the extension module
      - sooner or later will need to solve problem of ordering imports of the extensions (we already have this problem, but the solution it will need to be spread also among the LL wrapper modules)
- [ ] how will we migrate customer's code, when we decide in future to change the structure of the lazy-loaded chunks?
  - problem: when we generate template code for base feature and extensions, then we have more layers of breaking changes (what extension belongs to where)
    - when we change the structure of lazy loading, then we change the import path. But also extensions need to be moved around.
      - the schematics will need to move the schematics along with the split modules
  - TBD 
  - we have similar the case now:
    - we released checkout in one chunk in 4.0
    - but in 5.0 we'll have 3 modules (1 base and 2 extensions)
  - ideas:
    - break down dynamic import to few other dynamic imports
- [ ] should we force (or strongly recommend) customers  who migrate to 5.0 to introduce the wrapper modules?
  - YES, for sure with documentation and maybe with schematics
- [ ] how do we name the wrapper modules?
  - TBD: how to name new wrapper lazy-laoded modules in customer's app, so it's obvious that customer's customizations should go there as well. Options: for example UserProfileModule: LazyUserProfileModule, WrapperUserProfileModule, ... ?
- [ ] it might seriously complicate the future automated migrations in case we will change in the future the suggested division of the features in to lazy-laoded chunks (e.g. we propose more fine-grained or reorganized chunks).
  - TBD: in the end of the day, it's up to customers to decide how to optimize their code. But it would be good to provide nice OOTB experience.
- [ ] how does the shell app look files structure look like if every feature is blown into many modules (main feature module with configs, and one or more lazy-loaded wrapper feature modules)
  - TBD
- [ ] can we have one library entry point for multiple lazy-loaded modules? if yes, how do we enforce boundaries?
  - TODO 
  
#### Plan of implementation

After 5.0:
1. implement schematics util that breaks down the given dynamic import into a wrapper module, e.g:

    `ng g @spartacus/schematics:wrapper --module=CheckoutModule --module-path=@spartacus/checkout/base`
2. implement schematics util that appends the given extension module after another "marker" module, e.g:
    
    `ng g @spartacus/schematics:append-module --module=DigitalPaymentsModule --module-path=@spartacus/digital-payments --after-module=CheckoutModule --after-module-path=@spartacus/checkout/base`
3. change the implementation of the installation-schematics of our extension features (e.g. DigitalPayments, CheckoutB2b) use the two util schematics above. For example: to install the Digital Payments feature (`ng add @spartacus/digital-payments`): first make sure to break down the dynamic import of `CheckoutModule` into a local wrapper module and only then append the `DigitalPaymentModule` after the `CheckoutModule`.

Issues with current develop branch:
1. because of putting the pre-baked modules into customers app (so the base module is implicitly imported inside), there is no notion about the base module the customer's code. Therefore the base module cannot be the marker for generating the wrapper modules in the future.
   - possible solutions:
     1. workaround: the future schematics generating the wrapper module for the Checkout will accept an array of possible maker modules (e.g. `CheckoutModule, CheckoutB2BModule, DigitalPaymentsModule`)
        - cons: we will have to change in 6.0 those pre-baked wrapper modules (it's tech dept to pay in the future)
     2. ...?
2. Currently the Digital Payments installation-schematics creates a separate module file with the config chunk using the same key `CHECKOUT_FEATURE`, but different dynamic import path. It overwrites the original dynamic import implicitly thanks to config chunks being deep-merged together 
   - possible solutions:
     - change implementation of installation-schematics of Digital Payments to update the dynamic import "in place" inside the original Checkout module file. But this requires(!) the checkout installation-schematics to be run first. And also this requires(!) defining a marker module for replacement.

Suggested TODO before 5.0:
1. implement the ordered invocation of specific libraries' installation-schematics (including the deep analysis of the cross-dependencies between features)
1. changes needed in current installation-schematics of DigitalPayments and CheckoutB2B (and CdcLogin which is under development):
  - current state:
    - CheckoutB2b schematics removes the original checkout file and re-creates it, using key different path in the dynamic import
      - it can stay I guess
    - DigitalPayments creates a separate module file with the same key `CHECKOUT_FEATURE`, but different dynamic import path 
      - it's problematic as there is no single file where we could break down the dynamic import


### Option 2: Configure the extension module as `dependencies` of the lazy-loaded feature module
Spartacus allows for configuring `dependencies` for a feature module, for example:

```ts
provideConfig(<CmsConfig>{
  featureModules: {
    [USER_PROFILE_FEATURE]: {
      module: () =>
        import('@spartacus/user/profile').then((m) => m.UserProfileModule),

      dependencies: [
        () =>
          import('@spartacus/some-extension-library').then(
            (m) => m.ExtensionUserProfileModule
          ),
      ],
    },
  },
}),
```
This allows for injecting services from the dependency module.

Unfortunately for us, the dependency module's injector has lower priority than the original feature module). It's because the instantiated feature module has it's own injector. So the extension services cannot overwrite the original services.

So this this option is disqualified as it's not solving our problem.

*Note*: why the dependency module's injector cannot have higher priority than the feature module's injector? It's because the Angular's public API allows only for setting a *parent injector* for the dynamically instantiated module: `NgModuleFactory<any>.create(parentInjector: Injector | null): NgModuleRef<any>`. And the parent injector, by definition has a lower priority than the injector of the instantiated module. 

### Option 3: Configure the original module as `dependencies` of the extension module (tweaked Option 2)
We could tweak the Option (2), and set the extension module as the main feature `module`, while setting the original feature module only as `dependencies`. Then the injector of the extension module should have higher priority than the original feature module, when resolving services. See example:

```ts
provideConfig(<CmsConfig>{
  featureModules: {
    [USER_PROFILE_FEATURE]: {
      module: () =>
        import('@spartacus/some-extension-library').then(
          (m) => m.ExtensionUserProfileModule
        ),
      
      dependencies: [
        () => import('@spartacus/user/profile').then((m) => m.UserProfileModule),
      ],
    },
  },
}),
```
We're hoping that this configuration should promote injecting services from the extension module over the services from the original feature module.

Unfortunately, then we get an error:
```
core.js:6456 ERROR TypeError: Cannot read properties of undefined (reading 'pipe')
    at ComponentWrapperDirective.launchComponent (component-wrapper.directive.ts:121:8)
```

It's because the implementation of the method `CmsComponentsService#determineMappings` picks the CMS component mappings only from the pointed `module`, but not from its `dependencies`. And in our case the extension module doesn't contain all those component mappings, instead they live in the original feature module (which is now set as `dependencies`).

As a next step we could possibly change the behavior of `CmsComponentsService#determineMappings` to pick also cms mappings from the dependency modules.

### Pros
- It doesn't require creating a new wrapper module in customer's app

#### Cons
- it doesn't work OOTB
- even if we make it work (e.g. by changing behavior of `CmsComponentsService#determineMappings`):
  - it doesn't allow for plugging many independent extensions to a single feature feature (because the config allows for only one main feature `module`)
  - it would require changing at least a core service `CmsComponentsService`, that most of the application depends on (indirectly)

#### Interesting
- will it solve our problem, if we change the behavior of `CmsComponentsService#determineMappings` to pick  mappings also from the `dependencies` modules?
  - how much complexity will it introduce to the code?
  - if it works, what will be the consequences of picking cms mappings not only from the main feature `module`, but also from `dependencies` modules?
    - what if a single dependency module is reused as a dependency of more than one feature module? Should it then populate its mappings to more than one feature module?
    - does it even make sense (semantically) to provide the cms mappings in a dependency module?
    

###



### Option 4: Introduce a config `plugins` for lazy-loaded feature modules; implementation: use static empty NgModule + parent CombinedInjector
We want to allow for plugging many extensions for a single module. And ideally we would like to avoid changing the original module in customer's app, when plugging the extensions. In other words, we a want loose coupling between the original feature module and the extension modules in the app. See example structure in the customer's app:
```
|- user-feature.module.ts
|- some-extension.module.ts
```

```ts
// user-feature.module.ts - unchanged, created by schematics as of today
provideConfig(<CmsConfig>{
  featureModules: {
    [USER_PROFILE_FEATURE]: {
      module: () =>
        import('@spartacus/user/profile').then((m) => m.UserProfileModule),
    },
  },
}),
```

```ts
// some-extension.module.ts
provideConfig(<CmsConfig>{
  featureModules: {
    [USER_PROFILE_FEATURE]: {
      plugins: [ // PROPOSAL OF THE NEW CONFIG PROPERTY
        () =>
          import('@spartacus/some-extension-library').then((m) => m.UserProfileModule),
      ]
    },
  },
}),
```

TODO:
- plugins should be able to populate the CMS mappings and services. and should overwrite default CMS maapings and services

IMPLEMENTATION DETAILS:
As the feature module we set artificially an empty Module. And when instantiating it, we set its parent injector to the `CombinedInjector` consisting of (in the following order): the plugins' injectors, the original feature module's injector and dependencies' injectors.
This should allow for injecting services first from plugins modules, then from original feature module, and later from dependencies modules.

#### Pros
- it doesn't require importing both the original and plugin modules in the same file (in the wrapper module)
  - to install an extension, you don't need to know the filename of the wrapper module, but only the feature name, e.g. `USER_PROFILE_FEATURE` 
- extensions modules (plugins) can live in separate files. The original modules remain untouched 

#### Cons
- it doesn't work properly for multi-provided tokens (including `MODULE_INITIALIZER`s)
  - in details: `CombinedInjector` returns the array of multi-provided tokens only from the first complementary injector that provides the tokens. In other words, `CombinedInjector` cannot return an array combining all multi-provided tokens in all complementary injectors. 
- adds a bit of more non-trivial logic ("magic") to the Spartacus lazy loading and dependency injection


TODO: We need to create a working PoC

### Interesting
- 

### Option 5: Introduce a config `plugins` for lazy-loaded feature modules; implementation: create wrapper module in runtime by JIT compiler (tweaked Option 4)
We could tweak the Option (5), and create the wrapper module importing the original module all the plugin modules in the runtime. This helps to avoid using the opinionated `CombinedInjector`.

Interesting:
- did we already use JIT in `develop` branch? How can we prove we did or not? We have already been calling `compiler.compileModuleAsync()` in develop.
  - NO. How to prove: when trying to create NgModule in rutime I gout error that JIT compiler is not available.
- Angular documented several drawbacks of using JIT: increased bundle size and increased runtime (due to compilation happening in the browser). But are those docs still up to date with regards to IVY and Angular 12/13? See https://angular.io/guide/aot-compiler
- Should we use JIT in general? Angular may remove the JIT compilation in the (far?) future, however it’s not definitely decided yet. See [RFC](https://github.com/angular/angular/issues/43133#issuecomment-941151334).
- using JIT compiler introduces [some security concerns](https://angular.io/guide/security#use-the-aot-template-compiler). How much will we be affected, when calling compileModuleAsync or the alternative function createNgModuleRef() (that was introduced only in v13)


TODO: We need to create a working PoC

## Option 6: export pre-baked wrapper modules from our libs
TODO: explain it

Cons:
- doesn't allow for many composable extensions

## 5. Decision
_Elaborate the decision_

TODO

## 6. Consequences
_What becomes easier or more difficult to do because of this change?_

TODO