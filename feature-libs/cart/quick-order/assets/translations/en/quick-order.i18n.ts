export const quickOrderCartForm = {
  entriesWasAdded: '({{ quantity }}) {{ product }} has been added to the cart',
  entryWasAdded: '{{ product }} has been added to the cart',
  noResults: 'We could not find any products',
  stockLevelReached: 'The maximum stock level has been reached',
  title: 'Quick Order',
  productCodePlaceholder: 'Enter ID',
  addToCart: 'Add',
  product: 'Product',
  products: 'Products',
  productCodeLabel: 'Product ID',
  quantityLabel: 'Qty',
};

export const quickOrderForm = {
  placeholder: 'Enter Product name or SKU',
  listLimitReached: 'The product limit has been reached',
};

export const quickOrderList = {
  addToCart: 'Add to cart',
  emptyList: 'Empty list',
  header: 'Add Products/Skus',
  subHeader: 'You can add up to {{ limit }} valid SKU at a time.',
  errorProceedingToCart: 'Error proceeding to Cart.',
  warningProceedingToCart: 'Warning proceeding to Cart.',
  successfullyAddedToCart: 'Successfully added to Cart.',
  errors: {
    productIsOutOfStock: '{{ name }} (#{{code}}) is out of stock.',
  },
  warnings: {
    productWasReduced:
      'Quantity for {{ name }} (#{{code}}) was reduced to {{ quantityAdded}}.',
  },
  successes: {
    productAddedToCart: '{{ name }} (#{{code}}) was added to cart.',
  },
};

export const quickOrderTable = {
  product: 'Product',
  id: 'ID',
  price: 'Price',
  quantity: 'QTY',
  itemPrice: 'Item price',
  qty: 'Qty',
  inStock: 'In Stock',
  lowStock: 'Low Stock',
  outOfStock: 'Out of Stock',
  listCleared: 'Quick order list has been cleared',
  addedtoCart: 'Quick order list has been added to the cart',
};

export const quickOrder = {
  quickOrderCartForm,
  quickOrderForm,
  quickOrderList,
  quickOrderTable,
};
