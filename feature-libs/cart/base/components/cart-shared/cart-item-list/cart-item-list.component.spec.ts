import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartFacade,
  CartItemComponentOptions,
  ConsignmentEntry,
  MultiCartFacade,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import {
  FeatureConfigService,
  I18nTestingModule,
  UserIdService,
} from '@spartacus/core';
import { OutletContextData, PromotionsModule } from '@spartacus/storefront';
import { Observable, Subject, of } from 'rxjs';
import { CartItemListComponent } from './cart-item-list.component';

class MockActiveCartService {
  updateEntry() {}
  removeEntry() {}
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of(mockUserId);
  }
}

class MockMultiCartService implements Partial<MultiCartFacade> {
  updateEntry(
    _userId: string,
    _cartId: string,
    _entryNumber: number,
    _quantity: number
  ): void {}

  removeEntry(_userId: string, _cartId: string, _entryNumber: number): void {}
}

const mockItem0 = {
  quantity: 1,
  entryNumber: 0,
  product: {
    code: 'PR0000',
  },
  updateable: true,
};
const mockItem1 = {
  quantity: 5,
  entryNumber: 1,
  product: {
    code: 'PR0001',
  },
  updateable: true,
};
const mockItems: OrderEntry[] = [mockItem0, mockItem1];

const nonUpdatableItem = {
  quantity: 1,
  entryNumber: 0,
  product: {
    code: 'PR0000',
  },
  updateable: false,
};

const mockConsignmentItems: ConsignmentEntry[] = [
  {
    quantity: 3,
    orderEntry: {
      quantity: 5,
      entryNumber: 1,
      product: {
        code: 'PR0000',
      },
    },
  },
];

const mockCartId = 'test-cart';
const mockUserId = 'test-user';

@Component({
  template: '',
  selector: '[cx-cart-item-list-row], cx-cart-item-list-row',
})
class MockCartItemComponent {
  @Input() item;
  @Input() readonly;
  @Input() quantityControl;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
}

