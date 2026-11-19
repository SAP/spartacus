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
import { vi } from 'vitest';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import {
  SAVED_CARDS_ID,
  OpfTokenisationSavedCardsService,
} from '@spartacus/opf/tokenisation/root';
import { OpfTokenisationPaymentMethodService } from './opf-tokenisation-payment-method.service';

describe('OpfTokenisationPaymentMethodService', () => {
  let service: OpfTokenisationPaymentMethodService;
  let userPaymentService: any;
  let checkoutPaymentFacade: any;
  let opfMetadataStoreService: any;
  let savedCardsService: any;
  let orderFacade: any;
  let routingService: any;
  let checkoutStepService: any;
  let globalMessageService: any;
  let activeCartFacade: any;
  let translationService: any;
  let checkoutDeliveryAddressFacade: any;
  let focusService: any;
  let windowRef: any;
  let metadataStateSubject: BehaviorSubject<any>;

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
    userPaymentService = {
      loadPaymentMethods: vi.fn(),
      getPaymentMethods: vi.fn(),
      getPaymentMethodsLoading: vi.fn(),
      setPaymentMethodAsDefault: vi.fn(),
    };
    checkoutPaymentFacade = {
      getPaymentDetailsState: vi.fn(),
      setPaymentDetails: vi.fn(),
      createPaymentDetails: vi.fn(),
    };
    opfMetadataStoreService = { getOpfMetadataState: vi.fn() };
    savedCardsService = {
      markCardAsSelected: vi.fn(),
      clearSelectedPaymentMethodId: vi.fn(),
    };
    orderFacade = { placePaymentAuthorizedOrder: vi.fn() };
    routingService = { go: vi.fn() };
    checkoutStepService = { back: vi.fn() };
    globalMessageService = { add: vi.fn() };
    activeCartFacade = { isGuestCart: vi.fn() };
    translationService = { translate: vi.fn() };
    checkoutDeliveryAddressFacade = { getDeliveryAddressState: vi.fn() };
    focusService = { findFirstFocusable: vi.fn() };

    const mockDocument = {
      querySelectorAll: vi.fn().mockReturnValue([]),
      activeElement: null,
    };
    windowRef = { document: mockDocument };

    metadataStateSubject = new BehaviorSubject<any>(
      mockMetadataStateSavedCards
    );

    savedCardsService = {
      markCardAsSelected: vi.fn(),
      clearSelectedPaymentMethodId: vi.fn(),
      selectedPaymentMethodId$: new BehaviorSubject<string | undefined>(
        undefined
      ),
    };

    // Default mock returns
    userPaymentService.getPaymentMethods.mockReturnValue(of([]));
    userPaymentService.getPaymentMethodsLoading.mockReturnValue(of(false));
    checkoutPaymentFacade.getPaymentDetailsState.mockReturnValue(
      of({ loading: false, error: false, data: undefined })
    );
    opfMetadataStoreService.getOpfMetadataState.mockReturnValue(
      metadataStateSubject.asObservable()
    );
    checkoutDeliveryAddressFacade.getDeliveryAddressState.mockReturnValue(
      of({ loading: false, error: false, data: mockAddress })
    );
    activeCartFacade.isGuestCart.mockReturnValue(of(false));
    translationService.translate.mockImplementation((key: string) => of(key));
    orderFacade.placePaymentAuthorizedOrder.mockReturnValue(of(null));

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
    it('should emit true when selectedPaymentOptionId is SAVED_CARDS_ID', async () => {
      metadataStateSubject.next({
        selectedPaymentOptionId: SAVED_CARDS_ID,
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });

      service.showSavedCards$.subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });
  });

  describe('isUpdating$', () => {
    it('should emit true when busy$ is true', async () => {
      (service as any).busy$.next(true);
      service.isUpdating$.subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });

    it('should emit false when all loading states are false', async () => {
      service.isUpdating$.subscribe((value) => {
        expect(value).toBeFalsy();
      });
    });
  });

  describe('existingPaymentMethods$', () => {
    it('should return payment methods from userPaymentService', async () => {
      const mockMethods: PaymentDetails[] = [mockPaymentDetails];
      userPaymentService.getPaymentMethods.mockReturnValue(of(mockMethods));

      service.existingPaymentMethods$.subscribe((methods) => {
        expect(methods).toEqual(mockMethods);
      });
    });

    it('should return empty array when no payment methods', async () => {
      userPaymentService.getPaymentMethods.mockReturnValue(of([]));

      service.existingPaymentMethods$.subscribe((methods) => {
        expect(methods).toEqual([]);
      });
    });
  });

  describe('selectedMethod$', () => {
    it('should initially emit undefined', async () => {
      service.selectedMethod$.subscribe((method) => {
        expect(method).toBeUndefined();
      });
    });

    it('should emit updated value after selection', async () => {
      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);

      service.selectedMethod$.subscribe((method) => {
        expect(method).toEqual(mockPaymentDetails);
      });
    });
  });

  describe('initialize()', () => {
    it('should set isGuestCheckout to true when guest cart', () => {
      activeCartFacade.isGuestCart.mockReturnValue(of(true));

      service.initialize();

      expect(service.isGuestCheckout).toBeTruthy();
    });

    it('should set deliveryAddress from checkoutDeliveryAddressFacade', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState.mockReturnValue(
        of({ loading: false, error: false, data: mockAddress })
      );

      service.initialize();

      expect((service as any).deliveryAddress).toEqual(mockAddress);
    });

    it('should not set deliveryAddress while state is loading', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState.mockReturnValue(
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
      opfMetadataStoreService.getOpfMetadataState.mockReturnValue(
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
      expect(
        savedCardsService.clearSelectedPaymentMethodId
      ).not.toHaveBeenCalled();
    });

    it('should not clear selected payment method when staying on saved cards', () => {
      const metadataSubject = new BehaviorSubject<any>({
        selectedPaymentOptionId: SAVED_CARDS_ID,
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });
      opfMetadataStoreService.getOpfMetadataState.mockReturnValue(
        metadataSubject.asObservable()
      );

      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);
      service.initialize();

      metadataSubject.next({ selectedPaymentOptionId: SAVED_CARDS_ID });

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        mockPaymentDetails
      );
    });

    it('should auto-select first saved card when backend marks it as default', () => {
      const firstSavedCard: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'first-card',
        defaultPayment: true,
      };
      userPaymentService.getPaymentMethods.mockReturnValue(
        of([firstSavedCard])
      );
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.initialize();

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        firstSavedCard
      );
      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        firstSavedCard
      );
    });

    it('should reflect backend default card selection in checkout saved cards state', () => {
      const nonDefaultCard: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'card-1',
        defaultPayment: false,
      };
      const backendDefaultCard: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'card-2',
        defaultPayment: true,
      };
      userPaymentService.getPaymentMethods.mockReturnValue(
        of([nonDefaultCard, backendDefaultCard])
      );
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.initialize();

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        backendDefaultCard
      );
      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        backendDefaultCard
      );
    });

    it('should auto-set and select the only saved card when no default exists yet', () => {
      const firstAndOnlyCard: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'only-card',
        defaultPayment: false,
      };
      userPaymentService.getPaymentMethods.mockReturnValue(
        of([firstAndOnlyCard])
      );
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.initialize();

      expect(userPaymentService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
        'only-card'
      );
      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        firstAndOnlyCard
      );
      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        firstAndOnlyCard
      );
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });

    it('should restore persisted selected card when toggling back to saved cards', () => {
      const cardOne: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'card-1',
        defaultPayment: false,
      };
      const cardTwo: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'card-2',
        defaultPayment: false,
      };

      userPaymentService.getPaymentMethods.mockReturnValue(
        of([cardOne, cardTwo])
      );
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      (
        savedCardsService.selectedPaymentMethodId$ as BehaviorSubject<
          string | undefined
        >
      ).next('card-2');
      (service as any).selectedPaymentMethod$.next(cardTwo);

      service.initialize();

      metadataStateSubject.next({
        selectedPaymentOptionId: 'other-option',
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });

      metadataStateSubject.next({
        selectedPaymentOptionId: SAVED_CARDS_ID,
        termsAndConditionsChecked: false,
        isPaymentInProgress: false,
        opfPaymentSessionId: undefined,
        isTermsAndConditionsAlertClosed: false,
      });

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        cardTwo
      );
      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        cardTwo
      );
    });
  });

  describe('getCards$()', () => {
    it('should return empty array when no payment methods', async () => {
      userPaymentService.getPaymentMethods.mockReturnValue(of([]));

      service.getCards$().subscribe((cards) => {
        expect(cards).toEqual([]);
      });
    });

    it('should return cards mapped from payment methods', async () => {
      userPaymentService.getPaymentMethods.mockReturnValue(
        of([mockPaymentDetails])
      );
      translationService.translate.mockImplementation((key: string) => of(key));
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(of(null));

      service.getCards$().subscribe((cards) => {
        expect(cards.length).toBe(1);
        expect(cards[0].paymentMethod).toEqual(mockPaymentDetails);
        expect(cards[0].content).toBeDefined();
      });
    });

    it('should mark selected card with selected header', async () => {
      userPaymentService.getPaymentMethods.mockReturnValue(
        of([mockPaymentDetails])
      );
      (service as any).selectedPaymentMethod$.next(mockPaymentDetails);
      translationService.translate.mockImplementation((key: string) => of(key));
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(of(null));

      service.getCards$().subscribe((cards) => {
        expect(cards[0].content.header).toBe('paymentCard.selected');
      });
    });

    it('should show action button for unselected cards', async () => {
      userPaymentService.getPaymentMethods.mockReturnValue(
        of([mockPaymentDetails])
      );
      (service as any).selectedPaymentMethod$.next(undefined);

      service.getCards$().subscribe((cards) => {
        expect(cards[0].content.actions?.length).toBeGreaterThan(0);
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

    it('should not include setAsDefault action for an expired card', () => {
      const expiredPayment: PaymentDetails = {
        ...mockPaymentDetails,
        expiryMonth: '01',
        expiryYear: '2020',
        defaultPayment: false,
      };
      vi.spyOn(service, 'isCardExpired').mockReturnValue(true);

      const card = (service as any).createCard(
        expiredPayment,
        {
          textExpires: 'Expires 01/2020',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
          textSetAsDefault: 'Set as default',
          textDefaultLabelOnCheckout: 'Default',
        },
        undefined
      );

      expect(card.actions?.map((a: any) => a.event)).not.toContain('default');
    });

    it('should not include useThisCard action for an expired card', () => {
      const expiredPayment: PaymentDetails = {
        ...mockPaymentDetails,
        expiryMonth: '01',
        expiryYear: '2020',
        defaultPayment: false,
      };
      vi.spyOn(service, 'isCardExpired').mockReturnValue(true);

      const card = (service as any).createCard(
        expiredPayment,
        {
          textExpires: 'Expires 01/2020',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
          textSetAsDefault: 'Set as default',
          textDefaultLabelOnCheckout: 'Default',
        },
        undefined
      );

      expect(card.actions?.map((a: any) => a.event)).not.toContain('send');
    });

    it('should include both actions for a non-expired, non-selected, non-default card', () => {
      vi.spyOn(service, 'isCardExpired').mockReturnValue(false);

      const card = (service as any).createCard(
        { ...mockPaymentDetails, defaultPayment: false },
        {
          textExpires: 'Expires 12/2028',
          textUseThisPayment: 'Use this',
          textSelected: 'Selected',
          textSetAsDefault: 'Set as default',
          textDefaultLabelOnCheckout: 'Default',
        },
        undefined
      );

      const events = card.actions?.map((a: any) => a.event);
      expect(events).toContain('default');
      expect(events).toContain('send');
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
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'paymentMethods.paymentMethodSelected' },
        GlobalMessageType.MSG_TYPE_INFO
      );
    });

    it('should update selected payment method', () => {
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        mockPaymentDetails
      );
    });

    it('should call markCardAsSelected on savedCardsService with payment id', () => {
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect(savedCardsService.markCardAsSelected).toHaveBeenCalledWith(
        mockPaymentDetails.id
      );
    });

    it('should call savePaymentMethod with payment details', () => {
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.selectPaymentMethod(mockPaymentDetails);

      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        mockPaymentDetails
      );
    });
  });

  describe('selectDefaultPaymentMethod()', () => {
    it('should set single non-expired saved card as default when none is flagged as default', () => {
      const singleCardWithoutDefault: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'single-card',
        defaultPayment: false,
      };

      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      service.selectDefaultPaymentMethod([singleCardWithoutDefault], undefined);

      expect(userPaymentService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
        'single-card'
      );
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect((service as any).selectedPaymentMethod$.getValue()).toEqual(
        singleCardWithoutDefault
      );
      expect(checkoutPaymentFacade.setPaymentDetails).toHaveBeenCalledWith(
        singleCardWithoutDefault
      );
    });

    it('should not auto-set default when multiple cards exist and none is flagged as default', () => {
      const firstCard: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'card-1',
        defaultPayment: false,
      };
      const secondCard: PaymentDetails = {
        ...mockPaymentDetails,
        id: 'card-2',
        defaultPayment: false,
      };

      service.selectDefaultPaymentMethod([firstCard, secondCard], undefined);

      expect(
        userPaymentService.setPaymentMethodAsDefault
      ).not.toHaveBeenCalled();
      expect(checkoutPaymentFacade.setPaymentDetails).not.toHaveBeenCalled();
      expect(
        (service as any).selectedPaymentMethod$.getValue()
      ).toBeUndefined();
    });
  });

  describe('setDefaultPaymentMethod()', () => {
    it('should show confirmation message when set by user action', () => {
      service.setDefaultPaymentMethod(mockPaymentDetails);

      expect(userPaymentService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
        mockPaymentDetails.id
      );
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'paymentMessages.setAsDefaultSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should not show confirmation message when notify is false', () => {
      service.setDefaultPaymentMethod(mockPaymentDetails, false);

      expect(userPaymentService.setPaymentMethodAsDefault).toHaveBeenCalledWith(
        mockPaymentDetails.id
      );
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });

  describe('savePaymentMethod()', () => {
    it('should set busy to true before saving', () => {
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      const busySpy = vi.fn();
      (service as any).busy$.subscribe(busySpy);

      (service as any).savePaymentMethod(mockPaymentDetails);

      expect(busySpy).toHaveBeenCalledWith(true);
    });

    it('should set busy to false on success', () => {
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(of(undefined));

      (service as any).savePaymentMethod(mockPaymentDetails);

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should set busy to false on error', () => {
      checkoutPaymentFacade.setPaymentDetails.mockReturnValue(
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
      checkoutPaymentFacade.createPaymentDetails.mockReturnValue(of(undefined));

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(service.paymentDetails).toEqual(mockPaymentDetails);
    });

    it('should use provided billingAddress', () => {
      checkoutPaymentFacade.createPaymentDetails.mockReturnValue(of(undefined));
      const billingAddress: Address = { firstName: 'Jane', line1: '456 St' };

      service.setPaymentDetails({
        paymentDetails: mockPaymentDetails,
        billingAddress,
      });

      expect(checkoutPaymentFacade.createPaymentDetails).toHaveBeenCalledWith(
        expect.objectContaining({ billingAddress })
      );
    });

    it('should fallback to deliveryAddress when billingAddress is not provided', () => {
      checkoutPaymentFacade.createPaymentDetails.mockReturnValue(of(undefined));
      (service as any).deliveryAddress = mockAddress;

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(checkoutPaymentFacade.createPaymentDetails).toHaveBeenCalledWith(
        expect.objectContaining({ billingAddress: mockAddress })
      );
    });

    it('should set busy to true while creating payment details', () => {
      checkoutPaymentFacade.createPaymentDetails.mockReturnValue(of(undefined));

      const busySpy = vi.fn();
      (service as any).busy$.subscribe(busySpy);

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(busySpy).toHaveBeenCalledWith(true);
    });

    it('should call next() on complete', () => {
      checkoutPaymentFacade.createPaymentDetails.mockReturnValue(of(undefined));
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(
        of({ guid: 'order-1' })
      );

      const nextSpy = vi.spyOn(service, 'next');

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(nextSpy).toHaveBeenCalled();
    });

    it('should call onError() on error', () => {
      checkoutPaymentFacade.createPaymentDetails.mockReturnValue(
        new (require('rxjs').Observable)((observer: any) =>
          observer.error(new Error('error'))
        )
      );
      const onErrorSpy = vi.spyOn(service as any, 'onError');

      service.setPaymentDetails({ paymentDetails: mockPaymentDetails });

      expect(onErrorSpy).toHaveBeenCalled();
    });
  });

  describe('next()', () => {
    it('should call placePaymentAuthorizedOrder', () => {
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(
        of({ guid: 'order-1' })
      );

      service.next();

      expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
        true
      );
    });

    it('should navigate to orderConfirmation on success', () => {
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(
        of({ guid: 'order-1' })
      );

      service.next();

      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });

    it('should set busy to false after successful order placement', () => {
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(
        of({ guid: 'order-1' })
      );

      service.next();

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should set busy to false on error', () => {
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(
        new (require('rxjs').Observable)((observer: any) =>
          observer.error(new Error('error'))
        )
      );

      service.next();

      expect((service as any).busy$.getValue()).toBeFalsy();
    });

    it('should not navigate when order is falsy', () => {
      orderFacade.placePaymentAuthorizedOrder.mockReturnValue(of(null));

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

    it('should find and focus selected card after update completes', async () => {
      const mockCard = document.createElement('cx-card');
      const mockFocusable = document.createElement('button');
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
        (cb: FrameRequestCallback) => {
          cb(0);
          return 0;
        }
      );

      (windowRef.document as any).querySelectorAll = vi
        .fn()
        .mockReturnValue([mockCard]);
      (windowRef.document as any).activeElement = {
        closest: vi.fn().mockReturnValue(mockCard),
      };

      focusService.findFirstFocusable.mockReturnValue(mockFocusable);
      vi.spyOn(mockFocusable, 'focus');

      service.focusCardAfterSelecting();

      (service as any).busy$.next(false);

      expect(focusService.findFirstFocusable).toHaveBeenCalledWith(mockCard);
      expect(mockFocusable.focus).toHaveBeenCalled();
    });
  });

  describe('destroy()', () => {
    it('should unsubscribe from all subscriptions', () => {
      const unsubscribeSpy = vi.spyOn(
        (service as any).subscriptions,
        'unsubscribe'
      );

      service.destroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
