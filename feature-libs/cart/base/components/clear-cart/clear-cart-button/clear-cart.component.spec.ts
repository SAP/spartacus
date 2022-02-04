import {
  ChangeDetectionStrategy,
  DebugElement,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ClearCartComponent } from './clear-cart.component';
import { By } from '@angular/platform-browser';

const mockCartEmpty$: Observable<Cart> = of<Cart>({
  code: 'cart-empty',
  totalItems: 0,
});

const mockCartNonEmpty$: Observable<Cart> = of<Cart>({
  code: 'cart-non-empty',
  totalItems: 1,
});

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return of();
  }
}
class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return of();
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
