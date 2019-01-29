import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CartService, OrderEntry, PromotionResult } from '@spartacus/core';

import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BehaviorSubject, of, Observable } from 'rxjs';

import { SpinnerModule } from './../../../ui/components/spinner/spinner.module';

import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';
import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform
} from '@angular/core';

class MockNgbActiveModal {
  dismiss(): void {}

  close(): void {}
}

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
      code: 'CODE1111'
    }
  }
];

@Component({
  selector: 'cx-cart-item',
  template: ''
})
class MockCartItemComponent {
  @Input()
  compact = false;
  @Input()
  item: Observable<OrderEntry>;
  @Input()
  potentialProductPromotions: PromotionResult[];
  @Input()
  isReadOnly = false;
  @Input()
  cartIsLoading = false;
  @Input()
  parent: FormGroup;
}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;
  let el: DebugElement;
  let cartService: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NgbModule,
        SpinnerModule
      ],
      declarations: [
        AddedToCartDialogComponent,
        MockCartItemComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        {
          provide: NgbActiveModal,
          useClass: MockNgbActiveModal
        },
        {
          provide: CartService,
          useClass: MockCartService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.entry$ = of(mockOrderEntry[0]);
    cartService = TestBed.get(CartService);
    spyOn(cartService, 'removeEntry').and.callThrough();
    spyOn(cartService, 'updateEntry').and.callThrough();
    spyOn(component.activeModal, 'dismiss').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading placeholder', () => {
    component.loaded$ = of(false);
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('Updating cart...');
    expect(el.query(By.css('cx-spinner')).nativeElement).toBeDefined();
  });

  it('should handle focus of elements', () => {
    const loaded$ = new BehaviorSubject<boolean>(false);
    component.loaded$ = loaded$.asObservable();

    fixture.detectChanges();
    loaded$.next(true);
    fixture.detectChanges();
    expect(el.query(By.css('.btn-primary')).nativeElement).toEqual(
      document.activeElement
    );
  });

  it('should display quantity', () => {
    component.loaded$ = of(true);
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('Item(s) added to your cart');
  });

  it('should display cart item', () => {
    component.loaded$ = of(true);
    fixture.detectChanges();
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should display cart total', () => {
    component.cart$ = of({
      deliveryItemsQuantity: 1,
      totalPrice: {
        formattedValue: '$100.00'
      }
    });
    component.loaded$ = of(true);
    fixture.detectChanges();
    const cartTotalEl = el.query(By.css('.cx-dialog-total')).nativeElement;
    expect(cartTotalEl.children[0].textContent).toEqual('Cart total (1 items)');
    expect(cartTotalEl.children[1].textContent).toEqual('$100.00');
  });

  it('should remove entry', () => {
    component.loaded$ = of(true);
    component.ngOnInit();
    const item = mockOrderEntry[0];
    expect(component.form.controls[item.product.code]).toBeDefined();
    component.removeEntry(item);
    expect(cartService.removeEntry).toHaveBeenCalledWith(item);
    expect(component.form.controls[item.product.code]).toBeUndefined();
    expect(component.activeModal.dismiss).toHaveBeenCalledWith('Removed');
  });

  it('should update entry', () => {
    const item = mockOrderEntry[0];
    component.updateEntry({ item, updatedQuantity: 5 });
    expect(cartService.updateEntry).toHaveBeenCalledWith(item.entryNumber, 5);
  });
});
