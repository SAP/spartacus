import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartService,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  PromotionLocation,
} from '@spartacus/core';
import { PromotionsModule } from '../../../checkout';
import { CartItemListComponent } from './cart-item-list.component';
class MockCartService {
  updateEntry() {}
}

const mockItems = [
  {
    id: 0,
    quantity: 1,
    entryNumber: 0,
    product: {
      id: 0,
      code: 'PR0001',
    },
    updateable: true,
  },
  {
    id: 1,
    quantity: 5,
    entryNumber: 1,
    product: {
      id: 1,
      code: 'PR0001',
    },
  },
];

const mockPotentialProductPromotions = [
  {
    description: 'Buy two more and win a trip to the Moon',
    consumedEntries: [
      {
        orderEntryNumber: 1,
      },
    ],
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
  @Input() potentialProductPromotions;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;
  let cartService: CartService;

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
        { provide: CartService, useClass: MockCartService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '1.3' },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListComponent);
    cartService = TestBed.get(CartService as Type<CartService>);
    component = fixture.componentInstance;
    component.items = mockItems;
    component.potentialProductPromotions = mockPotentialProductPromotions;

    spyOn(cartService, 'updateEntry').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form control with quantity ', () => {
    const item = mockItems[0];
    component.getControl(item).subscribe(control => {
      expect(control.get('quantity').value).toEqual(1);
    });
  });

  it('should return enabled form group', () => {
    const item = mockItems[0];
    let result: FormGroup;
    component
      .getControl(item)
      .subscribe(control => {
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
      .subscribe(control => {
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
      .subscribe(control => {
        result = control;
      })
      .unsubscribe();

    expect(result.disabled).toEqual(true);
  });

  it('should call cartService with an updated entry', () => {
    const item = mockItems[0];
    component
      .getControl(item)
      .subscribe(control => {
        control.get('quantity').setValue(2);
        expect(cartService.updateEntry).toHaveBeenCalledWith(
          item.entryNumber,
          2
        );
      })
      .unsubscribe();
  });

  it('should call cartService.updateEntry during a remove with quantity 0', () => {
    const item = mockItems[0];
    component
      .getControl(item)
      .subscribe(control => {
        control.get('quantity').setValue(0);
        expect(cartService.updateEntry).toHaveBeenCalledWith(
          item.entryNumber,
          0
        );
      })
      .unsubscribe();
  });

  it('should get potential promotions for product', () => {
    const item = mockItems[1];
    const promotions = component.getPotentialProductPromotionsForItem(item);
    expect(promotions).toEqual(mockPotentialProductPromotions);
  });

  it('should have controls updated on items change', () => {
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
});
