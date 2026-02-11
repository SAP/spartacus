# Standalone Components in Spartacus since 221121.7.0

## All OOTB Spartacus components are Standalone Components
Since version 221121.7.0, all Spartacus OOTB components are [Angular Standalone Components](https://angular.dev/reference/migrations/standalone). They can be used in your custom code as before, even after they became Standalone Components. You should be able to use them even in your custom non-Standalone components. However, we strongly recommend converting your custom components to Standalone Components as well, to unlock the latest Angular features and innovations - which will be described in the last section of this document.

## Fresh Spartacus apps are created with without `--standalone=false` flag
Since version 221121.7.0, when you create a new Spartacus app with the Spartacus schematics, the Angular CLI command `ng new` is invoked **without** the `--standalone=false` flag. It means your fresh application will use modern `bootstrpApplication()` API for bootstrapping a Standalone root `AppComponent`.

Apps migrated to version 221121.7.0 need to be modernized by following the steps described in the document: [Modernizing Angular App Bootstrap with `bootstrapApplication()`](./modernize-app-to-standalone-bootstrap-application.md).

## Remaining non-Standalone APIs in Spartacus

### NgModules are still in use
Angular `NgModules` are still in use in Spartacus just for organizing features into cohesive modules, but no longer for declaring components.

## Using OOTB Spartacus Standalone Components in migrated apps

### OOTB Spartacus components can be used as before
Existing OOTB Spartacus components can be used in your custom code as before, even after they became Standalone Components. You should be able to use them even in your custom non-Standalone components.

#### Migrating unit tests that stub Spartacus' child components
If by any chance in your unit tests you were stubbing children of a Spartacus OOTB Components, then you need to stub them differently than before. It's because stubbing Standalone Components in Angular works differently. In such case please refer to the Angular documentation on [Testing Standalone Components](https://angular.dev/guide/testing/components-scenarios#stubbing-unneeded-components) for details. 
That said, we perceive it an edge case, as usually in unit tests you would be stubbing child components of your custom components, not the OOTB Spartacus ones.

### Migrating your custom components to Standalone Components

[Angular Team strongly recommends](https://blog.angular.dev/the-future-is-standalone-475d7edbc706) converting your custom components to Standalone Components as well. The benefits are:
- Simplified component declarations (no need for component declarations in your `NgModule`)
- Unlocking latest Angular features and innovations like [Defer Loading](https://angular.dev/guide/templates/defer) and [Incremental Hydration](https://angular.dev/guide/incremental-hydration), which allow better tree-shaking and performance. Note: There might be also other prerequisites for those features, but Standalone Components is a major prerequisite.

To convert automatically your custom components to Angular Standalone Components, please follow the first step of the Angular documentation on [Migrating to standalone components](https://angular.dev/reference/migrations/standalone):

> 1. Run `ng g @angular/core:standalone` and select "Convert all components, directives and pipes to standalone"

But please don't follow the other 2 steps from Angular migration guide:

> 2. Run ng g @angular/core:standalone and select "Remove unnecessary NgModule classes"

Don't follow this step because Spartacus still uses NgModules for organizing features into cohesive modules.

> 3. Run ng g @angular/core:standalone and select "Bootstrap the project using standalone APIs"

Don't follow this step because it is already covered by the Spartacus migration guide: [Modernizing Angular App Bootstrap with `bootstrapApplication()`](./modernize-app-to-standalone-bootstrap-application.md).
