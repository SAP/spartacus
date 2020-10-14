import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  ConsignmentEntry,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  PromotionLocation,
  SelectiveCartService,
} from '@spartacus/core';
import { PromotionsModule } from '../../../checkout';
import { CartItemComponentOptions } from '../cart-item/cart-item.component';
import { CartItemListComponent } from './cart-item-list.component';

class MockActiveCartService {
  updateEntry() {}
}

const mockItems: OrderEntry[] = [
  {
    quantity: 1,
    entryNumber: 0,
    product: {
      code: 'PR0000',
    },
    updateable: true,
  },
  {
    quantity: 5,
    entryNumber: 1,
    product: {
      code: 'PR0001',
    },
  },
];

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

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;
  let activeCartService: ActiveCartService;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['removeEntry']
  );

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListComponent);
    activeCartService = TestBed.inject(ActiveCartService);

    component = fixture.componentInstance;
    component.items = mockItems;
    component.options = { isSaveForLater: false };

    spyOn(activeCartService, 'updateEntry').and.callThrough();

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
    const item = mockItems[0];
    item.updateable = false;
    component.items = mockItems;
    fixture.detectChanges();

    let result: FormGroup;
    component
      .getControl(item)
      .subscribe((control) => {
        result = control;
      })
      .unsubscribe();

    expect(result.disabled).toEqual(true);
  });

  it('should return disabled form group when readonly is true', () => {
    component.readonly = true;
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
      component.form.controls[multipleMockItems[0].product.code]
    ).toBeDefined();
    expect(
      component.form.controls[multipleMockItems[1].product.code]
    ).toBeDefined();
  });

  it('remove entry for save for later', () => {
    component.options = { isSaveForLater: true };
    fixture.detectChanges();
    const item = mockItems[0];
    expect(component.form.controls[item.product.code]).toBeDefined();
    component.removeEntry(item);
    expect(mockSelectiveCartService.removeEntry).toHaveBeenCalledWith(item);
    expect(component.form.controls[item.product.code]).toBeUndefined();
  });

  it('should handle null item lists properly', () => {
    component.items = undefined;
    const itemCount = component.items.length;
    expect(itemCount).toEqual(0);
  });
});
