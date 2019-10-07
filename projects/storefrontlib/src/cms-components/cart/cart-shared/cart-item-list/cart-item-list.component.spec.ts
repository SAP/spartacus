import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService, I18nTestingModule } from '@spartacus/core';
import { PromotionsModule } from '../../../checkout';
import { CartItemListComponent } from './cart-item-list.component';

class MockCartService {
  updateEntry() {}
}

const mockItems = [
  {
    id: 1,
    quantity: 5,
    entryNumber: 1,
    product: {
      id: 1,
      code: 'PR0000',
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
  @Input() potentialProductPromotions;
  @Input() isReadOnly;
  @Input() quantityControl;
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
      declarations: [CartItemListComponent, MockCartItemComponent],
      providers: [{ provide: CartService, useClass: MockCartService }],
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
    item.quantity = 5;
    component.getControl(item).subscribe(control => {
      expect(control.get('quantity').value).toEqual(5);
    });
  });

  it('should call cartService with an updated entry', () => {
    const item = mockItems[0];
    component.getControl(item).subscribe(control => {
      control.get('quantity').setValue(2);
      expect(cartService.updateEntry).toHaveBeenCalledWith(item.entryNumber, 2);
    });
  });

  it('should call cartService.updateEntry during a remove with quantity 0', () => {
    const item = mockItems[0];
    component.getControl(item).subscribe(control => {
      control.get('quantity').setValue(0);
      expect(cartService.updateEntry).toHaveBeenCalledWith(item.entryNumber, 0);
    });
  });

  it('should get potential promotions for product', () => {
    const item = mockItems[0];
    const promotions = component.getPotentialProductPromotionsForItem(item);
    expect(promotions).toEqual(mockPotentialProductPromotions);
  });
});
