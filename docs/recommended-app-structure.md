# Recommended Spartacus Application structure


This document describes the recommended app structure introduced in Spartacus 3.1 onwwards. 

By using it, you can benefit the most from automatic migrations available with major Spartacus releases, while still keeping flexibility for customizations and for building new features on top of it.

# Introduction

Spartacus is an Angular library, that's why it can be used solely in the Angular application, but can also be integrated into exiting Angular project, or, the other way around, you can add any other Angular solution or library to Spartacus project.
Spartacus itself comes with several layers and concept, moreover, with Spartacus 3.x we are progressing toward smaller feature libraries that can be lazy loaded out of the box. Customization and third-party code could only add to it, so it's quite hard to keep the balance and not end up with some god modules that mixes everything.

Keeping some standardized reference structure also helps in on-boarding new devs to the project, any external support cases and audits.


# Structure overview



## Spartacus Module

Every Angular application has to have its root app module, usually named `AppModule`. In complex aplication it should include more generic, application wide imports, that's we don't want to keep complex Spartacus related things in it, but we want to narrow it to only one `SpartacusModule`.

One note: 
Angular Router and Ngrx is used by Spartacus, but it's affecting global Application, so we keep them outside of `SpaartacusModule` and import it directly in the `AppModule`.

`SpartacusModule` is composed from:

- `BaseStorefrontModule` - encapsulated core Spartacus imports (usually requied by most of the Spartacus applications), imported directly from `@spartacus/storefront`
- `SpartacusFeaturesModule` - encapsulates Spartacus features
- `SpartacusConfigurationModule` - encapsulated general Spartacus configuration



