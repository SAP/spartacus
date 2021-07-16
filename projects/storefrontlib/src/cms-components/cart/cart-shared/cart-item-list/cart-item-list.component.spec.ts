import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  ConsignmentEntry,
  FeatureConfigService,
  FeaturesConfigModule,
  I18nTestingModule,
  MultiCartService,
  OrderEntry,
  PromotionLocation,
  SelectiveCartService,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PromotionsModule } from '../../../misc/promotions/promotions.module';
import { CartItemComponentOptions } from '../cart-item/cart-item.component';
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

class MockMultiCartService implements Partial<MultiCartService> {
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
  selector: 'cx-cart-item',
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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isLevel(_version: string): boolean {
    return true;
  }
}

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;
  let activeCartService: ActiveCartService;
  let multiCartService: MultiCartService;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['removeEntry', 'updateEntry']
  );

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          PromotionsModule,
          I18nTestingModule,
          FeaturesConfigModule,
        ],
        declarations: [CartItemListComponent, MockCartItemComponent],
        providers: [
          { provide: ActiveCartService, useClass: MockActiveCartService },
          { provide: SelectiveCartService, useValue: mockSelectiveCartService },
          { provide: MultiCartService, useClass: MockMultiCartService },
          { provide: UserIdService, useClass: MockUserIdService },
          {
            provide: FeatureConfigService,
            useClass: MockFeatureConfigService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListComponent);
    activeCartService = TestBed.inject(ActiveCartService);
    multiCartService = TestBed.inject(MultiCartService);

    component = fixture.componentInstance;
    component.items = [mockItem0, mockItem1];
    component.options = { isSaveForLater: false };

    spyOn(activeCartService, 'updateEntry').and.callThrough();
    spyOn(multiCartService, 'updateEntry').and.callThrough();
    spyOn(multiCartService, 'removeEntry').and.callThrough();

    fixture.detectChanges();
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
    let result: FormGroup;
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

    let result: FormGroup;
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
    let result: FormGroup;
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
        id: 1,
        quantity: 5,
        entryNumber: 1,
        product: {
          id: 1,
          code: 'PR0000',
        },
      },
      {
        id: 2,
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
