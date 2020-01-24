import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartService,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components';
import { ModalService } from '../../../../shared/components/modal/index';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { AutoFocusDirectiveModule } from '../../../../shared/directives/auto-focus/auto-focus.directive.module';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';
import { PromotionsModule } from '../../../checkout/components/promotions/promotions.module';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';
class MockCartService {
  getLoaded(): Observable<boolean> {
    return of();
  }

  updateEntry(_entryNumber: string, _updatedQuantity: number): void {}

  removeEntry(_entry: OrderEntry): void {}
}

const mockOrderEntry: OrderEntry[] = [
  {
    quantity: 1,
    entryNumber: 1,
    product: {
      code: 'CODE1111',
    },
  },
  {
    quantity: 2,
    entryNumber: 1,
    product: {
      code: 'CODE1111',
    },
  },
];

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockModalService {
  dismissActiveModal(): void {}
}

@Component({
  selector: 'cx-cart-item',
  template: '',
})
class MockCartItemComponent {
  @Input() compact = false;
  @Input() item: Observable<OrderEntry>;
  @Input() potentialProductPromotions: PromotionResult[];
  @Input() readonly = false;
  @Input() quantityControl: FormControl;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockPromotionService {
  getOrderPromotions(): void {}
  getOrderPromotionsFromCart(): void {}
  getOrderPromotionsFromCheckout(): void {}
  getOrderPromotionsFromOrder(): void {}
  getProductPromotionForEntry(): void {}
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;
  let el: DebugElement;
  let cartService: CartService;
  let mockModalService: MockModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SpinnerModule,
        I18nTestingModule,
        AutoFocusDirectiveModule,
        PromotionsModule,
        FeaturesConfigModule,
      ],
      declarations: [
        AddedToCartDialogComponent,
        MockCartItemComponent,
        MockUrlPipe,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: CartService,
          useClass: MockCartService,
        },
        {
          provide: PromotionService,
          useClass: MockPromotionService,
        },
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
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.entry$ = of(mockOrderEntry[0]);
    cartService = TestBed.get(CartService as Type<CartService>);
    mockModalService = TestBed.get(ModalService as Type<ModalService>);

    spyOn(cartService, 'updateEntry').and.callThrough();
    spyOn(mockModalService, 'dismissActiveModal').and.callThrough();
    component.loaded$ = of(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading placeholder', () => {
    component.loaded$ = of(false);
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.updatingCart');
    expect(el.query(By.css('cx-spinner')).nativeElement).toBeDefined();
  });

  it('should handle focus of elements', () => {
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-buttons > .btn-primary')).nativeElement
    ).toEqual(document.activeElement);
  });

  it('should display quantity', () => {
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.itemsAddedToYourCart');
  });

  it('should display cart item', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should display cart total', () => {
    component.cart$ = of({
      deliveryItemsQuantity: 1,
      totalPrice: {
        formattedValue: '$100.00',
      },
      subTotal: {
        formattedValue: '$100.00',
      },
    });
    fixture.detectChanges();
    const cartTotalEl = el.query(By.css('.cx-dialog-total')).nativeElement;
    expect(cartTotalEl.children[0].textContent).toEqual(
      ' cartItems.cartTotal count:1 '
    );
    expect(cartTotalEl.children[1].textContent).toEqual('$100.00');
  });

  it('should return formControl with order entry quantity', () => {
    component.entry$ = of({
      quantity: 5,
      entryNumber: 0,
    } as OrderEntry);

    component.getQuantityControl().subscribe(control => {
      expect(control.value).toEqual(5);
    });
  });

  it('should show added dialog title message', () => {
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsAddedToYourCart '
    );
  });

  it('should show increment dialog title message', () => {
    component.entry$ = of(mockOrderEntry[0]);
    component.increment = true;
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsIncrementedInYourCart '
    );
  });

  it('should not show cart entry', () => {
    component.loaded$ = of(false);
    component.modalIsOpen = false;
    expect(el.query(By.css('cx-cart-item'))).toBeNull();
  });

  it('should show cart entry', () => {
    fixture.detectChanges();
    component.loaded$ = of(true);
    component.modalIsOpen = false;
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();

    component.loaded$ = of(true);
    component.modalIsOpen = true;
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();

    component.loaded$ = of(false);
    component.modalIsOpen = true;
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });
});
