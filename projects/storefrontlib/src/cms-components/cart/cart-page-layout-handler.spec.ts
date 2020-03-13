import { of } from 'rxjs';
import { CartPageLayoutHandler } from './cart-page-layout-handler';

describe('CartPageLayoutHandler', () => {
  const mockActiveCartService: any = {
    getActive() {
      return of({ totalItems: 0 });
    },
  };
  const mockSelectiveCartService: any = {
    getCart() {
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
  it('should remove cart slots when cart and save for later are empty', () => {
    const handler = new CartPageLayoutHandler(
      mockActiveCartService,
      mockSelectiveCartService
    );

    let result;
    handler
      .handle(mockSlots$, cartPageTemplate)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'EmptyCartMiddleContent']);
  });

  it('should remove empty content slot when cart has items', () => {
    spyOn(mockActiveCartService, 'getActive').and.returnValue(
      of({ totalItems: 3 })
    );
    const handler = new CartPageLayoutHandler(
      mockActiveCartService,
      mockSelectiveCartService
    );

    let result;
    handler
      .handle(mockSlots$, cartPageTemplate)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'TopContent', 'CenterRightContentSlot']);
  });

  it('should remove empty content slot when save for later has items', () => {
    spyOn(mockSelectiveCartService, 'getCart').and.returnValue(
      of({ totalItems: 3 })
    );
    const handler = new CartPageLayoutHandler(
      mockActiveCartService,
      mockSelectiveCartService
    );

    let result;
    handler
      .handle(mockSlots$, cartPageTemplate)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'TopContent']);
  });

  it('should return untouched stream if not a cart page template', () => {
    const handler = new CartPageLayoutHandler(
      mockActiveCartService,
      mockSelectiveCartService
    );
    const slots$ = handler.handle(mockSlots$, 'different page');
    expect(slots$).toBe(mockSlots$);
  });
});
