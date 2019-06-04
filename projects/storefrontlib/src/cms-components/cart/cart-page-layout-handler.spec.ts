import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { of } from 'rxjs';

describe('CartPageLayoutHandler', () => {
  const mockCartService: any = {
    getActive() {
      return of({ totalItems: 0 });
    },
  };
  const mockSlots = [
    'test',
    'EmptyCartMiddleContent',
    'TopContent',
    'CenterRightContentSlot',
  ];
  const mockSlots$ = of(mockSlots);
  const cartPageTemplate = 'CartPageTemplate';

  it('should create an instance', () => {
    expect(new CartPageLayoutHandler(mockCartService)).toBeTruthy();
  });

  it('should remove cart slots when cart is empty', () => {
    const handler = new CartPageLayoutHandler(mockCartService);

    let result;
    handler
      .handle(mockSlots$, cartPageTemplate)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'EmptyCartMiddleContent']);
  });

  it('should remove empty content slot when cart has items', () => {
    spyOn(mockCartService, 'getActive').and.returnValue(of({ totalItems: 3 }));
    const handler = new CartPageLayoutHandler(mockCartService);

    let result;
    handler
      .handle(mockSlots$, cartPageTemplate)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'TopContent', 'CenterRightContentSlot']);
  });

  it('should return untouched steam if not on a cart page', () => {
    const handler = new CartPageLayoutHandler(mockCartService);
    const slots$ = handler.handle(mockSlots$, 'different page');
    expect(slots$).toBe(mockSlots$);
  });
});
