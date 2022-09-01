import { StateWithPickupOption } from '../pickup-option-state';
import { getPageContext, getPickupOption } from './pickup-option.selectors';

describe('PickupOptionSelectors', () => {
  const state: StateWithPickupOption = {
    'pickup-option': {
      pickupOption: [{ entryNumber: 0, pickupOption: 'delivery' }],
      pageContext: 'CART',
    },
  };

  it('should return the pickup option', () => {
    const result = getPickupOption(0)(state);
    expect(result).toEqual('delivery');
  });

  it('should return page context', () => {
    const result = getPageContext()(state);
    expect(result).toEqual('CART');
  });
});
