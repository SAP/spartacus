import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartService,
  I18nTestingModule,
  FeatureConfigService,
  SelectiveCartService,
  PromotionLocation,
  FeaturesConfigModule,
  FeaturesConfig,
  OrderEntry,
  ConsignmentEntry,
} from '@spartacus/core';
import { PromotionsModule } from '../../../checkout';
import { CartItemListComponent } from './cart-item-list.component';
import { CartItemComponentOptions } from '../cart-item/cart-item.component';

class MockCartService {
  removeEntry() {}
  loadDetails() {}
  updateEntry() {}
}

const mockItems: OrderEntry[] = [
  {
    quantity: 1,
    entryNumber: 0,
    product: {
      code: 'PR0000',
    },
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
  @Input()
  options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
  @Input()
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;
  let cartService: CartService;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['removeEntry']
  );

  const mockFeatureConfig = jasmine.createSpyObj('FeatureConfigService', [
    'isEnabled',
    'isLevel',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        PromotionsModule,
        I18nTestingModule,
        FeaturesConfigModule,
      ],
      declarations: [CartItemListComponent, MockCartItemComponent, MockUrlPipe],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: SelectiveCartService, useValue: mockSelectiveCartService },
        { provide: FeatureConfigService, useValue: mockFeatureConfig },
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
    component.options = { isSaveForLater: false };

    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'updateEntry').and.callThrough();

    mockSelectiveCartService.removeEntry.and.callThrough();
    mockFeatureConfig.isEnabled.and.returnValue(false);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    mockFeatureConfig.isEnabled.and.returnValue(false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should work with consignment entries', () => {
    component.items = mockConsignmentItems;
    expect(component.items[0].quantity).toEqual(3);
    expect(component.items[0].product.code).toEqual('PR0000');
  });

  it('should remove entry', () => {
    fixture.detectChanges();
    const item = mockItems[0];
    expect(component.form.controls[item.product.code]).toBeDefined();
    component.removeEntry(item);
    expect(cartService.removeEntry).toHaveBeenCalledWith(item);
    expect(component.form.controls[item.product.code]).toBeUndefined();
  });

  it('should update entry', () => {
    fixture.detectChanges();
    const item = mockItems[0];
    component.updateEntry({ item, updatedQuantity: 5 });
    expect(cartService.updateEntry).toHaveBeenCalledWith(item.entryNumber, 5);
  });

  it('should get potential promotions for product', () => {
    const item = mockItems[1];
    const promotions = component.getPotentialProductPromotionsForItem(item);
    expect(promotions).toEqual(mockPotentialProductPromotions);
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

  it('should get no potential promotions for product for save for later', () => {
    mockFeatureConfig.isEnabled.and.returnValue(true);
    component.options = { isSaveForLater: true };
    fixture.detectChanges();
    const item = mockItems[0];
    const promotions = component.getPotentialProductPromotionsForItem(item);
    expect(promotions.length).toEqual(0);
  });

  it('remove entry for save for later', () => {
    mockFeatureConfig.isEnabled.and.returnValue(true);
    component.options = { isSaveForLater: true };
    fixture.detectChanges();
    const item = mockItems[0];
    expect(component.form.controls[item.product.code]).toBeDefined();
    component.removeEntry(item);
    expect(mockSelectiveCartService.removeEntry).toHaveBeenCalledWith(item);
    expect(component.form.controls[item.product.code]).toBeUndefined();
  });

  it('should get save for later feature flag', () => {
    fixture.detectChanges();
    component.isSaveForLaterEnabled();
    expect(mockFeatureConfig.isEnabled).toHaveBeenCalled();
  });
});
