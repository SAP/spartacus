# Custom Styles

## Two rows layout example
```

.cx-header__content {
  --cx-grid-template-rows: 50px 50px;
  --cx-grid-template-columns: minmax(10px, auto) repeat(6, 1fr)
    minmax(10px, auto) minmax(10px, auto) minmax(10px, auto);
  .logo {
    --cx-grid-template-row: 1;
    --cx-grid-template-column: 1 / span 1;
  }
  .search {
    --cx-grid-template-row: 1;
    --cx-grid-template-column: 2 / span 6;
  }
  .nav-bar {
    --cx-grid-template-row: 2;
    --cx-grid-template-column: 1 / span 7;
  }
  cx-login {
    --cx-grid-template-row: 2;
    --cx-grid-template-column: 8 / span 2;
  }

  .minicart {
    --cx-grid-template-row: 2;
    --cx-grid-template-column: 10 / span 1;
  }

  cx-language-selector,
  cx-currency-selector,
  .store-finder,
  .sale,
  .contact,
  .help {
    display: none;
  }
```