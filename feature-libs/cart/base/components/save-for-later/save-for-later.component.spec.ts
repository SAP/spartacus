import { vi } from 'vitest';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActiveCartFacade,
  Cart,
  CartItemComponentOptions,
  OrderEntry,
  PromotionLocation,
  SelectiveCartFacade,
} from '@spartacus/cart/base/root';
import {
  CmsService,
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartItemListComponent } from '../cart-shared';
import { SaveForLaterComponent } from './save-for-later.component';
@Component({
  template: '',
  selector: 'cx-cart-item-list',
})
class MockCartItemListComponent {
  @Input() readonly = false;
  @Input() items: OrderEntry[];
  @Input() cartIsLoading: Observable<boolean>;
  @Input() promotionLocation: PromotionLocation;
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
}

describe('SaveForLaterComponent', () => {
  let component: SaveForLaterComponent;
  let fixture: ComponentFixture<SaveForLaterComponent>;

  const mockActiveCartService = { addEntry: vi.fn(), isStable: vi.fn(), getActive: vi.fn() };

  const mockSelectiveCartService = { getCart: vi.fn(), isStable: vi.fn(), removeEntry: vi.fn(), getEntries: vi.fn() };

  const mockCmsService = { getComponentData: vi.fn() };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, SaveForLaterComponent],
      providers: [
        { provide: CmsService, useValue: mockCmsService },
        { provide: ActiveCartFacade, useValue: mockActiveCartService },
        { provide: SelectiveCartFacade, useValue: mockSelectiveCartService },
      ],
    })
      .overrideComponent(SaveForLaterComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, CartItemListComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockCartItemListComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterComponent);
    component = fixture.componentInstance;

    mockSelectiveCartService.isStable.mockReturnValue(of(true));
    mockActiveCartService.isStable.mockReturnValue(of(true));
    mockActiveCartService.getActive.mockReturnValue(
      of({ code: '00001', totalItems: 0 } as Cart)
    );
    mockCmsService.getComponentData.mockReturnValue(of({ content: 'content' }));
    mockSelectiveCartService.getCart.mockReturnValue(
      of({ code: '123' } as Cart)
    );
    mockSelectiveCartService.getEntries.mockReturnValue(
      of([{}] as OrderEntry[])
    );
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display save for later text with items', () => {
    mockSelectiveCartService.getCart.mockReturnValue(
      of({
        code: '123',
        totalItems: 5,
      } as Cart)
    );
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.cx-total'));
    const cartHead = el.nativeElement.textContent?.trim();
    expect(cartHead).toEqual('saveForLaterItems.itemTotal count:5');
  });

  it('should display empty cart info when cart is empty and save for later has items', () => {
    mockSelectiveCartService.getCart.mockReturnValue(
      of({
        code: '123',
        totalItems: 5,
      } as Cart)
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-empty-cart-info')).nativeElement
        .textContent?.trim()
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
    expect(mockActiveCartService.addEntry).toHaveBeenCalledWith(
      mockItem.product.code,
      mockItem.quantity
    );
  });
});