const mockContext = {
  readonly: true,
  hasHeader: true,
  options: { isSaveForLater: false },
  cartId: 'test',
  items: [mockItem0, mockItem1],
  promotionLocation: 'test',
  cartIsLoading: true,
};
const context$ = of(mockContext);

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;
  let activeCartService: ActiveCartFacade;
  let multiCartService: MultiCartFacade;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['removeEntry', 'updateEntry']
  );

  function configureTestingModule(): TestBed {
    return TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        PromotionsModule,
        I18nTestingModule,
      ],
      declarations: [CartItemListComponent, MockCartItemComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: SelectiveCartFacade, useValue: mockSelectiveCartService },
        { provide: MultiCartFacade, useClass: MockMultiCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });
  }

  function stubSeviceAndCreateComponent() {
    fixture = TestBed.createComponent(CartItemListComponent);
    activeCartService = TestBed.inject(ActiveCartFacade);
    multiCartService = TestBed.inject(MultiCartFacade);

    component = fixture.componentInstance;
    component.items = [mockItem0, mockItem1];
    component.options = { isSaveForLater: false };

    spyOn(activeCartService, 'updateEntry').and.callThrough();
    spyOn(multiCartService, 'updateEntry').and.callThrough();
    spyOn(multiCartService, 'removeEntry').and.callThrough();

    fixture.detectChanges();
  }

  describe('Not use outlet with outlet context data', () => {
    beforeEach(() => {
      configureTestingModule();
      stubSeviceAndCreateComponent();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should work with consignment entries', () => {
      component.items = mockConsignmentItems;
      expect(component.items[0].quantity).toEqual(3);
      expect(component.items[0].product.code).toEqual('PR0000');
    });

    it('should return form control with quantity ', () => {
      const item = mockItems[0];
      component.getControl(item).subscribe((control) => {
        expect(control.get('quantity').value).toEqual(1);
      });
    });

    it('should return enabled form group', () => {
      const item = mockItems[0];
      let result: UntypedFormGroup;
      component
        .getControl(item)
        .subscribe((control) => {
          result = control;
        })
        .unsubscribe();

      expect(result.enabled).toEqual(true);
    });

    it('should return disabled form group when updatable is false', () => {
      component.items = [nonUpdatableItem, mockItem1];
      fixture.detectChanges();

      let result: UntypedFormGroup;
      component
        .getControl(nonUpdatableItem)
        .subscribe((control) => {
          result = control;
        })
        .unsubscribe();

      expect(result.disabled).toEqual(true);
    });

    it('should return disabled form group when readonly is true', () => {
      component.readonly = true;
      component.items = [mockItem0, mockItem1];
      fixture.detectChanges();
      const item = mockItems[0];
      let result: UntypedFormGroup;
      component
        .getControl(item)
        .subscribe((control) => {
          result = control;
        })
        .unsubscribe();

      expect(result.disabled).toEqual(true);
    });

    it('should call cartService with an updated entry', () => {
      const item = mockItems[0];
      component
        .getControl(item)
        .subscribe((control) => {
          control.get('quantity').setValue(2);
          expect(activeCartService.updateEntry).toHaveBeenCalledWith(
            item.entryNumber as any,
            2
          );
        })
        .unsubscribe();
    });

    it('should call cartService.updateEntry during a remove with quantity 0', () => {
      const item = mockItems[0];
      component
        .getControl(item)
        .subscribe((control) => {
          control.get('quantity').setValue(0);
          expect(activeCartService.updateEntry).toHaveBeenCalledWith(
            item.entryNumber as any,
            0
          );
        })
        .unsubscribe();
    });

    it('should have controls updated on items change', () => {
      fixture.detectChanges();
      const multipleMockItems = [
        {
          quantity: 5,
          entryNumber: 1,
          product: {
            id: 1,
            code: 'PR0000',
          },
        },
        {
          quantity: 3,
          entryNumber: 2,
          product: {
            id: 2,
            code: 'PR0001',
          },
        },
      ];
      component.items = multipleMockItems;
      fixture.detectChanges();
      expect(
        component.form.controls[multipleMockItems[0].entryNumber]
      ).toBeDefined();
      expect(
        component.form.controls[multipleMockItems[1].entryNumber]
      ).toBeDefined();
    });

    it('should update controls when quantity change', () => {
      fixture.detectChanges();
      const mockItem0Qty = mockItem0.quantity;
      mockItem0.quantity = 20;
      component.items = [mockItem0, mockItem1];
      expect(
        component.form.controls[mockItem0.entryNumber].get('quantity')?.value
      ).toEqual(20);
      mockItem0.quantity = mockItem0Qty;
    });

    it('should be able to remove entry with free promotion product ', () => {
      const mockItem3 = {
        quantity: 1,
        entryNumber: 2,
        product: {
          code: 'PR0000',
        },
        updateable: true,
      };
      component.items = [mockItem0, mockItem1, mockItem3];
      fixture.detectChanges();
      component.items = [mockItem0];
      fixture.detectChanges();
      expect(component.form.controls[mockItem0.entryNumber]).toBeDefined();
      expect(Object.keys(component.form.controls).length).toEqual(1);
    });

    it('remove entry from save for later list', () => {
      component.options = { isSaveForLater: true };
      fixture.detectChanges();
      const item = mockItems[0];
      expect(component.form.controls[item.entryNumber]).toBeDefined();
      component.removeEntry(item);
      expect(mockSelectiveCartService.removeEntry).toHaveBeenCalledWith(item);
      expect(component.form.controls[item.entryNumber]).toBeUndefined();
    });

    it('remove entry from cart', () => {
      spyOn(activeCartService, 'removeEntry').and.callThrough();
      const item = mockItems[0];
      expect(component.form.controls[item.entryNumber]).toBeDefined();
      component.removeEntry(item);
      expect(activeCartService.removeEntry).toHaveBeenCalledWith(item);
      expect(component.form.controls[item.entryNumber]).toBeUndefined();
    });

    it('should handle null item lists properly', () => {
      component.items = undefined;
      const itemCount = component.items.length;
      expect(itemCount).toEqual(0);
    });

    describe('when cartId input is defined', () => {
      beforeEach(() => {
        component.cartId = mockCartId;
        fixture.detectChanges();
      });

      it('should remove entry of multiCartService when cart input exist', () => {
        component.removeEntry(mockItems[0]);
        expect(multiCartService.removeEntry).toHaveBeenCalledWith(
          mockUserId,
          mockCartId,
          mockItems[0].entryNumber
        );
      });
      it('should update entry of multiCartService when cart input exist', () => {
        component
          .getControl(mockItems[0])
          .subscribe((control) => {
            control.get('quantity').setValue(8);
            expect(multiCartService.updateEntry).toHaveBeenCalledWith(
              mockUserId,
              mockCartId,
              mockItems[0].entryNumber,
              8
            );
          })
          .unsubscribe();
      });
    });

    it('should disable form if cart data is loading', () => {
      component.setLoading = true;
      expect(component.form.disabled).toEqual(true);
    });

    it('should enable form if cart data finished loading', () => {
      component.setLoading = false;
      expect(component.form.disabled).toEqual(false);
    });

    it('should remove unnecessary form control if object was removed in new values passed to component', () => {
      const removedObjectEntryName = mockItems[0].entryNumber.toString();
      const newItems = [mockItems[1]];
      expect(component.form.controls[removedObjectEntryName]).toBeDefined();
      component.items = newItems;
      fixture.detectChanges();
      expect(component.form.controls[removedObjectEntryName]).toBeUndefined();
    });

    it('should call cartService with an updated entry', () => {
      component.options.isSaveForLater = true;
      const item = mockItems[0];
      component
        .getControl(item)
        .subscribe((control) => {
          control.get('quantity').setValue(2);
          expect(mockSelectiveCartService.updateEntry).toHaveBeenCalledWith(
            item.entryNumber as any,
            2
          );
        })
        .unsubscribe();
    });
  });

  describe('Use outlet with outlet context data', () => {
    it('should be able to get inputs from outlet context data', () => {
      const newContext = structuredClone(mockContext);
      newContext.items = [mockItem0];
      const context$ = new Subject();
      configureTestingModule().overrideProvider(OutletContextData, {
        useValue: { context$ },
      });
      TestBed.compileComponents();
      stubSeviceAndCreateComponent();

      spyOn(<any>component, '_setItems').and.callThrough();
      const setLoading = spyOnProperty(component, 'setLoading', 'set');
      component.ngOnInit();
      context$.next(newContext);
      expect(component.cartId).toEqual(newContext.cartId);
      expect(component.hasHeader).toEqual(newContext.hasHeader);
      expect(component['_setItems']).toHaveBeenCalledWith(newContext.items, {
        forceRerender: true,
      });
      expect(component.options).toEqual(newContext.options);
      expect(component.promotionLocation).toEqual(newContext.promotionLocation);
      expect(component.readonly).toEqual(newContext.readonly);
      expect(setLoading).toHaveBeenCalledWith(newContext.cartIsLoading);
    });

    it('should mark view for check and force re-creation of item controls when outlet context emits with changed read-only flag', () => {
      const secondMockContext = structuredClone(mockContext);
      secondMockContext.readonly = false;
      const context$ = of(mockContext, secondMockContext);
      configureTestingModule().overrideProvider(OutletContextData, {
        useValue: { context$ },
      });
      TestBed.compileComponents();
      stubSeviceAndCreateComponent();
      const control0 = component.form.get(mockItem0.entryNumber.toString());
      const control1 = component.form.get(mockItem1.entryNumber.toString());
      spyOn(component['cd'], 'markForCheck').and.callThrough();

      component.ngOnInit();

      expect(component['cd'].markForCheck).toHaveBeenCalled();
      expect(control0).not.toBe(
        component.form.get(mockItem0.entryNumber.toString())
      );
      expect(control1).not.toBe(
        component.form.get(mockItem1.entryNumber.toString())
      );
    });

    it('should not call _setItems when neither contextRequiresRerender nor isItemsChanged are true', () => {
      configureTestingModule().overrideProvider(OutletContextData, {
        useValue: { context$ },
      });
      TestBed.compileComponents();
      stubSeviceAndCreateComponent();

      spyOn(<any>component, '_setItems').and.callThrough();
      component.ngOnInit();

      // context$ emits mockContext which has the same items that were set in stubSeviceAndCreateComponent
      expect(component['_setItems']).not.toHaveBeenCalled();
    });
  });
});
