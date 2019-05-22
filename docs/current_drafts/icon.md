# Icon library
Like most storefronts, Spartacus uses icons in the UI. The icons in Spartacus can be used for your Storefront, but there's a good change that you like to replace them with a custom flavor. This document describes how icons are integared in the storefront and how you can configure them.

## Technical Icon Format
There are a a number of techniques to render icons on the web, including images, SVGs, fonts and native CSS. 

SVG sprites are consideredd best practice as they have the following advantages:
- **Scalable**  
  Vector based images remains crisp and clear at any resolution or size.
- **Styling**  
  SVG icons support transparency and styling by CSS. The styling can be applied withing the SVG icons file as well as in the outer DOM.
- **Spriting**  
  SVG icons can be combined in a single *sprite* file. The sprite can be created specifically for the storefront so that an optimized file is created. 
- **Animations**  
  Spartacus doesn't use animations in icons, but the format allows to add this.

Since Spartacus is shipped as a library, there's no straightforward approach to load SVG files. Libraries are installed in the node_modules folder, and using SVG based icons would require an import from an application location, such as the `/assets` folder. 
This is why Spartacus is configured (by default) to use a font based setup for icons. This is not necessarly the best practice for production, as most standard font icon sets cover more icons than needed for a storefront. 

### Icon Component
Icons are added to the storefront with a component, the `IconComponent`. The icon component requires a specific type:

```typescript
<cx-icon type="CART"></cx-icon>
```

The type is used to find the right icon setup in the configuration. With this approach, the integration of icons in the UI is decoupled from the actual implementation. This makes it easily possible to replace icons without changing a UI component implementation.

Depending on the configuration, the icon component either creates an inline SVG fragment or adds class names to the `cx-icon` element to align with a font library. The css class names could also be used for a CSS based icon solution, or even an image based icons solution (using CSS background images) 

The icon types have been made typesafe in Spartacus, using the `ICON_TYPE` enumeration. 

```typescript
export enum ICON_TYPE {
  CART = 'cart',
  SEARCH = 'search',
  ...
}
```

The enum is used when icons are added in the view:

```typescript
<cx-icon [type]="iconType.CART"></cx-icon>
```


## Icon Configuration
The icon configuration uses the Spartacus `ConfigModule`. The configuration allows to mix different technical icon formats in a single storefront. The configuration sample below demonstrates the usage of font based icons (using fontawesome) and SVG based icons. 

This configuration uses a setup to combine (bootstrap 3) glyphicons, fontawesome (both fas and fab) and SVG icons. 

```typescript
ConfigModule.withConfig(<IconConfig>{
    symbols: {
      CART: 'fas fa-shopping-cart',
      SEARCH: 'glyphicon glyphicon-search',
      VISA: 'fab fa-cc-visa',
      INFO: 'info',
      WARNING: 'warning'
    },
    resources: [
      {
        type: IconResourceType.LINK,
        url: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
      },
      {
        type: IconResourceType.SVG,
        url: './assets/sprite.svg',
        types: [ICON_TYPE.INFO,ICON_TYPE.WARNING],
      },
    ]
});
```

### SVG based icons
In order to construct the SVG icon, the component will create an `xlink` to the SVG symbol. If a `url` is given for the icon type, the symbol will be constructed using the url and symbol configuration. The above setup, will produce links to `./assets/sprite.svg#info` and `./assets/sprite.svg#warning`.

**Note**: to generate a font sprite for font awesome, you can use https://github.com/Minecrell/fontawesome-svg-sprite-generator. This is a convenient library to automically generate a sprite with the icons that you use in the storefront. Optionally, the icons can have a custom icon name. 

### Font based icons
To support font based icons the component simply adds the icon symbol to the list of style classes, for example 
```html
<cx-icon class="fas fa-shopping-cart"></cx-icon>
```

In order to load the font related CSS file, a resource can be added for a specific icon type or for all (by leaving out types entirely). When a resource is added, the CSS file be *linked* to the DOM dynamically. Spartacus will make sure that the font is only loaded once. 
