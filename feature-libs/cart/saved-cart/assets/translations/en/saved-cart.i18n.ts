export const savedCartDetails = {
  cartName: 'Name',
  cartDescription: 'Description',
  cartId: 'ID',
  dateSaved: 'Date Saved',
  items: 'Items',
  quantity: 'Quantity',
  total: 'Total',
  editSavedCart: 'Edit Saved Cart',
  deleteSavedCart: 'Delete Saved Cart',
  addSelectedItems: 'Add selected items',
  emptyCartItems: 'Empty Cart Items',
};

export const savedCartList = {
  savedCarts: 'Saved Carts ({{count}})',
  cartName: 'Name',
  cartId: 'Id',
  dateSaved: 'Date Saved',
  cartDescription: 'Description',
  quantity: 'Qty',
  total: 'Total',
  actions: 'Actions',
  makeCartActive: 'Make cart active',
  notFound: 'No Saved Carts Found',
  swapCartNoActiveCart:
    'Existing cart is activated by {{cartName}} successfully.',
  swapCartWithActiveCart:
    'Existing cart is activated by {{cartName}} successfully. Your previous items were saved in a cart {{previousCartName}}.',
};

export const savedCartCartPage = {
  messages: {
    cartSaved:
      'Your cart items have been successfully saved for later in the "{{cartName}}" cart',
  },
};

export const savedCartDialog = {
  saveForLater: 'Save For Later',
  itemsSavedForLater: 'All of the items in your cart will be saved for later',
  savedCartName: 'Saved Cart Name',
  savedCartDescription: 'Saved Cart Description',
  optional: 'optional',
  charactersLeft: 'characters left: {{count}}',
  cancel: 'Cancel',
  save: 'Save',
  restore: 'Restore',
  followingCartDelete: 'The following saved cart will be deleted',
  followingCartRestore:
    'The following saved cart will be restored as the active cart',
  delete: 'Delete',
  deleteCartSuccess: 'Cart Deleted Successfully',
  editCartSuccess: 'Cart Edited Successfully',
  editSavedCart: 'Edit Saved Cart',
  deleteSavedCart: 'Delete Saved Cart',
  restoreSavedCart: 'Restore Saved Cart',
  name: 'Name',
  id: 'ID',
  description: 'Description',
  quantity: 'QTY',
  total: 'Total',
  keepCopySavedCart: 'Keep a copy of this cart in the saved carts list',
  defaultCloneCartName: 'Copy of {{name}}',
  nameOfCloneCart: 'Name of copied cart',
};

export const addToSavedCart = {
  savedCarts: 'Saved carts',
  saveCartForLater: 'Save cart for later',
};

export const savedCart = {
  savedCartDetails,
  savedCartList,
  savedCartCartPage,
  savedCartDialog,
  addToSavedCart,
};
