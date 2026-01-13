# Standalone Components in Spartacus

Since version 221121.8.0, all Spartacus OOTB components are [Angular Standalone Components](https://angular.dev/reference/migrations/standalone). Angular `NgModules` are still in use just for organizing features into cohesive modules, but no longer for declaring components.

Angular's function [bootstrapModule()](https://angular.dev/api/core/PlatformRef#bootstrapModule) is still used to bootstrap the application's root component, but in the future Spartacus version we plan to change it to [bootstrapApplication()](https://angular.dev/api/platform-browser/bootstrapApplication) function  (i.e. a bootstraping function for Standalone root Component).
So the only exceptional non-Standalone OOTB Spartacus component is the root `StorefrontComponent`, to allow for using it potentially in `AppModule`'s `bootstrap` array, due to still using [bootstrapModule()](https://angular.dev/api/core/PlatformRef#bootstrapModule) function.

## Migrating to 221121.8.0

### Migrating to use OOTB Spartacus Standalone Components
Existing OOTB Spartacus components can be used in your custom code as before, even after they became Standalone Components. You should be able to use them as you did before, even in your custom non-Standalone components.

### Migrating your custom components to Standalone Components

Although it's not mandatory, [Angular Team strongly recommends](https://blog.angular.dev/the-future-is-standalone-475d7edbc706) converting your custom components to Standalone Components as well. The benefits are:
- Simplified component declarations (no need for component declarations in your `NgModule`)
- Unlocking latest Angular features and innovations like [Defer Loading](https://angular.dev/guide/templates/defer) and [Incremental Hydration](https://angular.dev/guide/incremental-hydration). Note: There might be also other prerequisites for those features, but Standalone Components is a major prerequisite.

To convert automatically your custom components to Angular Standalone Components, please follow the Angular documentation on [Migrating to standalone components](https://angular.dev/reference/migrations/standalone).
