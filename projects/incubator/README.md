# Spartacus Incubator

Spartacus Incubator is a package that include features still in development. The features included in the library can be used but are likelly to evolve in future releases and might even get refactored over time. 

The incubator package might contain core and storefront related code. The incubator package might contain any code which later will be moved to other libraries, such as the core or storefront libraries.

Once a feature from the incubator library is ready for final release, it will get moved to the correct other Spartacus library.

The incubator library will have a seperate release strategy from the other Spartacus packages. The library will abide by the following rules: 

- The incubator library will never reach the major version of 1 as it will always be work in progress.
- Each version of the incubator library has hard dependendies on an exact version of the other Spartacus libraries. For example if Spartacus has a version of `1.4.0`, the incubator release will be `0.140.0`. Similarly, if we have a `1.5.0-next.0`, it would become `0.150.0-next.0`.
- The incubator library will support patch releases (i.e. 0.140.1)

For more information please see our [documentation](https://sap.github.io/spartacus-docs/).
