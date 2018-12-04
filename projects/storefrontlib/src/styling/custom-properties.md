# CSS Custom properties

**Background**

Custom properties are used for a number of reasons:
- ability to override css rule without worying about specificity
- ability to override css rule regardless of view encapsulation (i.e. shadow dom)
- runtime configurable (no build needed)
- inheritance cross the full dom (including shadow dom)

Angular's emulated view encapsulation generates unique attributes to the component markup and binds the css selectors to it. This is the so-called emlated encapsulation, which is pretty usefull for application development. However, with prebuild components which are shipped in a library, it doesn'tallow for flexible voerrides, since the specificity of the components will always 'win'. This problem is illustrated with the following snippet:

```html
<component-selector _nghost-c14></component-selector>
```
```css
component-selector[_nghost-c14] {
    color:red;
}
```
In order to allow for custom style *values*, we'll use css custom properties as the default value. The standard (spartacus) value is used as a fallback, so that only in case a custom property is specified for the element, the custom value is used instead. This is demonstrated in the following css example:
```css
component-selector[_nghost-c14] {
    color:var(--cx-color, red);
}
```
A custom css can now influence the color value:
```css
component-selector {
    --cx-color: blue;
}
```

**What about preprocessing?**

Since components are precompiled and distributed in a library, there's no proper approach to use pre-processing technique (such as SASS). 

# Custom property types
There are 2 types of variables we use in our code base:
1. Global custom properties
2. Component specific custom properties

Since custom properties do not have a way to distinquish the two, we use a naming convention. 

## Global custom properties
The global variables values are defined in themes. 

Theme variables represent an opiniated set of css values. They're intended as example values, demonstrating the flexibility of the storefront style layer. 

Theme variables are used cross components as a default value, so that the values is used whenever there's no custom alternative available. 

The example code below shows a number of global theme variables.

```css
:root {
    --cx-g-font-size:1rem;
    --cx-g-border-radius: 10px;
    --cx-g-duration: 0.6s;
}
```

The syntax must follow the following convention:

`[--cx]-[CSS rule]`


**Variations**
In some cases an variantion is needed, for example to distinquish the primary and secondary color. 

```css
:root {
    --cx-color-primary: red;
}
```

In those cases, the variant is added to the previous construct:

`[--cx]-[CSS rule]-[variant]`
