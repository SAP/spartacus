# Spartacus Styles Guidelines

Spartacus Styles is a styling library that provides global styling and theming to the [Spartacus Storefront](https://www.npmjs.com/package/@spartacus/storefront). The package should be used together with the Spartacus Storefront to build an eCommerce platform using SAP Commerce Cloud exclusively through the Commerce REST API. For more informations, see [Cloud Commerce Spartacus Storefront](https://github.com/SAP/cloud-commerce-spartacus-storefront).

This document addresses the following topics:

- How the [Design System](#the-design-system) (DS) is wired within the application.
- Where to extended the DS and customize components. EXAMPLEHERE
- How to structure code in [SCSS and HTML](#html-and-sass-structure) files.
- How to use [Mixins](#mixins) (ex. CSS-variables and Font).
- [Accessibility](#accessibility) considerations.
- How to [contribute](#contributing) to the DS and style a component.
- How to [report visual bugs](#reporting-visual-bugs).

## The Design System

All global styles concerning the Design Sytem are to be found in the following folder:

```
├── projects
|  └── storefrontstyles
|     ├── scss
```

The `theme` and the `ybase`, inside the scss folder, make the Design System.

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
└── ybase
```

### yBase

This is where we setup SASS mixins and functions and also where we extend the UI Framework of choice, _Bootstrap4_ is the default one and it's tied to _ng-bootstrap_ logic in some reusable components throughout the storefront. Anything we extend or customize here will have global impact in the application.

```
└── ybase
   ├── _functions.scss
   ├── _mixins.scss
   ├── _root.scss
   ├── _variables.scss
   ├── blocks
   ├── functions
   ├── layout
   └── mixins
```

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
$y-foo-color: 3 !default;
```

- Every CSS rule should contain a single selector, with only a few exceptions. Strive for the lowest possible specificity.

```scss
.y-foo {
  &__title {
    @include type('1');
    @include var-color('color', $y-foo-color);
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

### CSS variables

### Font

### Adding mixins

```└── ybase
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

## Accessibility

We're targeting at least a WCAG 2.0 Level AA compliance therefore we recommend:

- Use an appropriate HTML element or include relevant `role` attribute.
- Describe component states and properties using `aria` attributes.
- Test the following critical user journey:
  > _Successfully checkout a product using keyboard-only navigation_

## Contributing

Although we aim for a Framework agnostic Design System, the Beta version is largely based on Bootstrap4 (BS4), therefore please keep in mind the following when tailoring your contribution in order to have it code reviewed more promptly:

### Recommended

- Extended BS4 generic components in the folder `storefrontstyle/ybase` only, this is sensitive because…
- Follow the BEM naming convention detailed under the "HTML and SASS structure" title above.
- Convert values to variables when they are key to further customization by frontend developers or designers: heights, paddings, colors and hardcode those that are unlikely to be changed (EXAMPLEHERE)
- Leverage implicit focus over tabindex focus.
- BEM naming convention should be descriptive of usage not visual representation and must start with the common UI component's file name prefixed with cx- (EXAMPLEHERE)
- Go for the lowest possible specificity.
- Use already made mixins as much as possible, specially for fonts, colors and type.

### Avoid

- Using simple CSS arrangements and specificity (.carousel .slide) instead use… (EXAMPLEHERE)
- Restyling Bootstrap classes (or any framework) in common UI component files. Ex. `.row, .container, .btn`, instead add your own BEM custom classes additionally to those of BS4 `.y-foo__checkout-row, .y-foo__checkout-container, .y-foo__checkout-button`
- Creating keyboard traps that prevent _**keyboard-only**_ users to checkout a product.

## Reporting visual bugs

Please note a screenshot attachment is mandatory to consider the issue as valid, also please follow the general [contributing](#CONTRIBUTING.md) guidelines when submitting
