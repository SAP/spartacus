# Wish List Feature Moved to the Wish List Library

Spartacus 5.0 introduces the extraction of the wishlist feature to the cart library.  The wishlist feature related code is moved out of `@spartacus/core` and `@spartacus/storefrontlib` into one of the cart lib's entry points.  The series of entry point that contain the wishlist feature start with `@spartacus/cart/wish-list/*`.  These entry points are:


## @spartacus/cart/wish-list/assets 
The wishlist i18n keys are moved here.

## @spartacus/cart/wish-list/components
Wishlist related UI code is moved here. This includes components, guards and ui services.

## @spartacus/cart/wish-list/core
The wishlist facade API implementations are moved here, as well as connectors, event builder, event listener, models, other services, and state management.

## @spartacus/cart/wish-list/occ
The wishlist related OCC code is moved here. This includes the checkout related adapters and converters.

## @spartacus/cart/wish-list/root
The root entry point is, by convention, meant to always be eager loaded.  It contains the config, events, facades, http interceptors and models.

## @spartacus/cart/wish-list/styles
The wishlist related scss styles are moved here.


