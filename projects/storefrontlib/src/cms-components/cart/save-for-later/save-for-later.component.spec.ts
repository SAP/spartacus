import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveForLaterComponent } from './save-for-later.component';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  SelectiveCartService,
  PromotionResult,
  Cart,
  ActiveCartService,
  OrderEntry,
  CmsService,
} from '@spartacus/core';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Item,
  CartItemComponentOptions,
} from '../cart-shared/cart-item/cart-item.component';
import { By } from '@angular/platform-browser';

@Component({
  template: '',
  selector: 'cx-cart-item-list',
})
class MockCartItemListComponent {
  @Input()
  isReadOnly = false;
  @Input()
  items: Item[];
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
  @Input()
  cartIsLoading: Observable<boolean>;
  @Input()
  options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
}

describe('SaveForLaterComponent', () => {
  let component: SaveForLaterComponent;
  let fixture: ComponentFixture<SaveForLaterComponent>;

  const mockCartService = jasmine.createSpyObj('ActiveCartService', [
    'addEntry',
    'getLoaded',
    'getActive',
  ]);

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    ['getCart', 'getLoaded', 'removeEntry', 'getEntries']
  );

  const mockCmsService = jasmine.createSpyObj('CmsService', [
    'getComponentData',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveForLaterComponent, MockCartItemListComponent],
      imports: [FeaturesConfigModule, I18nTestingModule],
      providers: [
        { provide: CmsService, useValue: mockCmsService },
        { provide: ActiveCartService, useValue: mockCartService },
        { provide: SelectiveCartService, useValue: mockSelectiveCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterComponent);
    component = fixture.componentInstance;

    mockCartService.getLoaded.and.returnValue(of(true));
    mockCartService.getActive.and.returnValue(
      of<Cart>({ code: '00001', totalItems: 0 })
    );
    mockCmsService.getComponentData.and.returnValue(of({ content: 'content' }));
    mockSelectiveCartService.getLoaded.and.returnValue(of(true));
    mockSelectiveCartService.getCart.and.returnValue(of<Cart>({ code: '123' }));
    mockSelectiveCartService.getEntries.and.returnValue(of<OrderEntry[]>([{}]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display save for later text with items', () => {
    mockSelectiveCartService.getCart.and.returnValue(
      of<Cart>({
        code: '123',
        totalItems: 5,
      })
    );
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-total'));
    const cartHead = el.nativeElement.innerText;
    expect(cartHead).toEqual('saveForLaterItems.itemTotal count:5');
  });

  it('should display empty cart info when cart is empty and save for later has items', () => {
    mockSelectiveCartService.getCart.and.returnValue(
      of<Cart>({
        code: '123',
        totalItems: 5,
      })
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-empty-cart-info')).nativeElement
        .innerText
    ).toEqual('content');
  });

  it('should move to cart', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    component.moveToCart(mockItem);
    expect(mockSelectiveCartService.removeEntry).toHaveBeenCalledWith(mockItem);
    expect(mockCartService.addEntry).toHaveBeenCalledWith(
      mockItem.product.code,
      mockItem.quantity
    );
  });
});
