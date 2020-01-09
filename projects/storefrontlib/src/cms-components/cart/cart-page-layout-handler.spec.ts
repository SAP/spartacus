import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { of } from 'rxjs';

describe('CartPageLayoutHandler', () => {
  const mockCartService: any = {
    getActive() {
      return of({ totalItems: 0 });
    },
  };
  const mockSelectiveCartService: any = {
    getCart() {
      return of({ totalItems: 0 });
    },
  };
  const mockFeatureConfigService: any = {
    isEnabled(_string) {
      return false;
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
  describe('Save for later feature is disable', () => {
    it('should create an instance', () => {
      expect(
        new CartPageLayoutHandler(
          mockCartService,
          mockSelectiveCartService,
          mockFeatureConfigService
        )
      ).toBeTruthy();
    });

    it('should remove cart slots when cart is empty', () => {
      const handler = new CartPageLayoutHandler(
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
      );

      let result;
      handler
        .handle(mockSlots$, cartPageTemplate)
        .subscribe(res => (result = res));
      expect(result).toEqual(['test', 'EmptyCartMiddleContent']);
    });

    it('should remove empty content slot when cart has items', () => {
      spyOn(mockCartService, 'getActive').and.returnValue(
        of({ totalItems: 3 })
      );
      const handler = new CartPageLayoutHandler(
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
      );

      let result;
      handler
        .handle(mockSlots$, cartPageTemplate)
        .subscribe(res => (result = res));
      expect(result).toEqual(['test', 'TopContent', 'CenterRightContentSlot']);
    });

    it('should return untouched stream if not a cart page template', () => {
      const handler = new CartPageLayoutHandler(
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
      );
      const slots$ = handler.handle(mockSlots$, 'different page');
      expect(slots$).toBe(mockSlots$);
    });
  });

  describe('Save for later feature is enable', () => {
    beforeEach(() => {
      spyOn(mockFeatureConfigService, 'isEnabled').and.returnValue(true);
    });
    it('should remove cart slots when cart and save for later are empty', () => {
      const handler = new CartPageLayoutHandler(
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
      );

      let result;
      handler
        .handle(mockSlots$, cartPageTemplate)
        .subscribe(res => (result = res));
      expect(result).toEqual(['test', 'EmptyCartMiddleContent']);
    });

    it('should remove empty content slot when cart has items', () => {
      spyOn(mockCartService, 'getActive').and.returnValue(
        of({ totalItems: 3 })
      );
      const handler = new CartPageLayoutHandler(
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
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
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
      );

      let result;
      handler
        .handle(mockSlots$, cartPageTemplate)
        .subscribe(res => (result = res));
      expect(result).toEqual(['test', 'TopContent']);
    });

    it('should return untouched stream if not a cart page template', () => {
      const handler = new CartPageLayoutHandler(
        mockCartService,
        mockSelectiveCartService,
        mockFeatureConfigService
      );
      const slots$ = handler.handle(mockSlots$, 'different page');
      expect(slots$).toBe(mockSlots$);
    });
  });
});
