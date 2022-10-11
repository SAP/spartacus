## Base Cart Feature Moved to the Cart Library

Spartacus 5.0 introduces the extraction of the base cart feature to the cart library.  The base cart feature related code is moved out of `@spartacus/core` and `@spartacus/storefrontlib` into one of the cart lib's entry points.  The cart lib already existed prior to 5.0 and is already split in sub features.  The base cart feature is placed inside de `base` sub feature in the cart lib.  The series of entry point that contain the base cart feature start with `@spartacus/cart/base/*`.  These entry points are:

## @spartacus/cart/base/assets 
The base cart  i18n keys are moved here.

## @spartacus/cart/base/components
Base cart related UI code is moved here. This includes components, guards and ui services.

## @spartacus/cart/base/core
The base cart facade API implementations are moved here, as well as connectors, event builder, event listener, models, other services, and state management.

## @spartacus/cart/base/occ
The base cart related OCC code is moved here. This includes adapters and converters.

## @spartacus/cart/base/root
The root entry point is, by convention, meant to always be eager loaded.  It contains the config, events, facades, http interceptors and models.

## @spartacus/cart/base/styles
The base cart related scss styles are moved here.

