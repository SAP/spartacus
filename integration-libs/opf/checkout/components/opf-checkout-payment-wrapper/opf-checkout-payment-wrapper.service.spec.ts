import { TestBed } from '@angular/core/testing';
import { ActiveCartService } from '@spartacus/cart/base/core';
import {
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import {
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentMethodType,
  OpfService,
} from '@spartacus/opf/base/root';
import { OpfResourceLoaderService } from '@spartacus/opf/checkout/core';
import {
  OpfCheckoutFacade,
  OpfRenderPaymentMethodEvent,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';
import { of, throwError } from 'rxjs';

describe('OpfCheckoutPaymentWrapperService', () => {
  let service: OpfCheckoutPaymentWrapperService;
  let opfCheckoutService: jasmine.SpyObj<OpfCheckoutFacade>;
  let opfOtpService: jasmine.SpyObj<OpfOtpFacade>;
  let opfResourceLoaderService: jasmine.SpyObj<OpfResourceLoaderService>;
  let userIdService: jasmine.SpyObj<UserIdService>;
  let activeCartService: jasmine.SpyObj<ActiveCartService>;
  let routingService: jasmine.SpyObj<RoutingService>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let opfOrderFacade: jasmine.SpyObj<OpfOrderFacade>;
  let opfService: jasmine.SpyObj<OpfService>;
  let winRef: jasmine.SpyObj<WindowRef>;

  beforeEach(() => {
    opfCheckoutService = jasmine.createSpyObj('OpfCheckoutFacade', [
      'initiatePayment',
    ]);
    opfOtpService = jasmine.createSpyObj('OpfOtpFacade', ['generateOtpKey']);
    opfResourceLoaderService = jasmine.createSpyObj('OpfResourceLoaderService', [
      'loadProviderResources',
    ]);
    userIdService = jasmine.createSpyObj('UserIdService', ['getUserId']);
    activeCartService = jasmine.createSpyObj('ActiveCartService', [
      'getActiveCartId',
    ]);
    routingService = jasmine.createSpyObj('RoutingService', [
      'getFullUrl',
    ]);
    globalMessageService = jasmine.createSpyObj('GlobalMessageService', ['add']);
    opfOrderFacade = jasmine.createSpyObj('OpfOrderFacade', ['placeOpfOrder']);
    opfService = jasmine.createSpyObj('OpfService', ['updateOpfMetadataState']);
    winRef = jasmine.createSpyObj('WindowRef', []);

    TestBed.configureTestingModule({
      providers: [
        OpfCheckoutPaymentWrapperService,
        { provide: OpfCheckoutFacade, useValue: opfCheckoutService },
        { provide: OpfOtpFacade, useValue: opfOtpService },
        { provide: OpfResourceLoaderService, useValue: opfResourceLoaderService },
        { provide: UserIdService, useValue: userIdService },
        { provide: ActiveCartService, useValue: activeCartService },
        { provide: RoutingService, useValue: routingService },
        { provide: GlobalMessageService, useValue: globalMessageService },
        { provide: OpfOrderFacade, useValue: opfOrderFacade },
        { provide: OpfService, useValue: opfService },
        { provide: WindowRef, useValue: winRef },
      ],
    });

    service = TestBed.inject(OpfCheckoutPaymentWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initiatePayment', () => {
    const paymentOptionId = 123;
    const userId = 'user123';
    const cartId = 'cart123';
    const otpKey = 'otp123';
    const paymentSessionData: PaymentSessionData = { /* mock payment session data */ };
    const error = new Error('Error');

    beforeEach(() => {
      userIdService.getUserId.and.returnValue(userId);
      activeCartService.getActiveCartId.and.returnValue(cartId);
      opfOtpService.generateOtpKey.and.returnValue(of({ value: otpKey }));
      opfCheckoutService.initiatePayment.and.returnValue(of(paymentSessionData));
    });

    it('should initiate payment and render payment gateway', () => {
      service.initiatePayment(paymentOptionId).subscribe();

      expect(opfCheckoutService.initiatePayment).toHaveBeenCalledWith({
        otpKey,
        config: {
          configurationId: String(paymentOptionId),
          cartId,
          resultURL: jasmine.any(String),
          cancelURL: jasmine.any(String),
        },
      });
      expect(service.renderPaymentGateway).toHaveBeenCalledWith(paymentSessionData);
    });

    it('should handle error when initiating payment', () => {
      opfCheckoutService.initiatePayment.and.returnValue(throwError(error));

      service.initiatePayment(paymentOptionId).subscribe(
        () => {},
        (err) => {
          expect(err).toBe(error);
        }
      );
    });
  });

  describe('reloadPaymentMode', () => {
    const paymentOptionId = 123;

    beforeEach(() => {
      service['lastPaymentOptionId'] = paymentOptionId;
    });

    it('should call initiatePayment with the last payment option id', () => {
      spyOn(service, 'initiatePayment');

      service.reloadPaymentMode();

      expect(service.initiatePayment).toHaveBeenCalledWith(paymentOptionId);
    });
  });

  describe('renderPaymentGateway', () => {
    const paymentSessionData: PaymentSessionData = { /* mock payment session data */ };

    it('should render payment gateway for destination type', () => {
      const data = 'destination-url';
      const renderPaymentMethodEvent: OpfRenderPaymentMethodEvent = {
        isLoading: false,
        isError: false,
        renderType: OpfPaymentMethodType.DESTINATION,
        data,
      };

      service.renderPaymentGateway({ ...paymentSessionData, destination: { url: data } });

      service.getRenderPaymentMethodEvent().subscribe((result) => {
        expect(result).toEqual(renderPaymentMethodEvent);
      });
    });

    it('should render payment gateway for dynamic script type', () => {
      const html = '<script>console.log("Dynamic script");</script>';
      const renderPaymentMethodEvent: OpfRenderPaymentMethodEvent = {
        isLoading: false,
        isError: false,
        renderType: OpfPaymentMethodType.DYNAMIC_SCRIPT,
        data: html,
      };

      service.renderPaymentGateway({ ...paymentSessionData, dynamicScript: { html } });

      service.getRenderPaymentMethodEvent().subscribe((result) => {
        expect(result).toEqual(renderPaymentMethodEvent);
      });
    });

    it('should execute script from HTML', () => {
      const html = '<script>console.log("Dynamic script");</script>';

      service.renderPaymentGateway({ ...paymentSessionData, dynamicScript: { html } });

      expect(opfResourceLoaderService.executeScriptFromHtml).toHaveBeenCalledWith(html);
    });
  });
});