# Configurable routes

## Introduction

The navigation in a web application is mostly done through URLs. URLs can be used to deeplink into a specific application state and contribute to the usability and SEO capabilities of the application. To that reason, it is most important that customers can customize those URLs.

In a Single Page Application, URLs are intercepted by the application logic so that the view(s) can be updated seamlessly. This requires *routing logic*, which, in case of Spartacus, is provided by the Angular Router.

While the Angular router contains a rich set of features and configuration options, Spartacus contains components that are intended to run without any configuration by default.

This is where configurable routes comes in to play - every route in Spartacus is configurable.

## How to: routing

[How to - recipes](./how-to-routing.md)

## Features

The following features are supported:

- [Routes configuration](./routes-configuration.md)
- [Configurable router links](./configurable-router-links.md)
- [Disabling standard routes](./disabling-standard-routes.md)
- [Additional route parameters](./additional-route-parameters.md)
- [Route aliases](./route-aliases.md)

## Future outlook

- [#186](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/186) support translation of routes in many languages
- [#334](https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/334) support configuration of lazy loaded routes

## Limitations

- Routing based on hash ([Angular's `HashLocationStrategy`](https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles)) is not supported