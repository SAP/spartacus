import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  PromotionLocation,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { ModalService } from 'projects/storefrontlib/shared/components/modal/modal.service';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components';
import { ModalDirective } from '../../../../shared/components/modal/modal.directive';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { PromotionsModule } from '../../../misc/promotions/promotions.module';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

@Directive({
  selector: '[cxModal]',
})
class MockModalDirective implements Partial<ModalDirective> {
  @Input() cxModal;
}

class MockActiveCartService implements Partial<ActiveCartService> {
  updateEntry(_entryNumber: number, _quantity: number): void {}

  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  getActive(): Observable<Cart> {
    return of({});
  }
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

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = () => of({ nextState: undefined } as RouterState);
}

@Component({
  selector: 'cx-cart-item',
  template: '',
})
class MockCartItemComponent {
  @Input() compact = false;
  @Input() item: Observable<OrderEntry>;
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

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;
  let el: DebugElement;
  let activeCartService: ActiveCartService;
  let mockModalService: MockModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          SpinnerModule,
          I18nTestingModule,
          PromotionsModule,
          FeaturesConfigModule,
        ],
        declarations: [
          AddedToCartDialogComponent,
          MockCartItemComponent,
          MockUrlPipe,
          MockCxIconComponent,
          MockModalDirective,
        ],
        providers: [
          {
            provide: ModalService,
            useClass: MockModalService,
          },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '1.3' },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.entry$ = of(mockOrderEntry[0]);
    activeCartService = TestBed.inject(ActiveCartService);
    mockModalService = TestBed.inject(ModalService);

    spyOn(activeCartService, 'updateEntry').and.callThrough();
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

  it('should return formControl with order entry quantity', (done) => {
    component.entry$ = of({
      quantity: 5,
      entryNumber: 0,
    } as OrderEntry);

    component
      .getQuantityControl()
      .pipe(take(1))
      .subscribe((control) => {
        expect(control.value).toEqual(5);
        done();
      });
  });

  it('should show added dialog title message in case new entry appears in cart', () => {
    component.entry$ = of(mockOrderEntry[0]);
    component.loaded$ = of(true);
    component.numberOfEntriesBeforeAdd = 1;
    spyOn(activeCartService, 'getEntries').and.returnValue(of(mockOrderEntry));
    component.ngOnInit();
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsAddedToYourCart '
    );
  });

  it('should show increment dialog title message in case no new entry appears in cart', () => {
    component.entry$ = of(mockOrderEntry[0]);
    component.loaded$ = of(true);
    component.numberOfEntriesBeforeAdd = 2;
    spyOn(activeCartService, 'getEntries').and.returnValue(of(mockOrderEntry));
    component.ngOnInit();
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

  it('should close modal after removing cart item', (done) => {
    fixture.detectChanges();
    component
      .getQuantityControl()
      .pipe(take(1))
      .subscribe((control) => {
        control.setValue(0);
        expect(mockModalService.dismissActiveModal).toHaveBeenCalled();
        done();
      });
  });
});
