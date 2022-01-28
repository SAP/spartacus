## 1. Title
Extend lazy loaded code

## 2. Status
Proposed

## 3. Involved areas
shell app, lazy-loading, schematics

## 4. Context
_Explain why the decision is being taken_

We need a way to extend a service which is provided a in Spartacus module, when this module is lazy-loaded in the customer's app. The usual technique of providing the extending service in the root injector, e.g. `{provide: ..., useClass:...}` in the `AppModule` (or any other statically imported module) doesn't overwrite the original service. The service provided in the original lazy-loaded module takes precedence.

The reason is that the lazy-loaded modules instantiate its own, fresh child-injector, which derives from the root injector, but has a higher priority than the root one. And because the original service implementation is provided in the module that has its own child-injector, the original service shadows any extensions provided in the root injector.

For details on creating the child injector (aka. `CombinedInjector`), see the implementation of Spartacus' [LazyModulesService#resolveModuleInstance](https://github.com/SAP/spartacus/blob/a1421cf95481c6f2b59926a91f4e9380ff10f70b/projects/core/src/lazy-loading/lazy-modules.service.ts#L86). 

Until now, when generating the app's code via schematics, we've written the dynamic imports pointing directly module from Spartacus library, for example:

```ts
()=>import('@spartacus/user/profile').then(m=>m.UserProfileService)
```

## 5. Alternatives considered
_List the alternative options you considered with their pros and cons_

### Option 1: Wrapper lazy-loaded modules in app

We can introduce a wrapper module in the app and import it dynamically (lazily) instead of the original Spartacus module:
```ts
()=>import('./wrapper-user-profile.module').then(m=>WrapperUserProfileModule)
```

Then Inside the wrapper module we primarily import (statically) the original Spartacus module, but also allow for importing (statically) any other extension modules. Because the wrapper module owns the child-injector, and both the original and the extension modules live inside the wrapper module, they share the same injector. So the extension service can overwrite the original service in this injector.

```ts
import { UserProfileModule } from '@spartacus/user/profile';
import { ExtensionUserProfileModule } from '@spartacus/some-extension-library';

@NgModule({
  imports: [UserProfileModule, ExtensionUserProfileModule]
})
export class WrapperUserProfileModule {}
```

The working example can be found in the PoC PR: https://github.com/SAP/spartacus/pull/14871

#### Pros
- it allows for extending Spartacus services in lazy-loaded modules
- it's a convention for adding new extension libraries to existing lazy-loaded modules
- it shows the straightforward extensibility path for customers - they can write their own extensions directly in the wrapper modules

#### Cons
- we add more modules in customer's app
- wrapper modules for non-customized features are just a redundant boilerplate
- it introduces an coding convention in customer's app, that customers might not follow
- negligible increase in the production built JS bundle of the lazy-loaded feature: 100-200 bytes (depending on the length of the class name). Note that the OOTB `UserProfileModule` feature is 42.15 kB heavy. So the increase in this case is 0.3%. 

#### Interesting
- does it increase the production built main JS bundle size?
  - NO
- does it cause creating any new JS chunks?
  - NO 
- how will we need to change our installation schematics to adapt wrapper modules? 
  - TODO ?
- should we force customers migrating to 5.0 to introduce the wrapper modules?
  - TODO ?

### Option 2: configure a dependency of original module on an extension module
> TODO

### Option 2

## 5. Decision
_Elaborate the decision_

### Names of wrapper modules


## 6. Consequences
_What becomes easier or more difficult to do because of this change?_

- more boilerplate of modules in customer's app
- slightly bigger production bundle size because of wrapper modules even for non-customized modules
- need to amend installation schematics to create the wrapper modules

