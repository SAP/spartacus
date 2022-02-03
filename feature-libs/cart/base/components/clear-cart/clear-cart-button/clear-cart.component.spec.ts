import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
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

describe('ClearCartComponent', () => {
  let component: ClearCartComponent;
  let fixture: ComponentFixture<ClearCartComponent>;
  let launchDialogService: LaunchDialogService;

  const mockActiveCartService = jasmine.createSpyObj('ActiveCartService', [
    'getActive',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ClearCartComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture = TestBed.createComponent(ClearCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render clear cart button if cart is empty', () => {
    expect(fixture.debugElement.query(By.css('.clear-cart-btn'))).toBeFalsy();
    mockActiveCartService.getActive.and.returnValue(
      of<Cart>({ code: '123', totalItems: 2 })
    );
  });

  it('should render clear cart button if cart has item(s)', () => {
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
