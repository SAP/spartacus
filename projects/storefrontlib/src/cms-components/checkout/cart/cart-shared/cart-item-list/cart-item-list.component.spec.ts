import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  SimpleChange,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartService,
  I18nTestingModule,
  SaveForLaterService,
} from '@spartacus/core';
import { PromotionsModule } from '../../../../../lib/checkout/components/promotions/promotions.module';
import { CartItemListComponent } from './cart-item-list.component';

class MockCartService {
  removeEntry() {}
  loadDetails() {}
  updateEntry() {}
}

class MockSaveForLaterService {
  addEntry() {}
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
  @Input() isReadOnly;
  @Input() cartIsLoading;
  @Input() enableSaveForLater;
}

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;
  let cartService: CartService;
  let saveForLaterService: SaveForLaterService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        PromotionsModule,
        I18nTestingModule,
      ],
      declarations: [CartItemListComponent, MockCartItemComponent, MockUrlPipe],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: SaveForLaterService, useClass: MockSaveForLaterService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListComponent);
    cartService = TestBed.get(CartService);
    saveForLaterService = TestBed.get(SaveForLaterService);
    component = fixture.componentInstance;
    component.items = mockItems;
    component.potentialProductPromotions = mockPotentialProductPromotions;
    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'updateEntry').and.callThrough();
    spyOn(saveForLaterService, 'addEntry').and.callThrough();
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
    const item = mockItems[0];
    const promotions = component.getPotentialProductPromotionsForItem(item);
    expect(promotions).toEqual(mockPotentialProductPromotions);
  });

  it('should be able to save item for later', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    const item = mockItems[0];
    component.saveItemForLater(item);
    expect(saveForLaterService.addEntry).toHaveBeenCalledWith(
      item.product.code,
      item.quantity
    );
    expect(cartService.removeEntry).toHaveBeenCalledWith(item);
  });

  it('should be able to add form controls when component items changed', () => {
    const previousValue = [
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

    const currentValue = [
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
    component.items = currentValue;

    expect(component.form.controls['PR0001']).toBeUndefined();
    component.ngOnChanges({
      items: new SimpleChange(previousValue, currentValue, false),
    });
    expect(component.form.controls['PR0001']).toBeDefined();
  });
});
