import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  AuthService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';

const mockCart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
};

const cart$ = new BehaviorSubject<Cart>(mockCart);
const isLoggedInSubject$ = new BehaviorSubject(false);

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return cart$.asObservable();
  }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return isLoggedInSubject$.asObservable();
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

describe('AddToSavedCartComponent', () => {
  let component: AddToSavedCartComponent;
  let fixture: ComponentFixture<AddToSavedCartComponent>;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        I18nTestingModule,
        UrlTestingModule,
        RouterTestingModule,
      ],
      declarations: [AddToSavedCartComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    isLoggedInSubject$.next(false);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open service dialog', () => {
    spyOn(launchDialogService, 'openDialog').and.stub();

    component.openDialog(mockCart);

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.SAVED_CART,
      component.element,
      component['vcr'],
      {
        cart: mockCart,
        layoutOption: 'save',
      }
    );
  });

  it("should enable the 'Save cart for later' button", (done) => {
    fixture.destroy();

    const activeCartFacade = TestBed.inject(ActiveCartFacade);

    const cart: Cart = {
      ...mockCart,
      entries: [{}],
    };

    spyOn(activeCartFacade, 'getActive').and.returnValue(of(cart));

    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.disableSaveCartForLater$
      .pipe(take(1))
      .subscribe((disableSaveCartForLater) => {
        expect(disableSaveCartForLater).toBe(false);

        done();
      });
  });

  it("should disable the 'Save cart for later' button if the cart is an empty object", (done) => {
    fixture.destroy();

    const activeCartFacade = TestBed.inject(ActiveCartFacade);

    spyOn(activeCartFacade, 'getActive').and.returnValue(of({}));

    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.disableSaveCartForLater$
      .pipe(take(1))
      .subscribe((disableSaveCartForLater) => {
        expect(disableSaveCartForLater).toBe(true);

        done();
      });
  });

  it("should disable the 'Save cart for later' button if the cart has no entries", (done) => {
    fixture.destroy();

    const activeCartFacade = TestBed.inject(ActiveCartFacade);

    const emptyCart = {
      entries: [],
    };

    spyOn(activeCartFacade, 'getActive').and.returnValue(of(emptyCart));

    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.disableSaveCartForLater$
      .pipe(take(1))
      .subscribe((disableSaveCartForLater) => {
        expect(disableSaveCartForLater).toBe(true);

        done();
      });
  });

  describe('should trigger action on save cart method', () => {
    describe('when user is not logged in', () => {
      it('should redirect to login page', () => {
        spyOn(routingService, 'go').and.callThrough();
        component.disableSaveCartForLater$ = of(false);

        component.saveCart(mockCart);

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'login',
        });
      });
    });

    describe('when user is logged in', () => {
      it('should open dialog ', () => {
        spyOn(launchDialogService, 'openDialog').and.stub();
        isLoggedInSubject$.next(true);
        component.disableSaveCartForLater$ = of(false);

        component.saveCart(mockCart);

        expect(launchDialogService.openDialog).toHaveBeenCalledWith(
          LAUNCH_CALLER.SAVED_CART,
          component.element,
          component['vcr'],
          {
            cart: mockCart,
            layoutOption: 'save',
          }
        );
      });

      describe('should not trigger save cart method', () => {
        it('when saved cart button is disabled', () => {
          spyOn(routingService, 'go').and.callThrough();
          component.disableSaveCartForLater$ = of(true);

          component.saveCart(mockCart);

          expect(routingService.go).not.toHaveBeenCalledWith({
            cxRoute: 'login',
          });
        });
      });
    });
  });
});
