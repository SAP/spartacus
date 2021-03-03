/**
 * Mandatory data required to start a bundle. This includes the templateId of the bundle, the productCode, and the quantity of the product itself.
 *
 * @param productCode
 * Product code.
 *
 * @param quantity
 * Quantity of the product added to cart.
 *
 * @param templateId
 * Id of a template to create a bundle.
 */
export interface BundleStarter {
  productCode?: string;
  quantity?: number;
  templateId?: string;
}
