# CSS Custom properties

**Background**

Custom properties are used for a number of reasons:
- ability to override css rule without worying about specificity
- ability to override css rule regardless of view encapsulation (i.e. shadow dom)
- runtime configurable (no build needed)
- inheritance cross the full dom (including shadow dom)

Angular's emulated view encapsulation generates unique attributes to the component markup and binds the css selectors to it. This is the so-called emulated encapsulation, which is pretty usefull for application development. However, with prebuild components which are shipped in a library, it doesn'tallow for flexible overrides, since the specificity of the components will always 'win'. This problem is illustrated with the following snippet:

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

`[--cx]-[g]-[CSS rule]`


**Variations**
In some cases an variantion is needed, for example to distinquish the primary and secondary color. 

```css
:root {
    --cx-color-primary: red;
}
```

In those cases, the variant is added to the previous construct:

`[--cx]-[CSS rule]-[variant]`


## Component specific custom properties
Component variables are used in components to allow for customization purposes. The standard value should always be provided by the fallback. This way, customizations can provide a custom value. 
Whenever there's a theme variable that could be used, the component should use this as a fallback. If there's not theme variable applicable the component should fallback to a hardcoded value (which could be controlle in a sass variable to centralize).

The example below shows an example for a component style that specifies the `color` for the component host element. The component uses the primary color as a fallback. 

```css
:host {
    color: var(--cx-color, var(--cx-g-color-primary));
}
```

The example below shows an example for a component style that specifies the `width` for the component host element. There's no logical global width value that could be applied, which is why we fallback to a hardcoded value. 

```css
:host {
    width: var(--cx-width, 5vw);
}
```

The format of component variables must follow the following convention:

`[--cx]-[CSS rule]`
