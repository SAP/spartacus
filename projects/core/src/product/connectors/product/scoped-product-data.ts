import { Product } from '../../../model/product.model';
import { ScopedModelData } from '../../../model/scoped-model-data';

/**
 * Used in product connectors and adapter to load multiple product codes and scopes
 */
export type ScopedProductData = ScopedModelData<Product>;
