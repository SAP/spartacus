import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UserToken } from '@spartacus/core';
import { CartItemComponent } from './cart-item.component';
import { Router } from '@angular/router';
import { AuthService, RoutingService } from '@spartacus/core';
import { of, Observable } from 'rxjs';

const userToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
} as UserToken;

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({} as UserToken);
  }
}

class MockRoutingService {
  go() {}
  saveRedirectUrl() {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

@Component({
  template: '',
  selector: 'cx-item-counter',
})
class MockItemCounterComponent {
  @Input() step;
  @Input() min;
  @Input() max;
  @Input() cartIsLoading;
}

@Component({
  template: '',
  selector: 'cx-promotions',
})
class MockPromotionsComponent {
  @Input() promotions;
}

describe('CartItemComponent', () => {
  let cartItemComponent: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  let router: Router;
  let authService: AuthService;
  let routingService: RoutingService;
  // let routerStateSnapshot: RouterStateSnapshot;
  // routerStateSnapshot.url='/test';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
      declarations: [
        CartItemComponent,
        MockMediaComponent,
        MockItemCounterComponent,
        MockPromotionsComponent,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    routingService = TestBed.get(RoutingService);

    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.item = {};

    spyOn(cartItemComponent.remove, 'emit').and.callThrough();
    spyOn(cartItemComponent.update, 'emit').and.callThrough();

    spyOn(cartItemComponent.saveForLater, 'emit').and.callThrough();
    spyOn(routingService, 'go').and.callThrough();
    spyOn(routingService, 'saveRedirectUrl').and.callThrough();
    // spyOn(router.routerState, 'snapshot').and.returnValue(routerStateSnapshot);
    router.routerState.snapshot.url = '/testUrl';
  });

  it('should create cart details component', () => {
    expect(cartItemComponent).toBeTruthy();
  });

  it('should call removeItem()', () => {
    cartItemComponent.removeItem();

    expect(cartItemComponent.remove.emit).toHaveBeenCalledWith(
      cartItemComponent.item
    );
  });

  it('should call updateItem()', () => {
    cartItemComponent.updateItem(2);

    expect(cartItemComponent.update.emit).toHaveBeenCalledWith({
      item: cartItemComponent.item,
      updatedQuantity: 2,
    });
  });

  it('should be able to handle anonymous users', () => {
    cartItemComponent.saveItemForLater();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
    expect(routingService.saveRedirectUrl).toHaveBeenCalledWith('/testUrl');
  });

  it('should be able to save item for later', () => {
    spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
    cartItemComponent.saveItemForLater();
    expect(cartItemComponent.saveForLater.emit).toHaveBeenCalledWith(
      cartItemComponent.item
    );
  });
});
