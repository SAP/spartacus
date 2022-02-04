import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ClearCartComponent } from './clear-cart.component';
import { By } from '@angular/platform-browser';

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
  let activeCartFacade: ActiveCartFacade;

  // const mockActiveCartService = jasmine.createSpyObj('ActiveCartService', [
  //   'getActive',
  // ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ClearCartComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    fixture = TestBed.createComponent(ClearCartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render clear cart button if cart is empty', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(
      of<Cart>({ code: '123', totalItems: 0 })
    );

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.clear-cart-btn'))).toBeNull();
  });

  it('should render clear cart button if cart has item(s)', () => {
    spyOn(activeCartFacade, 'getActive').and.returnValue(
      of<Cart>({ code: '123', totalItems: 3 })
    );
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.clear-cart-btn'))).toBeTruthy();
  });

  it('should open service dialog', () => {
    spyOn(launchDialogService, 'openDialog').and.stub();

    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(
      By.css('.clear-cart-btn')
    ).nativeElement;

    clearBtn.click();

    fixture.detectChanges();

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CLEAR_CART,
      component.element,
      component['vcr']
    );
  });
});
