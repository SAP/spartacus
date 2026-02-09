# Standalone Components in Spartacus since 221121.7.0

Since version 221121.7.0, all Spartacus OOTB components are [Angular Standalone Components](https://angular.dev/reference/migrations/standalone). They can be used in your custom code as before, even after they became Standalone Components. You should be able to use them even in your custom non-Standalone components. However, we strongly recommend converting your custom components to Standalone Components as well, to unlock the latest Angular features and innovations - which will be described in the last section of this document.

## Remaining non-Standalone APIs in Spartacus

### NgModules are still in use
Angular `NgModules` are still in use in Spartacus just for organizing features into cohesive modules, but no longer for declaring components.

### bootstrapModule() is still in use
The Angular's non-Standalone function [bootstrapModule()](https://angular.dev/api/core/PlatformRef#bootstrapModule) is still used to bootstrap the application's root AppComponent component (so the root component must remain non-Standalone).

But in the future Spartacus version we plan to change it to [bootstrapApplication()](https://angular.dev/api/platform-browser/bootstrapApplication) function, which will allow bootstrapping a Standalone root Component.

### Fresh apps still need to be created with `--standalone=false` flag
Fresh Angular applications created with Spartacus schematics still need to be created with `ng new ... --standalone=false` flag, so the generated app uses `bootstrapModule()` function for bootstrapping the root component.

## Migrating to 221121.7.0

### OOTB Spartacus components can be used as before
Existing OOTB Spartacus components can be used in your custom code as before, even after they became Standalone Components. You should be able to use them even in your custom non-Standalone components.

#### Migrating unit tests that stub Spartacus' child components
Very likely your unit tests should work as before without any changes. However, beware that stubbing children of a Standalone Components requires a different technique than stubbing child components of non-Standalone Components. Please refer to the Angular documentation on [Testing Standalone Components](https://angular.dev/guide/testing/components-scenarios#stubbing-unneeded-components) for details. You'll need to adjust your subs in unit tests only in a case, if _your custom component under test uses a Spartacus component as a child component and you stub children of Spartacus component_ (i.e. you stub grand children of your component under test).

#### Migrating your app's root component
Very likely your root component should be bootstrapped as before without any changes. Only if exceptionally, you were using directly the Spartacus OOTB `StorefrontComponent` in the `bootstrap` array of your app's main `NgModule` (in other words: if your root component was directly `StorefrontComponent`), then you should replace it with your custom non-Standalone `AppComponent`. It's because Angular's `bootstrap` array of `NgModule` accepts only non-Standalone root components, but `StorefrontComponent` became a Standalone Component in Spartacus 221121.7.0.

### Migrating your custom components to Standalone Components

[Angular Team strongly recommends](https://blog.angular.dev/the-future-is-standalone-475d7edbc706) converting your custom components to Standalone Components as well. The benefits are:
- Simplified component declarations (no need for component declarations in your `NgModule`)
- Unlocking latest Angular features and innovations like [Defer Loading](https://angular.dev/guide/templates/defer) and [Incremental Hydration](https://angular.dev/guide/incremental-hydration), which allow better tree-shaking and performance. Note: There might be also other prerequisites for those features, but Standalone Components is a major prerequisite.

To convert automatically your custom components to Angular Standalone Components, please follow the first step of the Angular documentation on [Migrating to standalone components](https://angular.dev/reference/migrations/standalone):

> 1. Run `ng g @angular/core:standalone` and select "Convert all components, directives and pipes to standalone"

Because Spartacus still uses `NgModules` for organizing features and still uses `bootstrapModule()` function for bootstrapping the root component, the other 2 steps from Angular migration guide can be **skipped** for now:

> 2. Run ng g @angular/core:standalone and select "Remove unnecessary NgModule classes"
> 3. Run ng g @angular/core:standalone and select "Bootstrap the project using standalone APIs"
