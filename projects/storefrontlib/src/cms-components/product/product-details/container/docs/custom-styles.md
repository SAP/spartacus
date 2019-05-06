# Custom Styles for the product detail sections

## Layout without tabs
In order to not make use of the standard tab layout, the feature flag can be set to false. This can be done in the application styles.scss. This will result in a different UI and the tab related styles will not end up in the final css. 

```
$useTabsOnPDP: false
```

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
