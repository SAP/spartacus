# Custom Styles

## Vertical thumb panel

The folowing snippets demonstrates the so-called amazon layout of thumbs. It's a small customisation that renders the thumbnails on the right hand side of the main image.

```
cx-product-images {
  --cx-flex-direction: row-reverse;
  justify-content: flex-end;

  .thumbs {
    flex-direction: column;
  }
}
```
