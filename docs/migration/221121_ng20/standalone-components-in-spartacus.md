# Standalone Components in Spartacus

Since version 221121.8.0, all Spartacus OOTB components are [Angular Standalone Components](https://angular.dev/reference/migrations/standalone). Angular `NgModules` are still in use just for organizing features into cohesive modules, but no longer for declaring components.

Angular's function [bootstrapModule()](https://angular.dev/api/core/PlatformRef#bootstrapModule) is still used to bootstrap the application's root component (so the root component must remain non-Standalone), but in the future Spartacus version we plan to change it to [bootstrapApplication()](https://angular.dev/api/platform-browser/bootstrapApplication) function, which will allow bootstraping a Standalone root Component.

## Migrating to 221121.8.0

### Migrating to use OOTB Spartacus Standalone Components
Existing OOTB Spartacus components can be used in your custom code as before, even after they became Standalone Components. You should be able to use them as you did before, even in your custom non-Standalone components.

Very likely you have been using your custom **root** component `AppComponent` in the `bootstrap` array of your `AppModule`. But if by some chance, you were using directly the Spartacus OOTB `StorefrontComponent` in the `bootstrap` array, then you should replace it with your custom non-Standalone `AppComponent`. It's because Angular's `bootstrap` array of `NgModule` accepts only non-Standalone components, due to still using the [bootstrapModule()](https://angular.dev/api/core/PlatformRef#bootstrapModule) function for bootstraping, but `StorefrontComponent` is now a Standalone Component.

### Migrating your custom components to Standalone Components

[Angular Team strongly recommends](https://blog.angular.dev/the-future-is-standalone-475d7edbc706) converting your custom components to Standalone Components as well. The benefits are:
- Simplified component declarations (no need for component declarations in your `NgModule`)
- Unlocking latest Angular features and innovations like [Defer Loading](https://angular.dev/guide/templates/defer) and [Incremental Hydration](https://angular.dev/guide/incremental-hydration). Note: There might be also other prerequisites for those features, but Standalone Components is a major prerequisite.

To convert automatically your custom components to Angular Standalone Components, please follow the Angular documentation on [Migrating to standalone components](https://angular.dev/reference/migrations/standalone), at least [the first step](https://angular.dev/reference/migrations/standalone#migrations-steps):

> 1. Run `ng g @angular/core:standalone` and select "Convert all components, directives and pipes to standalone"

The other 2 steps can be skipped for now, as Spartacus still uses `NgModules` for organizing features, and still uses `bootstrapModule()` function for bootstraping the root component:

> 2. Run ng g @angular/core:standalone and select "Remove unnecessary NgModule classes"
> 3. Run ng g @angular/core:standalone and select "Bootstrap the project using standalone APIs"
