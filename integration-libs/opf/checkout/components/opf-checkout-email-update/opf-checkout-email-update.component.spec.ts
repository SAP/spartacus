import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { vi } from 'vitest';
import {
  ActiveCartFacade,
  CartGuestUserFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  MockTranslatePipe,
  RoutingService,
  SemanticPathService,
  TranslatePipe,
  UserIdService,
} from '@spartacus/core';
import { FormErrorsComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfCheckoutEmailUpdateComponent } from './opf-checkout-email-update.component';

@Component({
  selector: 'cx-form-errors',
  template: '',
})
class MockFormErrorsComponent {
  @Input() control: UntypedFormControl;
  @Input()
  translationParams: { [key: string]: string | null };
}

describe('OpfCheckoutEmailUpdateComponent', () => {
  let component: OpfCheckoutEmailUpdateComponent;
  let fixture: ComponentFixture<OpfCheckoutEmailUpdateComponent>;
  let cartGuestUserFacade: any;
  let multiCartFacade: any;
  let userIdService: any;
  let router: any;
  let semanticPathService: any;
  let activeCartFacade: any;

  beforeEach(async () => {
    const cartGuestUserFacadeSpy = { updateCartGuestUser: vi.fn() };
    const multiCartFacadeSpy = { reloadCart: vi.fn() };
    const userIdServiceSpy = { takeUserId: vi.fn() };
    const routerSpy = { go: vi.fn() };
    const semanticPathServiceSpy = { get: vi.fn() };
    const activeCartFacadeSpy = { takeActiveCartId: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [OpfCheckoutEmailUpdateComponent],
      providers: [
        { provide: CartGuestUserFacade, useValue: cartGuestUserFacadeSpy },
        { provide: MultiCartFacade, useValue: multiCartFacadeSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
        { provide: RoutingService, useValue: routerSpy },
        { provide: SemanticPathService, useValue: semanticPathServiceSpy },
        { provide: ActiveCartFacade, useValue: activeCartFacadeSpy },
      ],
    })
      .overrideComponent(OpfCheckoutEmailUpdateComponent, {
        remove: {
          imports: [TranslatePipe, FormErrorsComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockFormErrorsComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutEmailUpdateComponent);
    component = fixture.componentInstance;

    cartGuestUserFacade = TestBed.inject(
      CartGuestUserFacade
    ) as any;
    multiCartFacade = TestBed.inject(
      MultiCartFacade
    ) as any;
    userIdService = TestBed.inject(
      UserIdService
    ) as any;
    router = TestBed.inject(RoutingService) as any;
    semanticPathService = TestBed.inject(
      SemanticPathService
    ) as any;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as any;

    userIdService.takeUserId.mockReturnValue(of('test-user-id'));
    activeCartFacade.takeActiveCartId.mockReturnValue(of('test-cart-id'));
    cartGuestUserFacade.updateCartGuestUser.mockReturnValue(of(undefined));
    semanticPathService.get.mockReturnValue('checkoutDeliveryAddress');
  });

  it('should initialize form with empty values', () => {
    expect(component.checkoutLoginForm.value).toEqual({
      email: '',
      emailConfirmation: '',
    });
  });

  it('should call updateCartGuestUserEmail on form submission', () => {
    vi.spyOn(component as any, 'updateCartGuestUserEmail');
    component.checkoutLoginForm.setValue({
      email: 'test@example.com',
      emailConfirmation: 'test@example.com',
    });
    component.onSubmit();
    expect(component['updateCartGuestUserEmail']).toHaveBeenCalledWith(
      'test@example.com'
    );
  });

  it('should update cart guest user email and navigate on success', () => {
    component['updateCartGuestUserEmail']('test@example.com');
    expect(cartGuestUserFacade.updateCartGuestUser).toHaveBeenCalledWith(
      'test-user-id',
      'test-cart-id',
      { email: 'test@example.com' }
    );
    expect(multiCartFacade.reloadCart).toHaveBeenCalledWith('test-cart-id');
    expect(router.go).toHaveBeenCalledWith('checkoutDeliveryAddress');
  });
});
