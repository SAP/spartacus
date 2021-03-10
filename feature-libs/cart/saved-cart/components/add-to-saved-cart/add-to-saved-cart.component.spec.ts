import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  AuthService,
  Cart,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { SavedCartFormLaunchDialogService } from '../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';

const mockCart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
};

const cart$ = new BehaviorSubject<Cart>(mockCart);
const isLoggedInSubject$ = new BehaviorSubject(false);

class MockActiveCartService implements Partial<ActiveCartService> {
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
  go(): void {}
}

class MockSavedCartFormLaunchDialogService {
  openDialog(_openElement?: ElementRef, _vcr?: ViewContainerRef, _data?: any) {}
}

describe('AddToSavedCartComponent', () => {
  let component: AddToSavedCartComponent;
  let fixture: ComponentFixture<AddToSavedCartComponent>;
  let savedCartFormLaunchDialogService: SavedCartFormLaunchDialogService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), I18nTestingModule, UrlTestingModule],
      declarations: [AddToSavedCartComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: SavedCartFormLaunchDialogService,
          useClass: MockSavedCartFormLaunchDialogService,
        },
      ],
    }).compileComponents();

    isLoggedInSubject$.next(false);
    routingService = TestBed.inject(RoutingService);
    savedCartFormLaunchDialogService = TestBed.inject(
      SavedCartFormLaunchDialogService
    );
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
    spyOn(savedCartFormLaunchDialogService, 'openDialog').and.stub();

    component.openDialog(mockCart);

    expect(savedCartFormLaunchDialogService.openDialog).toHaveBeenCalledWith(
      component.element,
      component['vcr'],
      {
        cart: mockCart,
      }
    );
  });

  describe('should trigger action on save cart method', () => {
    describe('when user is not logged in', () => {
      it('should redirect to login page', () => {
        spyOn(routingService, 'go').and.callThrough();

        component.saveCart(mockCart);

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'login',
        });
      });
    });

    describe('when user is logged in', () => {
      it('should open dialog ', () => {
        spyOn(savedCartFormLaunchDialogService, 'openDialog').and.stub();
        isLoggedInSubject$.next(true);

        component.saveCart(mockCart);

        expect(
          savedCartFormLaunchDialogService.openDialog
        ).toHaveBeenCalledWith(component.element, component['vcr'], {
          cart: mockCart,
        });
      });
    });
  });

  // TODO: Michal test clicking the saved carts button as well for the listing page (logggedIn/anonymous)
  // The use case above is only testing the save cart for later button.
});
