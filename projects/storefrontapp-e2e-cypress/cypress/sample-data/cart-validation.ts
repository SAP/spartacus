export const PRODUCT_1 = {
  name: 'EASYSHARE Z730 Zoom Digital Camera',
  code: '325414',
};
export const PRODUCT_2 = {
  name: 'miniDV Head Cleaner',
  code: '2278102',
};

export const lowStockResponse = {
  cartModifications: [
    {
      entry: {
        product: {
          availableForPickup: true,
          code: '325414',
          name: 'EASYSHARE Z730 Zoom Digital Camera',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 1,
            stockLevelStatus: 'lowStock',
          },
        },
        quantity: 1,
      },
      quantity: 2,
      quantityAdded: 1,
      statusCode: 'lowStock',
    },
    {
      entry: {
        product: {
          availableForPickup: true,
          code: '2278102',
          name: 'miniDV Head Cleaner',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 1,
            stockLevelStatus: 'lowStock',
          },
        },
        quantity: 1,
      },
      quantity: 2,
      quantityAdded: 1,
      statusCode: 'lowStock',
    },
  ],
};

export const outOfStockResponse = {
  cartModifications: [
    {
      entry: {
        product: {
          availableForPickup: false,
          code: '325414',
          name: 'EASYSHARE Z730 Zoom Digital Camera',
          purchasable: true,
          stock: {
            isValueRounded: false,
            stockLevel: 0,
            stockLevelStatus: 'outOfStock',
          },
          url: '/Open-Catalogue/Cameras/Digital-Cameras/Digital-Compacts/EASYSHARE-Z730-Zoom-Digital-Camera/p/325414',
        },
        quantity: 0,
      },
      quantity: 2,
      quantityAdded: 0,
      statusCode: 'noStock',
    },
  ],
};
