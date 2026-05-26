# Custom Hamburger Menu
The hamburger menu is based on an implementation from https://github.com/jonsuh/hamburgers. The library provides multiple configurable hamburger types. A specific type can be selected for a menu. 

In order to allow for custom hamburgers, we use the `cx-hamburger` selector in the hamburger component. This selector `extends` the hamburger selectors provided by the lib. 

In order to easily switch the hamburger type, we introduce the `$hamburger-type`, that can be set to the types provided by the library. 

Customers can use the following sass configuration to change the type: 

```scss
$cx-hamburger-type: elastic;

@import 'storefrontstyles/index';
```
**Note**: the sass variable must be set before importing the storefrontstyles lib.

The default library configurations can be applied as well, see https://github.com/jonsuh/hamburgers for more details. 
