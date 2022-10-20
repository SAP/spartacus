# Spartacus Smart Edit Library

Spartacus Smart Edit can be added to the existing Spartacus application by running `ng add @spartacus/smartedit`. For more information about Spartacus schematics, visit the [official Spartacus schematics documentation page](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/31164ec95c7c4136b1d1a4a371cad3c7/e38d45609de04412920a7fc9c13d41e3.html).

If you install smaredit library manually, after installation you also need to either copy the file `webApplicationInjector.js` from `node_modules/@spartacus/smartedit/asset` to your application's asset folder; or add this into "assets" array in your `angular.json`
  ```ts
    {
      "glob": "**/*",
      "input": "node_modules/@spartacus/smartedit/assets",
      "output": "assets/"
    }
 ```       

For more information, see [Spartacus](https://github.com/SAP/spartacus).
