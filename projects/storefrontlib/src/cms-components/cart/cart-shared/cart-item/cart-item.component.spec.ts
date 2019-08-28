import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  UserToken,
  AuthRedirectService,
} from '@spartacus/core';
import { CartItemComponent } from './cart-item.component';
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
}

class MockAuthRedirectService {
  reportAuthGuard() {}
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
  @Input() isValueChangeable;
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

  let authService: AuthService;
  let routingService: RoutingService;
  let authRedirectService: AuthRedirectService;
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
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    routingService = TestBed.get(RoutingService);
    authRedirectService = TestBed.get(AuthRedirectService);

    fixture = TestBed.createComponent(CartItemComponent);
    cartItemComponent = fixture.componentInstance;
    cartItemComponent.item = {};

    spyOn(cartItemComponent.remove, 'emit').and.callThrough();
    spyOn(cartItemComponent.update, 'emit').and.callThrough();

    spyOn(cartItemComponent.saveForLater, 'emit').and.callThrough();
    spyOn(routingService, 'go').and.callThrough();
    spyOn(authRedirectService, 'reportAuthGuard').and.callThrough();
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
    expect(authRedirectService.reportAuthGuard).toHaveBeenCalled();
  });

  it('should be able to save item for later', () => {
    spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
    cartItemComponent.saveItemForLater();
    expect(cartItemComponent.saveForLater.emit).toHaveBeenCalledWith(
      cartItemComponent.item
    );
  });
});
