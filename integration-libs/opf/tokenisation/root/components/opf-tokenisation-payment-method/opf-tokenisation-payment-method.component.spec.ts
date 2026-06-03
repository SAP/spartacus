import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  PaymentDetails,
  UserPaymentService,
  RoutingService,
  TranslationService,
  GlobalMessageService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { OpfTokenisationPaymentMethodComponent } from './opf-tokenisation-payment-method.component';
import { OpfTokenisationPaymentMethodService } from './opf-tokenisation-payment-method.service';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { OrderFacade } from '@spartacus/order/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import {
  OpfTokenisationSavedCardsService,
  SAVED_CARDS_ID,
} from '@spartacus/opf/tokenisation/root';
import { SelectFocusUtility, OutletContextData } from '@spartacus/storefront';

describe('OpfTokenisationPaymentMethodComponent', () => {
  let component: OpfTokenisationPaymentMethodComponent;
  let fixture: ComponentFixture<OpfTokenisationPaymentMethodComponent>;
  let componentService: OpfTokenisationPaymentMethodService;

  const mockPaymentDetails: PaymentDetails = {
    id: 'payment-1',
    cardNumber: '************1234',
    expiryMonth: '12',
    expiryYear: '2028',
    defaultPayment: false,
  };

  const mockMetadataState = {
    selectedPaymentOptionId: SAVED_CARDS_ID,
    termsAndConditionsChecked: false,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
  };

  const mockDocument = {
    querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]),
    activeElement: null,
  };

  beforeEach(async () => {
    const userPaymentService = jasmine.createSpyObj('UserPaymentService', [
      'loadPaymentMethods',
      'getPaymentMethods',
      'getPaymentMethodsLoading',
    ]);
    userPaymentService.getPaymentMethods.and.returnValue(of([]));
    userPaymentService.getPaymentMethodsLoading.and.returnValue(of(false));

    const translationService = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);
    translationService.translate.and.returnValue(of('translated'));

    const checkoutPaymentFacade = jasmine.createSpyObj(
      'CheckoutPaymentFacade',
      ['getPaymentDetailsState', 'setPaymentDetails', 'createPaymentDetails']
    );
    checkoutPaymentFacade.getPaymentDetailsState.and.returnValue(
      of({ loading: false, error: false as const, data: undefined })
    );
    checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));
    checkoutPaymentFacade.createPaymentDetails.and.returnValue(of(undefined));

    const checkoutDeliveryAddressFacade = jasmine.createSpyObj(
      'CheckoutDeliveryAddressFacade',
      ['getDeliveryAddressState']
    );
    checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
      of({ loading: false, error: false as const, data: undefined })
    );

    const orderFacade = jasmine.createSpyObj('OrderFacade', [
      'placePaymentAuthorizedOrder',
    ]);
    orderFacade.placePaymentAuthorizedOrder.and.returnValue(of(null));

    const activeCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'isGuestCart',
    ]);
    activeCartFacade.isGuestCart.and.returnValue(of(false));

    const opfMetadataStoreService = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['getOpfMetadataState']
    );
    opfMetadataStoreService.getOpfMetadataState.and.returnValue(
      of(mockMetadataState)
    );

    await TestBed.configureTestingModule({
      imports: [OpfTokenisationPaymentMethodComponent],
      providers: [
        OpfTokenisationPaymentMethodService,
        { provide: UserPaymentService, useValue: userPaymentService },
        {
          provide: RoutingService,
          useValue: jasmine.createSpyObj('RoutingService', ['go']),
        },
        { provide: TranslationService, useValue: translationService },
        {
          provide: GlobalMessageService,
          useValue: jasmine.createSpyObj('GlobalMessageService', ['add']),
        },
        { provide: CheckoutPaymentFacade, useValue: checkoutPaymentFacade },
        {
          provide: CheckoutDeliveryAddressFacade,
          useValue: checkoutDeliveryAddressFacade,
        },
        { provide: OrderFacade, useValue: orderFacade },
        {
          provide: CheckoutStepService,
          useValue: jasmine.createSpyObj('CheckoutStepService', ['back']),
        },
        { provide: ActiveCartFacade, useValue: activeCartFacade },
        { provide: OpfMetadataStoreService, useValue: opfMetadataStoreService },
        {
          provide: OpfTokenisationSavedCardsService,
          useValue: {
            ...jasmine.createSpyObj('OpfTokenisationSavedCardsService', [
              'markCardAsSelected',
            ]),
            selectedPaymentMethodId$: new BehaviorSubject<string | undefined>(
              undefined
            ),
          },
        },
        {
          provide: SelectFocusUtility,
          useValue: jasmine.createSpyObj('SelectFocusUtility', [
            'findFirstFocusable',
          ]),
        },
        { provide: WindowRef, useValue: { document: mockDocument } },
        { provide: ActivatedRoute, useValue: {} },
        { provide: OutletContextData, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfTokenisationPaymentMethodComponent);
    component = fixture.componentInstance;

    // Get the service instance from the COMPONENT's injector, not the root injector
    componentService = fixture.debugElement.injector.get(
      OpfTokenisationPaymentMethodService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize service on ngOnInit', () => {
      const spy = spyOn(componentService, 'initialize').and.callThrough();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should assign all observables on ngOnInit', () => {
      fixture.detectChanges();
      expect(component.cards$).toBeDefined();
      expect(component.isUpdating$).toBeDefined();
      expect(component.selectedMethod$).toBeDefined();
      expect(component.showSavedCards$).toBeDefined();
    });
  });

  describe('selectPaymentMethod', () => {
    it('should call service selectPaymentMethod with payment details', () => {
      const spy = spyOn(componentService, 'selectPaymentMethod');
      component.selectPaymentMethod(mockPaymentDetails);
      expect(spy).toHaveBeenCalledWith(mockPaymentDetails);
    });

    it('should call selectPaymentMethod when different payment method is provided', () => {
      const spy = spyOn(componentService, 'selectPaymentMethod');
      const paymentMethod: PaymentDetails = {
        id: 'payment-2',
        cardNumber: '****5678',
      };
      component.selectPaymentMethod(paymentMethod);
      expect(spy).toHaveBeenCalledWith(paymentMethod);
    });
  });

  describe('setPaymentDetails', () => {
    it('should call service setPaymentDetails with payment details only', () => {
      const spy = spyOn(componentService, 'setPaymentDetails');
      component.setPaymentDetails({ paymentDetails: mockPaymentDetails });
      expect(spy).toHaveBeenCalledWith({
        paymentDetails: mockPaymentDetails,
        billingAddress: undefined,
      });
    });

    it('should call service setPaymentDetails with payment details and billing address', () => {
      const spy = spyOn(componentService, 'setPaymentDetails');
      const billingAddress = {
        firstName: 'John',
        lastName: 'Doe',
        line1: '123 Main St',
      };
      component.setPaymentDetails({
        paymentDetails: mockPaymentDetails,
        billingAddress,
      });
      expect(spy).toHaveBeenCalledWith({
        paymentDetails: mockPaymentDetails,
        billingAddress,
      });
    });
  });

  describe('next', () => {
    it('should call service next method', () => {
      const spy = spyOn(componentService, 'next');
      component.next();
      expect(spy).toHaveBeenCalled();
    });

    it('should call next only once per invocation', () => {
      const spy = spyOn(componentService, 'next');
      component.next();
      component.next();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('back', () => {
    it('should call service back method', () => {
      const spy = spyOn(componentService, 'back');
      component.back();
      expect(spy).toHaveBeenCalled();
    });

    it('should call back only once per invocation', () => {
      const spy = spyOn(componentService, 'back');
      component.back();
      component.back();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('ngOnDestroy', () => {
    it('should destroy service on ngOnDestroy', () => {
      const spy = spyOn(componentService, 'destroy');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });

    it('should call destroy only once', () => {
      const spy = spyOn(componentService, 'destroy');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize service before assigning observables', () => {
      const spy = spyOn(componentService, 'initialize').and.callThrough();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      expect(component.cards$).toBeDefined();
    });

    it('should clean up on destroy', () => {
      const spy = spyOn(componentService, 'destroy');
      fixture.detectChanges();
      fixture.destroy();
      expect(spy).toHaveBeenCalled();
    });
  });
});
