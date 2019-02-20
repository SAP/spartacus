# Configuring styling

Spartacus provides two methods of styling customization. Firstly, the global look and feel of the site can be changed by providing a custom theme. Secondly, Spartacus offers a mechanism refered to as Flexible Styling which allows styling changes at the component level.

## Theming

The theming in Spartacus references the global look and feel of the site. This includes (but isn't limited to) colors, fonts and font sizes. Through re-theming of Spartacus, it's possible to create a site with your own custom branding and identity.

Spartacus provides a default styling library called Sparta in the @spartacus/styles package. This package should be imported into your project through the `styles.scss` file as describe in the settup and install guide.

There are three possible ways to personalize the Spartacus's theme.

#### Overriding global variables

The default Sparta theme provides a large number of variables that can be overriden to customize the theme. These variables are contained in the @spartacus/styles/scss/theme/sparta/_variables. In order to asign a new value to the scss variables the value in the variables has to be re-assigned before the library import.

For example

```scss
$primary: #e502bf
$font-weight-normal: 500;

@import '~@spartacus/styles/index';
```

#### Extending Sparta theme

Extending the Sparta theme is useful when the variabes do not provide enough options but you wish to re-use some of the style from Sparta.

Extending the library can be done by creating a new library and importing the default theme. This can be done like so.

Your custom theme library e.g. `custom-styles/index.scss`
```scss
@import '~@spartacus/styles/index';

// Custom Style or imports from other files
```
In your project `styles.scss`

```scss
@import 'custom-styles/index.scss';
```

An alternative method is to create a new library and import in to the project alongside the default theme.

```scss
@import '~@spartacus/styles/index';
@import 'custom-styles/index.scss';
```

#### Creating a brand new theme library

The final theme override is to completely omit the default styles import. 

**Note** This will brake the styling. Therefore, all the classes and variables present in Sparta have to be duplicated (can be modified) or their use has to be removed from the project.

## Flexible styling
For more fine grain customization, it is possible to affect the styling of each components directly. Built into each components style is a set of custom properties (css variables) that can be overridden. These variables are viewable from the browser's inspector.

The following procedure will demonstrate the steps to update a component's style.

1. Find the component's selector using the browser's inspector tool.
2. Using the inspector view the component's markup and available variables.
3. Write your custom SCSS in the file of your choice. The custom styling must 

#### Notes
- The custom SCSS can then be written directly in the app's style.scss file or in any other sylesheet included in the app.

- The rules from the custom SCSS will **not** override the default rules. The rules already present in Spartacus are overridable using custom properties.

e.g.

 This is a SCSS extract from Spartacus

```scss
cx-cart {
  .container {
    margin: var(--cx-margin, 0);
  }
}
```
🛑The folling code will not have an incidence on the margin but will change the display.
```scss
cx-cart {
  .container {
    display: inline-block;
    margin: 0 10px;
  }
}
```

✅The folling code will override the margin and change the display.
```scss
cx-cart {
  .container {
    display: inline-block;
    --cx-margin: 0 10px;
  }
}
```