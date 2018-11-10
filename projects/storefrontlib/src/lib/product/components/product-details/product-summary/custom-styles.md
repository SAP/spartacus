# Custom Styles

```css
cx-product-summary .product-summary {
  --cx-grid-template-columns: minmax(20px, auto) minmax(20px auto);

  .item-title .code {
    display: none;
    --cx-align-items: center;
  }

  .item-rating {
    --cx-grid-row: 1;
    grid-row: 2;

    .review-link {
      display: none;
    }
  }

  .description {
    --cx-margin: 10px 0 10px 0;
  }
}
```

```css
cx-product-summary .product-summary {
  --cx-grid-template-columns: minmax(20px, auto) minmax(20px auto);

  .item-title .code {
    display: none;
    --cx-align-items: center;
  }

  .price {
    --cx-grid-row: 1;
    grid-column: 2;
  }

  .quantity {
    --cx-grid-row: 3;

    &-label {
      display: none;
    }

    &-counter {
      display: none;
    }
  }
}
```

```css
cx-product-summary .product-summary {
  --cx-grid-template-columns: minmax(20px, auto) minmax(20px auto);

  .quantity {
    --cx-grid-row: 1 / span 2;
    text-align: center;
    &-info {
      display: none;
    }

    &-label {
      display: none;
    }
  }

  cx-add-to-cart {
    min-width: 200px;
  }
}
```
