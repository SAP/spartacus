# Spartacus Smart Edit Library

Spartacus Smart Edit can be added to the existing Spartacus application by running `ng add @spartacus/smartedit`. For more information about Spartacus schematics, visit the [official Spartacus schematics documentation page](https://sap.github.io/spartacus-docs/schematics/).

If you install smaredit library manually, after installation you also need to either copy the file `webApplicationInjector.js` from `node_modules/@spartacus/smartedit/asset` to your application's asset folder; or add this into "assets" array in your `angular.json`
  ```ts
    {
      "glob": "**/*",
      "input": "node_modules/@spartacus/smartedit/assets",
      "output": "assets/"
    }
 ```       

For more information, see [Spartacus](https://github.com/SAP/spartacus).
