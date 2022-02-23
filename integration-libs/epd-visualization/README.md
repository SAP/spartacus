# SAP Enterprise Product Development Visualization integration

This library provides capabilities for viewing 2D and 3D content served from the SAP Enterprise Product Development Visualization services:
<https://www.sap.com/sea/products/enterprise-product-development.html>.

To add sample data for this integration library, please update your SAP Commerce Cloud installation to include the `epdvisualizationspartacussampledata` extension which can be found here:
<https://github.tools.sap/cx-commerce/epdvisualizationspartacussampledata>

This integration library can be added to the existing Spartacus application by running `ng add @spartacus/schematics@latest` and including the `EPD Visualization Integration` module.

Use the following to use the sample data created the `epdvisualizationspartacussampledata` extension:
`ng add @spartacus/schematics@latest --baseSite=powertools-epdvisualization-spa`

For more information about Spartacus schematics, visit the [official Spartacus schematics documentation page](https://sap.github.io/spartacus-docs/schematics/).

The `epdvisualizationspartacussampledata` extension creates the following products in the `powertools-epdvisualization-spa` site which have spare part product references that can be linked to corresponding visualization data:

- VSS_CX704
- VSS_CX704_2D
