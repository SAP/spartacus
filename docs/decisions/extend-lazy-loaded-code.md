## 1. Title
Extend lazy loaded code

## 2. Status
Proposed

## 3. Involved areas
shell app, lazy-loading, schematics

## 4. Context
_Explain why the decision is being taken_

We need a way to extend a service which is provided a in Spartacus module, while this module is imported dynamically (lazy loaded) in the customer's app. The usual technique of providing the extending service in the root injector, e.g. `{provide: ..., useClass:...}` in the `AppModule` (or any other statically imported module) doesn't work. The original service provided in the lazy-loaded module still takes precedence.

The reason is that the lazy-loaded modules instantiate its own, fresh child-injector, which derives from the root injector, but has a higher priority than the root one. And because the original service implementation is provided in the child-injector, it shadows any providers from the root injector.

For details on the child injector, see the implementation of Spartacus' [LazyModulesService#resolveModuleInstance](https://github.com/SAP/spartacus/blob/a1421cf95481c6f2b59926a91f4e9380ff10f70b/projects/core/src/lazy-loading/lazy-modules.service.ts#L86). 

Until now, when generating the app's code via schematics, we've written the dynamic imports pointing directly module from Spartacus library (e.g. `()=>import('@spartacus/user/profile').then(m=>m.UserProfileService)`). 

## 5. Decision
_Elaborate the decision_

### Names of wrapper modules


## 6. Consequences
_What becomes easier or more difficult to do because of this change?_

- more boilerplate of modules in customer's app
- slightly bigger production bundle size because of wrapper modules even for non-customized modules
- need to amend installation schematics to create the wrapper modules

