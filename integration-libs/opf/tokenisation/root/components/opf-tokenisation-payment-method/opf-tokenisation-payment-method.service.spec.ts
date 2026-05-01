import { TestBed } from '@angular/core/testing';
import {
  Address,
  GlobalMessageService,
  GlobalMessageType,
  PaymentDetails,
  RoutingService,
  TranslationService,
  UserPaymentService,
  WindowRef,
} from '@spartacus/core';
import { of, BehaviorSubject } from 'rxjs';
import { SelectFocusUtility, OutletContextData } from '@spartacus/storefront';
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
  SAVED_CARDS_ID,
  OpfTokenisationSavedCardsService,
} from '@spartacus/opf/tokenisation/root';
import { OpfTokenisationPaymentMethodService } from './opf-tokenisation-payment-method.service';

describe('OpfTokenisationPaymentMethodService', () => {
  let service: OpfTokenisationPaymentMethodService;
  let userPaymentService: jasmine.SpyObj<UserPaymentService>;
  let checkoutPaymentFacade: jasmine.SpyObj<CheckoutPaymentFacade>;
  let opfMetadataStoreService: jasmine.SpyObj<OpfMetadataStoreService>;
  let savedCardsService: jasmine.SpyObj<OpfTokenisationSavedCardsService>;
  let orderFacade: jasmine.SpyObj<OrderFacade>;
  let routingService: jasmine.SpyObj<RoutingService>;
  let checkoutStepService: jasmine.SpyObj<CheckoutStepService>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let checkoutDeliveryAddressFacade: jasmine.SpyObj<CheckoutDeliveryAddressFacade>;
  let focusService: jasmine.SpyObj<SelectFocusUtility>;
  let windowRef: jasmine.SpyObj<WindowRef>;

  const mockPaymentDetails: PaymentDetails = {
    id: 'payment-1',
    cardNumber: '************1234',
    expiryMonth: '12',
    expiryYear: '2028',
    defaultPayment: false,
  };

  const mockAddress: Address = {
    firstName: 'John',
    lastName: 'Doe',
    line1: '123 Main St',
    town: 'Springfield',
    country: { isocode: 'US' },
    postalCode: '12345',
  };

  const mockMetadataStateSavedCards = {
    selectedPaymentOptionId: SAVED_CARDS_ID,
    termsAndConditionsChecked: false,
    isPaymentInProgress: false,
    opfPaymentSessionId: undefined,
    isTermsAndConditionsAlertClosed: false,
  };

  beforeEach(() => {
    userPaymentService = jasmine.createSpyObj('UserPaymentService', [
      'loadPaymentMethods',
      'getPaymentMethods',
      'getPaymentMethodsLoading',
    ]);
    checkoutPaymentFacade = jasmine.createSpyObj('CheckoutPaymentFacade', [
      'getPaymentDetailsState',
      'setPaymentDetails',
      'createPaymentDetails',
    ]);
    opfMetadataStoreService = jasmine.createSpyObj('OpfMetadataStoreService', [
      'getOpfMetadataState',
    ]);
    savedCardsService = jasmine.createSpyObj(
      'OpfTokenisationSavedCardsService',
      ['markCardAsSelected']
    );
    orderFacade = jasmine.createSpyObj('OrderFacade', [
      'placePaymentAuthorizedOrder',
    ]);
    routingService = jasmine.createSpyObj('RoutingService', ['go']);
    checkoutStepService = jasmine.createSpyObj('CheckoutStepService', ['back']);
    globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);
    activeCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'isGuestCart',
    ]);
    translationService = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);
    checkoutDeliveryAddressFacade = jasmine.createSpyObj(
      'CheckoutDeliveryAddressFacade',
      ['getDeliveryAddressState']
    );
    focusService = jasmine.createSpyObj('SelectFocusUtility', [
      'findFirstFocusable',
    ]);

    const mockDocument = {
      querySelectorAll: jasmine
        .createSpy('querySelectorAll')
        .and.returnValue([]),
      activeElement: null,
    };
    windowRef = jasmine.createSpyObj('WindowRef', [], {
      document: mockDocument,
    });

    // Default mock returns
    userPaymentService.getPaymentMethods.and.returnValue(of([]));
    userPaymentService.getPaymentMethodsLoading.and.returnValue(of(false));
    checkoutPaymentFacade.getPaymentDetailsState.and.returnValue(
      of({ loading: false, error: false, data: undefined })
    );
    opfMetadataStoreService.getOpfMetadataState.and.returnValue(
      of(mockMetadataStateSavedCards)
    );
    checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
      of({ loading: false, error: false, data: mockAddress })
    );
    activeCartFacade.isGuestCart.and.returnValue(of(false));
    translationService.translate.and.callFake((key: string) => of(key));
    orderFacade.placePaymentAuthorizedOrder.and.returnValue(of(null));

    TestBed.configureTestingModule({
      providers: [
        OpfTokenisationPaymentMethodService,
        { provide: UserPaymentService, useValue: userPaymentService },
        { provide: CheckoutPaymentFacade, useValue: checkoutPaymentFacade },
        { provide: OpfMetadataStoreService, useValue: opfMetadataStoreService },
        {
          provide: OpfTokenisationSavedCardsService,
          useValue: savedCardsService,
        },
        { provide: OrderFacade, useValue: orderFacade },
        { provide: RoutingService, useValue: routingService },
        { provide: CheckoutStepService, useValue: checkoutStepService },
        { provide: ActivatedRoute, useValue: {} },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: ActiveCartFacade, useValue: activeCartFacade },
        { provide: TranslationService, useValue: translationService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useValue: checkoutDeliveryAddressFacade,
        },
        { provide: SelectFocusUtility, useValue: focusService },
        { provide: WindowRef, useValue: windowRef },
        { provide: OutletContextData, useValue: null },
      ],
    });

    service = TestBed.inject(OpfTokenisationPaymentMethodService);
  });

  afterEach(() => {
    service.destroy();
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(service.paymentDetails).toBeUndefined();
      expect(service.isGuestCheckout).toBeFalsy();
    });
  });

  describe('showSavedCards$', () => {
    it('should emit true when selectedPaymentOptionId is SAVED_CARDS_ID', (done) => {
      opfMetadataStoreService.getOpfMetadataState.and.returnValue(
        of({
          selectedPaymentOptionId: SAVED_CARDS_ID,
          termsAndConditionsChecked: false,
          isPaymentInProgress: false,
          opfPaymentSessionId: undefined,
          isTermsAndConditionsAlertClosed: false,
        })
      );
      // Re-create service to pick up new mock
      service = TestBed.inject(OpfTokenisationPaymentMethodService);

      service.showSavedCards$.subscribe((value) => {
        expect(value).toBeTruthy();
        done();
      });
    });
  });

  describe('isUpdating$', () => {
    it('should emit true when busy$ is true', (done) => {
      (service as any).busy$.next(true);
      service.isUpdating$.subscribe((value) => {
        expect(value).toBeTruthy();
        done();
      });
    });

    it('should emit false when all loading states are false', (done) => {
      service.isUpdating$.subscribe((value) => {
        expect(value).toBeFalsy();
        done();
      });
    });
  });

  describe('existingPaymentMethods$', () => {
    it('should return payment methods from userPaymentService', (done) => {
      const mockMethods: PaymentDetails[] = [mockPaymentDetails];
      userPaymentService.getPaymentMethods.and.returnValue(of(mockMethods));

      service.existingPaymentMethods$.subscribe((methods) => {
        expect(methods).toEqual(mockMethods);
        done();
      });
    });

    it('should return empty array when no payment methods', (done) => {
      userPaymentService.getPaymentMethods.and.returnValue(of([]));

      service.existingPaymentMethods$.subscribe((methods) => {
        expect(methods).toEqual([]);
        done();
      });
    });
  });

  describe('selectedMethod$', () => {
    it('should initially emit undefined', (done) => {
      service.selectedMethod$.subscribe((method) => {
        expect(method).toBeUndefined();
        done();
      });
    });

    it('should emit updated value after selection', (done) => {
      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);

      service.selectedMethod$.subscribe((method) => {
        expect(method).toEqual(mockPaymentDetails);
        done();
      });
    });
  });

  describe('initialize()', () => {
    it('should set isGuestCheckout to true when guest cart', () => {
      activeCartFacade.isGuestCart.and.returnValue(of(true));

      service.initialize();

      expect(service.isGuestCheckout).toBeTruthy();
    });

    it('should set deliveryAddress from checkoutDeliveryAddressFacade', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
        of({ loading: false, error: false, data: mockAddress })
      );

      service.initialize();

      expect((service as any).deliveryAddress).toEqual(mockAddress);
    });

    it('should not set deliveryAddress while state is loading', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState.and.returnValue(
        of({ loading: true, error: false, data: mockAddress })
      );

      service.initialize();

      expect((service as any).deliveryAddress).toBeUndefined();
    });

    it('should clear selected payment method when switching away from saved cards', () => {
      const metadataSubject = new BehaviorSubject<any>({
        selectedPaymentOptionId: SAVED_CARDS_ID,
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });
      opfMetadataStoreService.getOpfMetadataState.and.returnValue(
        metadataSubject.asObservable()
      );

      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);
      service.initialize();

      metadataSubject.next({
        selectedPaymentOptionId: 'other-option',
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });

      expect(
        (service as any).selectedPaymentMethod$.getValue()
      ).toBeUndefined();
    });

    it('should not clear selected payment method when staying on saved cards', () => {
      const metadataSubject = new BehaviorSubject<any>({
        selectedPaymentOptionId: SAVED_CARDS_ID,
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });
      opfMetadataStoreService.getOpfMetadataState.and.returnValue(
        metadataSubject.asObservable()
      );

      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);
      service.initialize();

      metadataSubject.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        mockPaymentDetails
      );
    });
  });

  describe('getCards$()', () => {
    it('should return empty array when no payment methods', (done) => {
      userPaymentService.getPaymentMethods.and.returnValue(of([]));

      service.getCards$().subscribe((cards) => {
        expect(cards).toEqual([]);
        done();
      });
    });

    it('should return cards mapped from payment methods', (done) => {
      userPaymentService.getPaymentMethods.and.returnValue(
        of([mockPaymentDetails])
      );
      translationService.translate.and.callFake((key: string) => of(key));
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(of(null));

      service.getCards$().subscribe((cards) => {
        expect(cards.length).toBe(1);
        expect(cards[0].paymentMethod).toEqual(mockPaymentDetails);
        expect(cards[0].content).toBeDefined();
        done();
      });
    });

    it('should mark selected card with selected header', (done) => {
      userPaymentService.getPaymentMethods.and.returnValue(
        of([mockPaymentDetails])
      );
      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);
      translationService.translate.and.callFake((key: string) => of(key));
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(of(null));

      service.getCards$().subscribe((cards) => {
        expect(cards[0].content.header).toBe('paymentCard.selected');
        done();
      });
    });

    it('should show action button for unselected cards', (done) => {
      userPaymentService.getPaymentMethods.and.returnValue(
        of([mockPaymentDetails])
      );
      (service as any).selectedPaymentMethod$.next(undefined);

      service.getCards$().subscribe((cards) => {
        expect(cards[0].content.actions?.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('createCard()', () => {
    it('should create card with role button when not selected', () => {
      const card = (service as any).createCard(
        mockPaymentDetails,
        {
          textExpires: 'Expires',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        undefined
      );

      expect(card.role).toBe('button');
    });

    it('should create card with role application when selected', () => {
      const card = (service as any).createCard(
        mockPaymentDetails,
        {
          textExpires: 'Expires',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        mockPaymentDetails
      );

      expect(card.role).toBe('application');
    });

    it('should show selected header when payment is selected', () => {
      const card = (service as any).createCard(
        mockPaymentDetails,
        {
          textExpires: 'Expires',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        mockPaymentDetails
      );

      expect(card.header).toBe('Selected');
    });

    it('should not show header when payment is not selected', () => {
      const card = (service as any).createCard(
        mockPaymentDetails,
        {
          textExpires: 'Expires',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        undefined
      );

      expect(card.header).toBeUndefined();
    });

    it('should show default payment label when defaultPayment is true', () => {
      const card = (service as any).createCard(
        { ...mockPaymentDetails, defaultPayment: true },
        {
          textExpires: 'Expires',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        undefined
      );

      expect(card.label).toBe('paymentCard.defaultPaymentLabel');
    });

    it('should show additional payment label when defaultPayment is false', () => {
      const card = (service as any).createCard(
        { ...mockPaymentDetails, defaultPayment: false },
        {
          textExpires: 'Expires',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        undefined
      );

      expect(card.label).toBe('paymentCard.additionalPaymentLabel');
    });

    it('should include cardNumber and expiry in text', () => {
      const card = (service as any).createCard(
        mockPaymentDetails,
        {
          textExpires: 'Expires 12/2028',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
        },
        undefined
      );

      expect(card.text).toContain(mockPaymentDetails.cardNumber);
      expect(card.text).toContain('Expires 12/2028');
    });
  });

  describe('selectPaymentMethod()', () => {
    it('should not do anything if the same payment method is already selected', () => {
      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);

      service.selectPaymentMethod(mockPaymentDetails);

      expect(savedCardsService.markCardAsSelected).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should add global message when new payment method selected', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'paymentMethods.paymentMethodSelected' },
        GlobalMessageType.MSG_TYPE_INFO
      );
    });

    it('should update selected payment method', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        mockPaymentDetails
      );
    });

    it('should call markCardAsSelected on savedCardsService', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect(savedCardsService.markCardAsSelected).toHaveBeenCalled();
    });

    it('should call savePaymentMethod with payment details', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        mockPaymentDetails
      );
    });
  });

  describe('savePaymentMethod()', () => {
    it('should set busy to true before saving', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));

      const busySpy = jasmine.createSpy('busy');
      (service as any).busy$.subscribe(busySpy);

      (service as any).savePaymentMethod(mockPaymentDetails);

      expect(busySpy).toHaveBeenCalledWith(true);
    });

    it('should set busy to false on success', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(of(undefined));

      (service as any).savePaymentMethod(mockPaymentDetails);

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should set busy to false on error', () => {
      checkoutPaymentFacade.setPaymentDetails.and.returnValue(
        new (require('rxjs').Observable)((observer: any) =>
          observer.error(new Error('error'))
        )
      );

      (service as any).savePaymentMethod(mockPaymentDetails);

      expect((service as any).busy$.getValue()).toBeFalsy();
    });
  });

  describe('setPaymentDetails()', () => {
    it('should set paymentDetails property', () => {
      checkoutPaymentFacade.createPaymentDetails.and.returnValue(of(undefined));

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(service.paymentDetails).toEqual(mockPaymentDetails);
    });

    it('should use provided billingAddress', () => {
      checkoutPaymentFacade.createPaymentDetails.and.returnValue(of(undefined));
      const billingAddress: Address = { firstName: 'Jane', line1: '456 St' };

      service.setPaymentDetails({
        paymentDetails: mockPaymentDetails,
        billingAddress,
      });

      expect(checkoutPaymentFacade.createPaymentDetails).toHaveBeenCalledWith(
        jasmine.objectContaining({ billingAddress })
      );
    });

    it('should fallback to deliveryAddress when billingAddress is not provided', () => {
      checkoutPaymentFacade.createPaymentDetails.and.returnValue(of(undefined));
      (service as any).deliveryAddress = mockAddress;

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(checkoutPaymentFacade.createPaymentDetails).toHaveBeenCalledWith(
        jasmine.objectContaining({ billingAddress: mockAddress })
      );
    });

    it('should set busy to true while creating payment details', () => {
      checkoutPaymentFacade.createPaymentDetails.and.returnValue(of(undefined));

      const busySpy = jasmine.createSpy('busy');
      (service as any).busy$.subscribe(busySpy);

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(busySpy).toHaveBeenCalledWith(true);
    });

    it('should call next() on complete', () => {
      checkoutPaymentFacade.createPaymentDetails.and.returnValue(of(undefined));
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(
        of({ guid: 'order-1' })
      );

      const nextSpy = spyOn(service, 'next').and.callThrough();

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(nextSpy).toHaveBeenCalled();
    });

    it('should call onError() on error', () => {
      checkoutPaymentFacade.createPaymentDetails.and.returnValue(
        new (require('rxjs').Observable)((observer: any) =>
          observer.error(new Error('error'))
        )
      );
      const onErrorSpy = spyOn(service as any, 'onError').and.callThrough();

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(onErrorSpy).toHaveBeenCalled();
    });
  });

  describe('next()', () => {
    it('should call placePaymentAuthorizedOrder', () => {
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(
        of({ guid: 'order-1' })
      );

      service.next();

      expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
        true
      );
    });

    it('should navigate to orderConfirmation on success', () => {
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(
        of({ guid: 'order-1' })
      );

      service.next();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });

    it('should set busy to false after successful order placement', () => {
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(
        of({ guid: 'order-1' })
      );

      service.next();

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should set busy to false on error', () => {
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(
        new (require('rxjs').Observable)((observer: any) =>
          observer.error(new Error('error'))
        )
      );

      service.next();

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should not navigate when order is falsy', () => {
      orderFacade.placePaymentAuthorizedOrder.and.returnValue(of(null));

      service.next();

      expect(routingService.go).not.toHaveBeenCalled();
    });
  });

  describe('back()', () => {
    it('should call checkoutStepService.back with activatedRoute', () => {
      const activatedRoute = TestBed.inject(ActivatedRoute);

      service.back();

      expect(checkoutStepService.back).toHaveBeenCalledWith(activatedRoute);
    });
  });

  describe('onSuccess()', () => {
    it('should set busy to false', () => {
      (service as any).busy$.next(true);

      (service as any).onSuccess();

      expect((service as any).busy$.getValue()).toBeFalsy();
    });
  });

  describe('onError()', () => {
    it('should set busy to false', () => {
      (service as any).busy$.next(true);

      (service as any).onError();

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should clear selected payment method', () => {
      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);

      (service as any).onError();

      expect(
        (service as any).selectedPaymentMethod$.getValue()
      ).toBeUndefined();
    });
  });

  describe('focusCardAfterSelecting()', () => {
    it('should not throw when activeElement is null', () => {
      (windowRef.document as any).activeElement = null;

      expect(() => service.focusCardAfterSelecting()).not.toThrow();
    });

    it('should find and focus selected card after update completes', (done) => {
      const mockCard = document.createElement('cx-card');
      const mockFocusable = document.createElement('button');

      (windowRef.document as any).querySelectorAll = jasmine
        .createSpy()
        .and.returnValue([mockCard]);
      (windowRef.document as any).activeElement = {
        closest: jasmine.createSpy('closest').and.returnValue(mockCard),
      };

      focusService.findFirstFocusable.and.returnValue(mockFocusable);
      spyOn(mockFocusable, 'focus');

      service.focusCardAfterSelecting();

      (service as any).busy$.next(false);

      setTimeout(() => {
        expect(focusService.findFirstFocusable).toHaveBeenCalled();
        done();
      }, 50);
    });
  });

  describe('destroy()', () => {
    it('should unsubscribe from all subscriptions', () => {
      const unsubscribeSpy = spyOn(
        (service as any).subscriptions,
        'unsubscribe'
      );

      service.destroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
