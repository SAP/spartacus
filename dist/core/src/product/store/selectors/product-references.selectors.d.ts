import { MemoizedSelector } from '@ngrx/store';
import { ProductReference } from '../../../model/product.model';
import { ProductReferencesState, StateWithProduct } from '../product-state';
export declare const getProductReferencesState: MemoizedSelector<StateWithProduct, ProductReferencesState>;
export declare const getSelectedProductReferencesFactory: (productCode: string, referenceType: string) => MemoizedSelector<StateWithProduct, ProductReference[]>;
