# Custom Styles

## One Row Layout 
In order to make a simpler header with 1 row, the following snippet can be applied to the global styles containing logo, product search, my account, and mini-cart
```
.cx-header__content {
  --cx-grid-template-rows: 50px;
  --cx-grid-template-columns: repeat(2, minmax(10px, auto)) repeat(4, 1fr)
    minmax(10px, auto) minmax(10px, auto) minmax(10px, auto);

  .logo {
    --cx-grid-template-row: 1;
    --cx-grid-template-column: 1 / span 1;
  }
  .search {
    --cx-grid-template-row: 1;
    --cx-grid-template-column: 3 / span 4;
  }
  cx-login {
    --cx-grid-template-row: 1;
    --cx-grid-template-column: 8 / span 2;
  }

  .minicart {
    --cx-grid-template-row: 1;
    --cx-grid-template-column: 10 / span 1;
  }
  .nav-bar,
  cx-language-selector,
  cx-currency-selector,
  cx-mobile-menu,
  cx-tertiary-bar {
    --cx-component-visibility: none;
  }
}
```
![Layout Example](desktop-1row-header.png)