import {
  ChangeDetectionStrategy,
  DebugElement,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { ClearCartComponent } from './clear-cart.component';

const mockCartEmpty$: Observable<Cart> = of({
  code: 'cart-empty',
  totalItems: 0,
} as Cart);

const mockCartNonEmpty$: Observable<Cart> = of({
  code: 'cart-non-empty',
  totalItems: 1,
} as Cart);

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}
class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return EMPTY;
  }
}

describe('ClearCartComponent', () => {
  let component: ClearCartComponent;
  let fixture: ComponentFixture<ClearCartComponent>;
  let launchDialogService: LaunchDialogService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ClearCartComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(ClearCartComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture = TestBed.createComponent(ClearCartComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render clear cart button if cart is empty', () => {
    component.cart$ = mockCartEmpty$;
    fixture.detectChanges();

    expect(el.query(By.css('.clear-cart-btn'))).toBeNull();
  });

  it('should render clear cart button if cart has item(s)', () => {
    component.cart$ = mockCartNonEmpty$;
    fixture.detectChanges();
    expect(el.query(By.css('.clear-cart-btn'))).toBeTruthy();
  });

  it('should open service dialog', () => {
    component.cart$ = mockCartNonEmpty$;
    fixture.detectChanges();
    spyOn(launchDialogService, 'openDialog').and.stub();

    const clearBtn = el.query(By.css('.clear-cart-btn')).nativeElement;

    clearBtn.click();

    fixture.detectChanges();

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CLEAR_CART,
      component.element,
      component['vcr']
    );
  });
});
