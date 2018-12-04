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
