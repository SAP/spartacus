import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService, I18nTestingModule } from '@spartacus/core';
import { PromotionsModule } from '../../../checkout';
import { CartItemListComponent } from './cart-item-list.component';

class MockCartService {
  removeEntry() {}
  loadDetails() {}
  updateEntry() {}
}

const mockItems = [
  {
    id: 0,
    quantity: 1,
    entryNumber: 0,
    product: {
      id: 0,
      code: 'PR0000',
    },
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

const mockAppliedProductPromotions = [
  {
    consumedEntries: [
      {
        adjustedUnitPrice: 517.4,
        orderEntryNumber: 0,
        quantity: 1,
      },
    ],
    description: '10% off on products EOS450D + 18-55 IS Kit',
    promotion: {
      code: 'product_percentage_discount',
      promotionType: 'Rule Based Promotion',
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

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-cart-item',
})
class MockCartItemComponent {
  @Input() parent;
  @Input() item;
  @Input() potentialProductPromotions;
  @Input() appliedProductPromotions;
  @Input() isReadOnly;
  @Input() cartIsLoading;
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
      ],
      declarations: [CartItemListComponent, MockCartItemComponent, MockUrlPipe],
      providers: [{ provide: CartService, useClass: MockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListComponent);
    cartService = TestBed.get(CartService as Type<CartService>);
    component = fixture.componentInstance;
    component.items = mockItems;
    component.potentialProductPromotions = mockPotentialProductPromotions;
    component.appliedProductPromotions = mockAppliedProductPromotions;
    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'updateEntry').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove entry', () => {
    const item = mockItems[0];
    expect(component.form.controls[item.product.code]).toBeDefined();
    component.removeEntry(item);
    expect(cartService.removeEntry).toHaveBeenCalledWith(item);
    expect(component.form.controls[item.product.code]).toBeUndefined();
  });

  it('should update entry', () => {
    const item = mockItems[0];
    component.updateEntry({ item, updatedQuantity: 5 });
    expect(cartService.updateEntry).toHaveBeenCalledWith(item.entryNumber, 5);
  });

  it('should get potential promotions for product', () => {
    const item = mockItems[1];
    const promotions = component.getProductPromotionForItem(
      item,
      component.potentialProductPromotions
    );
    expect(promotions).toEqual(mockPotentialProductPromotions);
  });

  it('should get applied promotions for product', () => {
    const item = mockItems[0];
    const promotions = component.getProductPromotionForItem(
      item,
      component.appliedProductPromotions
    );
    expect(promotions).toEqual(mockAppliedProductPromotions);
  });
});
