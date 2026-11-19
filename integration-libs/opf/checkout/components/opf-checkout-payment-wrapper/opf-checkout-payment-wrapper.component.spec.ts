import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { vi } from 'vitest';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { OpfConfig } from '@spartacus/opf/base/root';
import { OpfGlobalFunctionsService } from '@spartacus/opf/global-functions/core';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
  OpfRegisterGlobalFunctionsInput,
} from '@spartacus/opf/global-functions/root';
import {
  OpfPaymentEventsService,
  OpfPaymentRenderPattern,
} from '@spartacus/opf/payment/root';
import { of, Subject } from 'rxjs';
import { OpfCheckoutPaymentWrapperComponent } from './opf-checkout-payment-wrapper.component';
import { OpfCheckoutPaymentWrapperService } from './opf-checkout-payment-wrapper.service';

describe('OpfCheckoutPaymentWrapperComponent', () => {
  let component: OpfCheckoutPaymentWrapperComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentWrapperComponent>;
  let mockService: any;
  let mockGlobalFunctionsService: any;
  let mockPaymentEventsService: any;
  let mockLanguageService: any;
  let mockCurrencyService: any;
  let mockActiveCartService: any;
  let mockOpfConfig: OpfConfig;
  let domSanitizer: DomSanitizer;

  // Subjects for testing language and currency changes
  let languageSubject: Subject<string>;
  let currencySubject: Subject<string>;
  let cartStableSubject: Subject<boolean>;

  beforeEach(() => {
    mockService = {
      getRenderPaymentMethodEvent: vi.fn(),
      initiatePayment: vi.fn(),
      reloadPaymentMode: vi.fn(),
      removePaymentProviderResources: vi.fn(),
    };

    // Setup default return value for initiatePayment
    mockService.initiatePayment.mockReturnValue(
      of({
        paymentSessionId: 'test-session',
        pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
      })
    );

    mockGlobalFunctionsService = {
      registerGlobalFunctions: vi.fn(),
      unregisterGlobalFunctions: vi.fn(),
    };

    mockPaymentEventsService = {
      emitReinitiatePaymentEvent: vi.fn(),
      reinitiatePaymentEvent$: new Subject<number>(),
    };

    // Create subjects for testing
    languageSubject = new Subject<string>();
    currencySubject = new Subject<string>();
    cartStableSubject = new Subject<boolean>();

    mockLanguageService = { getActive: vi.fn() };
    mockCurrencyService = { getActive: vi.fn() };
    mockActiveCartService = { isStable: vi.fn() };

    // Setup default return values
    mockLanguageService.getActive.mockReturnValue(
      languageSubject.asObservable()
    );
    mockCurrencyService.getActive.mockReturnValue(
      currencySubject.asObservable()
    );
    mockActiveCartService.isStable.mockReturnValue(
      cartStableSubject.asObservable()
    );

    mockOpfConfig = {
      opf: {
        paymentOption: {
          iframeSandboxMap: {
            458: 'allow-scripts',
            213: 'allow-scripts allow-same-origin',
          },
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [OpfCheckoutPaymentWrapperComponent],
      providers: [
        { provide: OpfCheckoutPaymentWrapperService, useValue: mockService },
        {
          provide: OpfGlobalFunctionsFacade,
          useValue: mockGlobalFunctionsService,
        },
        {
          provide: OpfPaymentEventsService,
          useValue: mockPaymentEventsService,
        },
        {
          provide: LanguageService,
          useValue: mockLanguageService,
        },
        {
          provide: CurrencyService,
          useValue: mockCurrencyService,
        },
        {
          provide: ActiveCartFacade,
          useValue: mockActiveCartService,
        },
        {
          provide: OpfConfig,
          useValue: mockOpfConfig,
        },
        {
          provide: ViewContainerRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutPaymentWrapperComponent);
    component = fixture.componentInstance;
    domSanitizer = TestBed.inject(DomSanitizer);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit reinitiate payment event when language changes', () => {
    component.selectedPaymentId = 123;
    component.ngOnInit();

    // Emit initial values
    languageSubject.next('en');
    currencySubject.next('USD');
    cartStableSubject.next(true);

    // Clear previous calls
    mockPaymentEventsService.emitReinitiatePaymentEvent.mockClear();

    // Simulate language change
    languageSubject.next('de');
    cartStableSubject.next(true);

    expect(
      mockPaymentEventsService.emitReinitiatePaymentEvent
    ).toHaveBeenCalledWith(123);
  });

  it('should emit reinitiate payment event when currency changes', () => {
    component.selectedPaymentId = 456;
    component.ngOnInit();

    // Emit initial values
    languageSubject.next('en');
    currencySubject.next('USD');
    cartStableSubject.next(true);

    // Clear previous calls
    mockPaymentEventsService.emitReinitiatePaymentEvent.mockClear();

    // Simulate currency change
    currencySubject.next('EUR');
    cartStableSubject.next(true);

    expect(
      mockPaymentEventsService.emitReinitiatePaymentEvent
    ).toHaveBeenCalledWith(456);
  });

  it('should bypassSecurityTrustHtml call bypassSecurityTrustHtml', () => {
    const html = '<script>console.log("script");</script>';
    vi.spyOn(domSanitizer, 'bypassSecurityTrustHtml').mockImplementation(
      () => {}
    );
    component.bypassSecurityTrustHtml(html);

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
  });

  it('should bypassSecurityTrustResourceUrl call bypassSecurityTrustResourceUrl', () => {
    const url = 'https://sap.com';
    vi.spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').mockImplementation(
      () => {}
    );
    component.bypassSecurityTrustResourceUrl(url);

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      url
    );
  });

  it('should call initiatePayment on ngOnInit', () => {
    const mockPaymentSessionData = {
      paymentSessionId: 'session123',
      pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
    };

    mockService.initiatePayment.mockReturnValue(of(mockPaymentSessionData));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    const globalFunctionsInput: OpfRegisterGlobalFunctionsInput = {
      domain: OpfGlobalFunctionsDomain.CHECKOUT,
      paymentSessionId: mockPaymentSessionData.paymentSessionId,
    };

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).toHaveBeenCalledWith(expect.objectContaining(globalFunctionsInput));
  });

  it('should call unregisterGlobalFunctions if paymentSessionData is not HOSTED_FIELDS', () => {
    const mockPaymentSessionData = {
      paymentSessionId: 'session123',
      pattern: OpfPaymentRenderPattern.FULL_PAGE,
    };

    mockService.initiatePayment.mockReturnValue(of(mockPaymentSessionData));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    expect(
      mockGlobalFunctionsService.unregisterGlobalFunctions
    ).toHaveBeenCalled();
  });

  it('should call reloadPaymentMode on retryInitiatePayment', () => {
    component.retryInitiatePayment();

    expect(mockService.reloadPaymentMode).toHaveBeenCalled();
  });

  it('should return true if paymentSessionData is HOSTED_FIELDS', () => {
    const mockPaymentSessionData = {
      paymentSessionId: 'session123',
      pattern: 'HOSTED_FIELDS',
    };

    const result = (component as any)?.isHostedFields(mockPaymentSessionData);

    expect(result).toBeTruthy();
  });

  it('should handle undefined paymentSessionData', () => {
    mockService.initiatePayment.mockReturnValue(of(undefined));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).not.toHaveBeenCalled();
  });

  it('should handle isHostedFields with case-insensitive pattern matching', () => {
    const mockPaymentSessionData1 = {
      paymentSessionId: 'session123',
      pattern: 'hosted_fields',
    };

    const mockPaymentSessionData2 = {
      paymentSessionId: 'session123',
      pattern: 'HOSTED_FIELDS',
    };

    const mockPaymentSessionData3 = {
      paymentSessionId: 'session123',
      pattern: 'Hosted_Fields',
    };

    const result1 = (component as any)?.isHostedFields(mockPaymentSessionData1);
    const result2 = (component as any)?.isHostedFields(mockPaymentSessionData2);
    const result3 = (component as any)?.isHostedFields(mockPaymentSessionData3);

    expect(result1).toBeFalsy(); // Should be case-sensitive
    expect(result2).toBeTruthy();
    expect(result3).toBeFalsy();
  });

  it('should handle bypassSecurityTrustHtml with null input', () => {
    vi.spyOn(domSanitizer, 'bypassSecurityTrustHtml').mockImplementation(
      () => {}
    );
    component.bypassSecurityTrustHtml(null as any);

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(null);
  });

  it('should handle bypassSecurityTrustHtml with empty string', () => {
    vi.spyOn(domSanitizer, 'bypassSecurityTrustHtml').mockImplementation(
      () => {}
    );
    component.bypassSecurityTrustHtml('');

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should handle bypassSecurityTrustResourceUrl with null input', () => {
    vi.spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').mockImplementation(
      () => {}
    );
    component.bypassSecurityTrustResourceUrl(null as any);

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      null
    );
  });

  it('should handle bypassSecurityTrustResourceUrl with empty string', () => {
    vi.spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').mockImplementation(
      () => {}
    );
    component.bypassSecurityTrustResourceUrl('');

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      ''
    );
  });

  it('should handle ngOnInit with undefined selectedPaymentId', () => {
    mockService.initiatePayment.mockReturnValue(of(null));
    component.selectedPaymentId = undefined as any;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(undefined);
  });

  it('should handle null paymentSessionData', () => {
    mockService.initiatePayment.mockReturnValue(of(null));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).not.toHaveBeenCalled();
  });

  it('should handle undefined paymentSessionData', () => {
    mockService.initiatePayment.mockReturnValue(of(undefined));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).not.toHaveBeenCalled();
  });

  describe('submitFormToIframe', () => {
    let mockFormElement: any;

    beforeEach(() => {
      mockFormElement = { submit: vi.fn() };
      component.formElement = {
        nativeElement: mockFormElement,
      } as ElementRef<HTMLFormElement>;
    });

    it('should submit form when payment data is ready and form targets iframe', () => {
      component['isPaymentDataReady'] = true;
      mockFormElement.target = 'cx-payment-iframe';

      component['submitFormToIframe']();

      expect(mockFormElement.submit).toHaveBeenCalled();
    });

    it('should not submit form when form element is not available', () => {
      component['isPaymentDataReady'] = true;
      component.formElement = null as any;

      component['submitFormToIframe']();

      expect(mockFormElement.submit).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unregister global functions and remove loaded payment resources', () => {
      component.ngOnDestroy();

      expect(
        mockGlobalFunctionsService.unregisterGlobalFunctions
      ).toHaveBeenCalledWith(OpfGlobalFunctionsDomain.CHECKOUT);
      expect(mockService.removePaymentProviderResources).toHaveBeenCalled();
    });
  });

  describe('getIframeSandbox', () => {
    it('should return different sandbox value for different payment option id', () => {
      const result = component.getIframeSandbox(213);
      expect(result).toBe('allow-scripts allow-same-origin');
    });

    it('should return undefined when payment option id is undefined', () => {
      const result = component.getIframeSandbox(undefined);
      expect(result).toBeUndefined();
    });

    it('should return undefined when iframeSandboxMap is empty', () => {
      mockOpfConfig.opf = {
        paymentOption: {
          iframeSandboxMap: {},
        },
      };
      fixture = TestBed.createComponent(OpfCheckoutPaymentWrapperComponent);
      component = fixture.componentInstance;

      const result = component.getIframeSandbox(458);
      expect(result).toBeUndefined();
    });

    it('should handle multiple payment option ids correctly', () => {
      mockOpfConfig.opf = {
        paymentOption: {
          iframeSandboxMap: {
            100: 'allow-scripts',
            200: 'allow-scripts allow-same-origin',
            300: 'allow-scripts allow-forms',
          },
        },
      };
      fixture = TestBed.createComponent(OpfCheckoutPaymentWrapperComponent);
      component = fixture.componentInstance;

      expect(component.getIframeSandbox(100)).toBe('allow-scripts');
      expect(component.getIframeSandbox(200)).toBe(
        'allow-scripts allow-same-origin'
      );
      expect(component.getIframeSandbox(300)).toBe('allow-scripts allow-forms');
      expect(component.getIframeSandbox(400)).toBeUndefined();
    });

    it('should render iframe without sandbox attribute when sandbox is undefined', () => {
      const renderPaymentMethodSubject = new Subject<any>();
      const selectedPaymentId = 123;

      mockService.getRenderPaymentMethodEvent.mockReturnValue(
        renderPaymentMethodSubject.asObservable()
      );
      mockOpfConfig.opf = {
        paymentOption: {
          iframeSandboxMap: {},
        },
      };

      fixture = TestBed.createComponent(OpfCheckoutPaymentWrapperComponent);
      component = fixture.componentInstance;
      component.selectedPaymentId = selectedPaymentId;
      fixture.detectChanges();

      renderPaymentMethodSubject.next({
        isLoading: false,
        isError: false,
        renderType: OpfPaymentRenderPattern.IFRAME,
        destination: { url: 'TEST_URL' },
        paymentOptionId: selectedPaymentId,
      });

      fixture.detectChanges();

      const iframe: HTMLIFrameElement =
        fixture.nativeElement.querySelector('.cx-payment-iframe');
      expect(iframe).toBeTruthy();
      expect(iframe?.hasAttribute('sandbox')).toBeFalsy();
    });

    it('should render iframe with sandbox attribute when sandbox is configured', () => {
      const renderPaymentMethodSubject = new Subject<any>();
      const selectedPaymentId = 458;

      mockService.getRenderPaymentMethodEvent.mockReturnValue(
        renderPaymentMethodSubject.asObservable()
      );

      fixture = TestBed.createComponent(OpfCheckoutPaymentWrapperComponent);
      component = fixture.componentInstance;
      component.selectedPaymentId = selectedPaymentId;
      fixture.detectChanges();

      renderPaymentMethodSubject.next({
        isLoading: false,
        isError: false,
        renderType: OpfPaymentRenderPattern.IFRAME,
        destination: { url: 'TEST_URL' },
        paymentOptionId: selectedPaymentId,
      });

      fixture.detectChanges();

      const iframe: HTMLIFrameElement =
        fixture.nativeElement.querySelector('.cx-payment-iframe');
      expect(iframe).toBeTruthy();
      expect(iframe?.getAttribute('sandbox')).toBe('allow-scripts');
    });
  });
});
