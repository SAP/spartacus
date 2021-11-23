# SAP Enterprise Product Development Visualization integration

This library provides capabilities for viewing 2D and 3D content served from the SAP Enterprise Product Development Visualization services:
<https://www.sap.com/sea/products/enterprise-product-development.html>.

It can be added to the existing Spartacus application by running `ng add @spartacus/schematics` and including the `EPD Visualization Integration` module. For more information about Spartacus schematics, visit the [official Spartacus schematics documentation page](https://sap.github.io/spartacus-docs/schematics/).

To run a local storefront containing the components provided by this integration library, run the following in
the root directory of the repository (in OSX, linux or WSL):

`SPA_ENV=b2b,epd-visualization yarn start`

A product with configured spare part product references and corresponding 3D visualization data can be found by opening
the following URL in a web browser:

<http://localhost:4200/powertools-spa/en/USD/product/EVO-3-MIXER-DEMO/EvoMixer>
