# Icon library
Like most storefronts, Spartacus uses icons in the UI. The icons used in Spartacus can be used for your Storefront, but there's a good change that you like them to be replaced by a customer flavor. This document describes how icons are integared in the storefront and how you can replace them.

## Technical Icon Format
There are a few different techniques to display icons on the web. Images, SVG, fonts or native CSS. 

Spartacus prefers SVG sprites for icons. This is considered as one of the best practice, as SVG icons have the following advantages:
- **Scalable**  
  Vector based images remains crisp and clear at any resolution or size.
- **Styling**  
  SVG icons support transparency and styling by CSS. The styling can be applied withing the SVG icons file as well as in the outer DOM.
- **Spriting**  
  SVG icons can be combined in a single *sprite* file. The sprite can be created specifically for the storefront so that an optimized file is created. 
- **Animations**  
  Spartacus doesn't use animations in icons, but the format allows to add this.

SVG sprite images should be loaded from a file, either from an external (CDN) location or from a local file from the asset folder. Since Spartacus is shipped as NPM packages (in the node_modules folder), there's no file that can be loaded from the  application asset folder. By default, Sparatcus therefor loads icons from an existing font libary (bootstrap glyphicons), so that the storefront can set setup quickly. This is not necessarly the best practice for production, as the font covers way more fonts than needed. 


### Icon Component
To allow for configurable icons, the icons are pulled in through an icon component (`IconComponent`). The icon component (`cx-icon`) can be used with a specific type:

```typescript
<cx-icon [type]="iconTypes.CART"></cx-icon>
```

Depending on the configuration, the icon component either creates an inline SVG fragment or adds class names to the `cx-icon` element to align with a font library.

The different icon types have been made typesafe in Spartacus, so that the type names can be changed over time without breaking the implementation. You can introduce a custom mapping for existing icon, which might be requried when you use another icon library.

```typescript
export enum ICON_TYPES {
  CART = 'cart',
  SEARCH = 'search',
  ...
}
```

### Configuration properties
There are a couple of configuration options available that can be used to change the behaviour of the icon component:

| property | description|
| --- | --- |
| useSvg | boolean flag that indicates the icon component to generate the SVG html instead of CSS classes. |
| svgPath | (optional) Indicates the path from where the SVG icons are loaded.   |
| prefix | The prefix can be used to address the icon id (in svg) or icon class. Icon libraries tend to prefix their icons. The prefix can be used for both prefixing the svg id or style class. |
| icons | Icon specific type that is mapped to name (or css class) for the given icon. |



## Font based icon libraries
There a large number of icon font libraries that can be used. A number of popular libraries use the same technique to load fonts. Font libraries are used with CSS. The library typically assings a common class to an element in combination with an icon specific class. Often, the icons specific class comes with a library prefix. 
The bootstrap glypihon icon library for example uses the following syntax:

```html
<i class="glyphicon glyphicon-shopping-cart"></i>
```

Glyphicons are used by default in Spartacus, and are setup with the following configuration:

```typescript
ConfigModule.withConfig(<IconConfig>{
    icon: {
        iconClass: 'glyphicon'
        prefix: 'glyphicon-'
    }
})
```

The icon component uses the configuration to generate the required html structure. 

To move to another font library, for example *font awesome*, the following configuration can be used:

```typescript
ConfigModule.withConfig(<IconConfig>{
    icon: {
        iconClass: 'fas'
        prefix: 'fa-',
        icons: {
            [ICON_TYPES.CART]: 'shopping-cart'
        }
    }
})
```

The example also demonstrates that some font libraries might use different icon names. The icon names can be configured in the icons object, by referencing the icon types. 

### Import the font library
The above configuration is not loading the font itself. This is done by importing the font in the application, for example in the `index.html` or inline in a CSS file.  

## SVG sprite images
The main disadvantage of a font icon library is that the library contains more icons then necessary for a storefront. This section demostrates the configuration for a SVG sprite solution. The sprite image can be setup with the necessary icons only. 

The following example configuration demonstrates how you can adapt the font awesome SVG images:

```typescript
ConfigModule.withConfig(<IconConfig>{
    icon: {
        useSvg: true,
        svgPath: 'assets/icons.svg',
        prefix: 'fas-fa-',
        icons: {
            [ICON_TYPES.LIST_MODE]: 'bars',
        }
    }
});
```

This configuration generates the following html structure for very icon, where `shopping-cart` is based on the icon type.

```html
<svg>
    <use xlink:href="assets/icons.svg#fas-fa-shopping-cart"></use>
</svg>
```

**Note**: to generate a font sprit for font awesome, you can use https://github.com/Minecrell/fontawesome-svg-sprite-generator. This is a convenient library to automically generate a sprite with the icons that you use in the storefront. Optionally, the icons can have a custom icon name. 
