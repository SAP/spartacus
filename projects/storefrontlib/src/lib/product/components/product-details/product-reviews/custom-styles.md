# Custom Styles

## Two columns layout

In order to split the review elements in 2 columns for better readability and effective use of the screen, the following snippet can be applied to the global styles (in your application).

```
cx-product-reviews .review {
  --cx-grid-template-columns: 20vw auto;
  --cx-text-align: left;

  .title {
    &:before {
      content: '"';
    }
    &:after {
      content: '"';
    }
  }
  cx-star-rating,
  .title,
  .name,
  .date {
    --cx-grid-column: 1;
    --cx-grid-row: auto;
  }
  .text {
    --cx-grid-column: 2;
    --cx-grid-row: 1 / span 5;
  }
  border-bottom: solid 1px var(--cx-light);

}
```

We can optimze this for small screens:

```
cx-product-reviews .review {
  @include media-breakpoint-down(md) {
    --cx-grid-template-columns: 1;
    .text {
      --cx-grid-column: 1;
      --cx-grid-row: auto;
    }
  }
}
```
