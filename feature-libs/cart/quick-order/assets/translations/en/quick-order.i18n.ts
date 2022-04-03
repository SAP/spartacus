export const quickOrderCartForm = {
  entriesWereAdded: '({{ quantity }}) {{ product }} has been added to the cart',
  entryWasAdded: '{{ product }} has been added to the cart',
  noResults: 'We could not find any products',
  stockLevelReached: 'The maximum stock level has been reached',
  title: 'Quick Order',
  productCodePlaceholder: 'Enter ID',
  entryProductCode: 'Enter Product ID for Quick Order',
  quantity: 'Quantity for Quick Order',
  addToCart: 'Add Product to Quick Order',
  add: 'Add',
  product: 'Product',
  products: 'Products',
  productCodeLabel: 'Product ID',
  quantityLabel: 'Qty',
};

export const quickOrderForm = {
  placeholder: 'Enter Product name or SKU',
  searchBoxLabel:
    'Enter Product name or SKU for quick order. You can add up to {{ limit }} products per order.',
  listLimitReached: 'The product limit has been reached.',
  id: 'ID {{ id }}',
  noResults: 'We could not find any results',
  addProduct: 'Add product {{ product }}',
  initialDescription:
    'When autocomplete results are available use up and down arrows to review and enter to select.',
  productsResults: '{{ count }} products are available.',
  quickOrderSearch: 'Find product for quick order',
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
    reviewErrors: 'Please review these errors.',
    listIsFull:
      'The list is full, add these {{ count }} products to Cart in order to continue.',
    nonPurchasableError: 'Product {{ name }} cannot be purchased',
    outOfStockErrorFound: '{{count}} out of stock product was not added.',
    outOfStockErrorFound_other:
      '{{count}} out of stock products were not added.',
  },
  warnings: {
    productWasReduced:
      'Quantity for {{ name }} (#{{code}}) was reduced to {{ quantityAdded}}.',
    reviewWarnings: 'Please review these warnings.',
    reduceWarningFound: '{{count}} product quantity was reduced.',
    reduceWarningFound_other: '{{count}} products quantity were reduced.',
  },
  successes: {
    productAddedToCart: '{{ name }} (#{{code}}) was added to cart.',
    addedToCartFound: '{{ count }} product was added to cart.',
    addedToCartFound_other: '{{ count }} products were added to cart.',
  },
  informations: {
    addProductBeforeAddingToCart:
      'Add products to the list before adding to the cart.',
  },
  undo: 'UNDO',
  revokeUndo: 'Revoked product "{{name}}" deletion.',
  productWasDeleted: 'Product "{{ name }}" moved to trash.',
};

export const quickOrderTable = {
  product: 'Product',
  id: 'ID',
  price: 'Price',
  quantity: 'QTY',
  itemPrice: 'Item price',
  qty: 'Qty',
  actions: 'Actions',
  inStock: 'In Stock',
  lowStock: 'Low Stock',
  outOfStock: 'Out of Stock',
  listCleared: 'Quick order list has been cleared',
  addedtoCart: 'Quick order list has been added to the cart',
  caption: 'Quick order contents.',
};

export const quickOrder = {
  quickOrderCartForm,
  quickOrderForm,
  quickOrderList,
  quickOrderTable,
};
