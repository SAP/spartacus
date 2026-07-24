import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  AuthService,
  CxDatePipe,
  FeatureDirective,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of, firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

import { RouterModule } from '@angular/router';
import { MockUrlPipe } from '../../../../../core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { MockFeatureDirective } from '../../../../../core-libs/storefront/shared/test/mock-feature-directive';
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
        AddToSavedCartComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(AddToSavedCartComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, FeatureDirective],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();

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
    vi.spyOn(launchDialogService, 'openDialog').mockImplementation(() => {});

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

  it("should enable the 'Save cart for later' button", async () => {
    fixture.destroy();

    const activeCartFacade = TestBed.inject(ActiveCartFacade);

    const cart: Cart = {
      ...mockCart,
      entries: [{}],
    };

    vi.spyOn(activeCartFacade, 'getActive').mockReturnValue(of(cart));

    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const disableSaveCartForLater = await firstValueFrom(
      component.disableSaveCartForLater$
    );
    expect(disableSaveCartForLater).toBe(false);
  });

  it("should disable the 'Save cart for later' button if the cart is an empty object", async () => {
    fixture.destroy();

    const activeCartFacade = TestBed.inject(ActiveCartFacade);

    vi.spyOn(activeCartFacade, 'getActive').mockReturnValue(of({}));

    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const disableSaveCartForLater = await firstValueFrom(
      component.disableSaveCartForLater$
    );
    expect(disableSaveCartForLater).toBe(true);
  });

  it("should disable the 'Save cart for later' button if the cart has no entries", async () => {
    fixture.destroy();

    const activeCartFacade = TestBed.inject(ActiveCartFacade);

    const emptyCart = {
      entries: [],
    };

    vi.spyOn(activeCartFacade, 'getActive').mockReturnValue(of(emptyCart));

    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const disableSaveCartForLater = await firstValueFrom(
      component.disableSaveCartForLater$
    );
    expect(disableSaveCartForLater).toBe(true);
  });

  describe('should trigger action on save cart method', () => {
    describe('when user is not logged in', () => {
      it('should redirect to login page', () => {
        vi.spyOn(routingService, 'go');
        component.disableSaveCartForLater$ = of(false);

        component.saveCart(mockCart);

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'login',
        });
      });
    });

    describe('when user is logged in', () => {
      it('should open dialog ', () => {
        vi.spyOn(launchDialogService, 'openDialog').mockImplementation(() => {});
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
          vi.spyOn(routingService, 'go');
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
