# Custom Styles for the product detail sections

## Move tab items to an alternative position

The following (sass) snippet demonstrates how things can be moved.

```
.details {
  @include media-breakpoint-up(md) {
    > h3 {
      &:nth-of-type(2) {
        order: 1;
      }
    }
    > div {
      &:nth-of-type(3) {
        order: 3;
      }
    }
  }

  @include media-breakpoint-down(md) {
    > h3:nth-of-type(2),
    > div:nth-of-type(2) {
      order: 2;
    }
  }
}

```

**Note:** this is based on a grid system that has positions left in between the header items (`h3`) and the content items (`div`)

```
.details {
    > h3 {
        order: 2;
    }

  > div {
    order: 4;
  }
}
```
