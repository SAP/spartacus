import { configureApparelProduct } from '../../../helpers/product-details';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Pickup delivery options', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      configureApparelProduct();
    });

    it('test', () => {});
  });
});
