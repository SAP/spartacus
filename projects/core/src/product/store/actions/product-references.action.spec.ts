import { ErrorModel, ProductReferenceList } from '../../../occ/occ-models';
import * as fromActions from './product-references.action';

const productCode = 'productCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

describe('Product References Actions', () => {
  describe('LoadProductReferences Actions', () => {
    describe('LOAD_PRODUCT_REFERENCES', () => {
      it('should create the action', () => {
        const action = new fromActions.LoadProductReferences({ productCode });
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_PRODUCT_REFERENCES,
          payload: { productCode },
        });
      });
    });

    describe('LOAD_PRODUCT_REFERENCES_FAIL', () => {
      it('should create the action', () => {
        const payload: ErrorModel = { message: 'Load Error' };
        const action = new fromActions.LoadProductReferencesFail(payload);
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_PRODUCT_REFERENCES_FAIL,
          payload,
        });
      });
    });

    describe('LOAD_PRODUCT_REFERENCES_SUCCESS', () => {
      it('should create the action', () => {
        const list: ProductReferenceList = {
          references: [
            {
              referenceType: 'SIMILAR',
              target: product,
            },
            {
              referenceType: 'ACCESSORIES',
              target: product,
            },
          ],
        };

        const action = new fromActions.LoadProductReferencesSuccess({
          productCode,
          list: list.references,
        });
        expect({ ...action }).toEqual({
          type: fromActions.LOAD_PRODUCT_REFERENCES_SUCCESS,
          payload: { productCode, list: list.references },
        });
      });
    });
  });
});
