import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/main/root';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of, Observable } from 'rxjs';
import { ClearCartComponent } from './clear-cart.component';
import { By } from '@angular/platform-browser';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  addEntry(_productCode: string, _quantity: number): void {}
  getActive(): Observable<Cart> {
    return of({});
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return of();
  }
}

describe('ClearCartComponent', () => {
  let component: ClearCartComponent;
  let fixture: ComponentFixture<ClearCartComponent>;
  let launchDialogService: LaunchDialogService;
  let activeCartService: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ClearCartComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    launchDialogService = TestBed.inject(LaunchDialogService);
    activeCartService = TestBed.inject(ActiveCartFacade);
    fixture = TestBed.createComponent(ClearCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render clear cart button if cart is empty', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.clear-cart-btn'))).toBeNull();
  });

  it('should render clear cart button if cart has item(s)', () => {
    activeCartService.addEntry('123456', 1);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.clear-cart-btn'))).toBeDefined();
  });

  it('should open service dialog', () => {
    spyOn(launchDialogService, 'openDialog').and.stub();

    component.openDialog(new Event(''));

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CLEAR_CART,
      component.element,
      component['vcr']
    );
  });
});
