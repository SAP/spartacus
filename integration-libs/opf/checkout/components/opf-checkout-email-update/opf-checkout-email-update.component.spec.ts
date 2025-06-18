import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import {
  ActiveCartFacade,
  CartGuestUserFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  RoutingService,
  SemanticPathService,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { OpfCheckoutEmailUpdateComponent } from './opf-checkout-email-update.component';

@Pipe({
  name: 'cxTranslate',
  standalone: false,
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-form-errors',
  template: '',
  standalone: false,
})
class MockFormErrorsComponent {
  @Input() control: UntypedFormControl;
  @Input()
  translationParams: { [key: string]: string | null };
}

describe('OpfCheckoutEmailUpdateComponent', () => {
  let component: OpfCheckoutEmailUpdateComponent;
  let fixture: ComponentFixture<OpfCheckoutEmailUpdateComponent>;
  let cartGuestUserFacade: jasmine.SpyObj<CartGuestUserFacade>;
  let multiCartFacade: jasmine.SpyObj<MultiCartFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let router: jasmine.SpyObj<RoutingService>;
  let semanticPathService: jasmine.SpyObj<SemanticPathService>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;

  beforeEach(async () => {
    const cartGuestUserFacadeSpy = jasmine.createSpyObj('CartGuestUserFacade', [
      'updateCartGuestUser',
    ]);
    const multiCartFacadeSpy = jasmine.createSpyObj('MultiCartFacade', [
      'reloadCart',
    ]);
    const userIdServiceSpy = jasmine.createSpyObj('UserIdService', [
      'takeUserId',
    ]);
    const routerSpy = jasmine.createSpyObj('RoutingService', ['go']);
    const semanticPathServiceSpy = jasmine.createSpyObj('SemanticPathService', [
      'get',
    ]);
    const activeCartFacadeSpy = jasmine.createSpyObj('ActiveCartFacade', [
      'takeActiveCartId',
    ]);

    await TestBed.configureTestingModule({
      declarations: [
        OpfCheckoutEmailUpdateComponent,
        MockTranslatePipe,
        MockFormErrorsComponent,
      ],
      providers: [
        { provide: CartGuestUserFacade, useValue: cartGuestUserFacadeSpy },
        { provide: MultiCartFacade, useValue: multiCartFacadeSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
        { provide: RoutingService, useValue: routerSpy },
        { provide: SemanticPathService, useValue: semanticPathServiceSpy },
        { provide: ActiveCartFacade, useValue: activeCartFacadeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutEmailUpdateComponent);
    component = fixture.componentInstance;

    cartGuestUserFacade = TestBed.inject(
      CartGuestUserFacade
    ) as jasmine.SpyObj<CartGuestUserFacade>;
    multiCartFacade = TestBed.inject(
      MultiCartFacade
    ) as jasmine.SpyObj<MultiCartFacade>;
    userIdService = TestBed.inject(
      UserIdService
    ) as jasmine.SpyObj<UserIdService>;
    router = TestBed.inject(RoutingService) as jasmine.SpyObj<RoutingService>;
    semanticPathService = TestBed.inject(
      SemanticPathService
    ) as jasmine.SpyObj<SemanticPathService>;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as jasmine.SpyObj<ActiveCartFacade>;
  });

  it('should initialize form with empty values', () => {
    expect(component.checkoutLoginForm.value).toEqual({
      email: '',
      emailConfirmation: '',
    });
  });

  it('should call updateCartGuestUserEmail on form submission', () => {
    spyOn(component as any, 'updateCartGuestUserEmail');
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
    userIdService.takeUserId.and.returnValue(of('test-user-id'));
    activeCartFacade.takeActiveCartId.and.returnValue(of('test-cart-id'));
    cartGuestUserFacade.updateCartGuestUser.and.returnValue(of(undefined));
    semanticPathService.get.and.returnValue('checkoutDeliveryAddress');

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
