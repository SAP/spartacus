export const stockSelector = 'cx-add-to-cart .info';

export function configureInventoryDisplay(enable: boolean) {
  cy.cxConfig({
    cmsComponents: {
      ProductAddToCartComponent: {
        data: {
          inventoryDisplay: enable,
        },
      },
    },
  });
}
