# Spartacus Styles Guidelines

Spartacus Styles is a styling library that provides global styling and theming to the [Spartacus Storefront](https://www.npmjs.com/package/@spartacus/storefront). The package should be used together with the Spartacus Storefront to build an eCommerce platform using SAP Commerce Cloud exclusively through the Commerce REST API. For more informations, see [Cloud Commerce Spartacus Storefront](https://github.com/SAP/cloud-commerce-spartacus-storefront).

This document addresses the following topics:

- [Design System](#the-design-system) (DS) global _wiring_ within the application.
- [Extending](#cxBase) the DS and customizing global components. EXAMPLEHERE
- [SCSS and HTML](#html-and-sass-structure) code structure.
- [Mixins](#mixins): Using and creating new ones.
- [Accessibility](#accessibility) considerations.
- [Contribute](#contributing) to the DS and style components.
- [Report visual bugs](#reporting-visual-bugs).

## The Design System

All global styles concerning the Design Sytem are to be found in the following folder:

```
├── projects
|  └── storefrontstyles
|     ├── scss
```

The `theme` and the `cxbase`, inside the scss folder, make the Design System.

### Theme

Here is where we customize the _look and feel_ of the storefront, 2 themes are provided: _Sparta_ being the default one and _Lambda_ as a test theme to demo how to quickly change themes and as lead on to how to customize or create a new theme.

```
├── theme
|  ├── lambda
|  └── sparta
```

To switch from one theme to another, go to the `_theme.scss` file: comment out _sparta_ variables and uncomment _lambda_.

```
├── _theme.scss
├── theme
└── cxbase
```

### cxBase

This is where we setup SASS mixins and functions and also where we extend the UI Framework of choice, _Bootstrap4_ is the default one and it's tied to _ng-bootstrap_ logic in some reusable components throughout the storefront. Anything we extend or customize here will have global impact in the application.

```
└── cxbase
   ├── _functions.scss
   ├── _mixins.scss
   ├── _root.scss
   ├── _variables.scss
   ├── blocks
   ├── functions
   ├── layout
   └── mixins
```

EXAMPLEHERE

## HTML and SASS structure

### SASS

- Employ the theme variables, functions and mixins to apply the design system. It should be extremely rare to hard code a color, font-size, margin, or breakpoint.
- Ensure components have access to the global SASS variables and useful functions and mixins:

```
@import "theme";
@import "functions";
@import "mixins";
```

- Declare SASS variables to store variable that could later help customize the storefront if we transfer them to the theme at some point:

```scss
$cx-foo-color: 'primary' !default;
```

- Every CSS rule should contain a single selector, with only a few exceptions. Strive for the lowest possible specificity.

```scss
.cx-foo {
  &__title {
    @include type('1');
    @include var-color('color', $cx-foo-color);
  }
  &__list {
    @include list-unstyled();
  }
  &__item {
    margin-bottom: $spacer;
  }
  &__link {
    color: theme-color(secondary);
  }
  &__note {
    color: theme-color('warning');
  }
}
```

### HTML

The following recommendation are to be taken from the styling perspective only, these are not TypeScript coding guidelines, that said, the HTML structure most correspond to what the SASS file structure reflects. For example, to reflect the SASS code above. (EXAMPLEHERE)

```html
<p>Sample HTML Div</p>
```

## Mixins

Some mixins are already in place to extend repetitive behavior or styling across components, all of them to be found in the `mixins` folder and to be registered in the `_mixins` file one level up, as shown in the tree structure below.

```
   ├── _mixins.scss
   ├── blocks
   ├── functions
   ├── layout
   └── mixins
      ├── _button-reset.scss
      ├── _placeholder.scss
      ├── _reset.scss
      ├── _transformations.scss
      ├── _type.scss
      ├── _var-color.scss
      └── _weight.scss
```

A couple of mixins to be highlited due to their importance are `var-color` and `type` which are addressed individually in the next titles.

### CSS variables

The `var-color` mixin parses a _CSS property_ and a _SASS value name_ from the `theme-colors` and results in the duplication of that CSS property, one of the using a CSS variable taken from the `:root` and another one with a fallback HEX color value.
To use the mixin properly when styling a component we first need to store the _value name_ in a SASS variable and then pass that variable to the mixin.

For example:

```scss
$cx-foo-background-color: 'warning' !default;

.cx-foo {
  @include var-color('background-color', $cx-foo-background-color);
}
```

Will result in:

```css
.cx-foo {
  background-color: var(--cx-warning);
  background-color: #ffc107;
}
```

Note that the `var-color` mixin works together with a SASS function inside the `cxbase/_root.scss` file. That function converts all SASS `theme-colors` variables to equivalent CSS variables and will store them in the `:root`, then the `var-color` mixin will take those stored values when names match, therefore attention has to be paid to typos, as this can make the mixin and its fallback fail. In the example above had use the word `waring` instead of `warning` and if there is no such value name in the **theme**, then the mixin will fail.

### Type

The `type` mixin

facilitates the inclusion of font families, styles, sizes and weights

in order to keep an organized inventory of all types used in the storefront for better customization.

predefined by a **Web Designer**

For example

```scss
.cx-foo {
  @include type('1');
}
```

Will result in:

```css
.cx-foo {
  font-size: 2.25rem; //36px
  font-weight: 400;
  line-height: 1.22222222;
}
```

Include img table here

### Adding mixins

## Accessibility

We're targeting at least a WCAG 2.0 Level AA compliance therefore we recommend:

- Use an appropriate HTML element or include relevant `role` attribute.
- Describe component states and properties using `aria` attributes.
- Test the following critical user journey:
  > _Successfully checkout a product using keyboard-only navigation_

## Contributing

Although we aim for a Framework agnostic Design System, the Beta version is largely based on Bootstrap4 (BS4), therefore please keep in mind the following when tailoring your contribution in order to have it code reviewed more promptly:

### Recommended

- Extended BS4 generic components in the folder `storefrontstyle/cxbase` only, this is sensitive because…
- Follow the BEM naming convention detailed under the "HTML and SASS structure" title above.
- Convert values to variables when they are key to further customization by frontend developers or designers: heights, paddings, colors and hardcode those that are unlikely to be changed (EXAMPLEHERE)
- Leverage implicit focus over tabindex focus.
- BEM naming convention should be descriptive of usage not visual representation and must start with the common UI component's file name prefixed with cx- (EXAMPLEHERE)
- Go for the lowest possible specificity.
- Use already made mixins as much as possible, specially for fonts, colors and type.

### Avoid

- Using simple CSS arrangements and specificity (.carousel .slide) instead use… (EXAMPLEHERE)
- Restyling Bootstrap classes (or any framework) in common UI component files. Ex. `.row, .container, .btn`, instead add your own BEM custom classes additionally to those of BS4 `.cx-foo__checkout-row, .cx-foo__checkout-container, .cx-foo__checkout-button`
- Creating keyboard traps that prevent _**keyboard-only**_ users to checkout a product.

## Reporting visual bugs

Please note a screenshot attachment is mandatory to consider the issue as valid, also please follow the general [contributing](#CONTRIBUTING.md) guidelines when submitting
