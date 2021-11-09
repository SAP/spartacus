export const quickOrderCartForm = {
  /**
   * @deprecated since 4.2, use entriesWereAdded instead
   */
  entriesWasAdded: '({{ quantity }}) {{ product }} has been added to the cart',
  entriesWereAdded: '({{ quantity }}) {{ product }} has been added to the cart',
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
  id: 'ID {{ id }}',
  noResults: 'We could not find any results',
};

export const quickOrderList = {
  addToCart: 'Add to cart',
  emptyList: 'Empty list',
  header: 'Add Products/SKUs',
  subHeader: 'You can add up to {{ limit }} valid SKU at a time.',
  errorProceedingToCart: 'Error proceeding to Cart.',
  warningProceedingToCart: 'Warning proceeding to Cart.',
  successfullyAddedToCart: 'Successfully added to Cart.',
  errors: {
    productIsOutOfStock: '{{ name }} (#{{code}}) is out of stock.',
    reviewErrors: 'Please review these errors',
  },
  warnings: {
    productWasReduced:
      'Quantity for {{ name }} (#{{code}}) was reduced to {{ quantityAdded}}.',
    reviewWarnings: 'Please review these warnings',
  },
  successes: {
    productAddedToCart: '{{ name }} (#{{code}}) was added to cart.',
  },
  undo: 'UNDO',
  productWasDeleted: 'Product "{{ name }}" moved to trash.',
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
