import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
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
  let mockService: jasmine.SpyObj<OpfCheckoutPaymentWrapperService>;
  let mockGlobalFunctionsService: jasmine.SpyObj<OpfGlobalFunctionsService>;
  let mockPaymentEventsService: jasmine.SpyObj<OpfPaymentEventsService>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockCurrencyService: jasmine.SpyObj<CurrencyService>;
  let mockActiveCartService: jasmine.SpyObj<ActiveCartFacade>;
  let mockOpfConfig: OpfConfig;
  let domSanitizer: DomSanitizer;

  // Subjects for testing language and currency changes
  let languageSubject: Subject<string>;
  let currencySubject: Subject<string>;
  let cartStableSubject: Subject<boolean>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('OpfCheckoutPaymentWrapperService', [
      'getRenderPaymentMethodEvent',
      'initiatePayment',
      'reloadPaymentMode',
    ]);

    // Setup default return value for initiatePayment
    mockService.initiatePayment.and.returnValue(
      of({
        paymentSessionId: 'test-session',
        pattern: OpfPaymentRenderPattern.HOSTED_FIELDS,
      })
    );

    mockGlobalFunctionsService = jasmine.createSpyObj(
      'OpfGlobalFunctionsFacade',
      ['registerGlobalFunctions', 'unregisterGlobalFunctions']
    );

    mockPaymentEventsService = jasmine.createSpyObj(
      'OpfPaymentEventsService',
      ['emitReinitiatePaymentEvent'],
      {
        reinitiatePaymentEvent$: of(123),
      }
    );

    // Create subjects for testing
    languageSubject = new Subject<string>();
    currencySubject = new Subject<string>();
    cartStableSubject = new Subject<boolean>();

    mockLanguageService = jasmine.createSpyObj('LanguageService', [
      'getActive',
    ]);
    mockCurrencyService = jasmine.createSpyObj('CurrencyService', [
      'getActive',
    ]);
    mockActiveCartService = jasmine.createSpyObj('ActiveCartFacade', [
      'isStable',
    ]);

    // Setup default return values
    mockLanguageService.getActive.and.returnValue(
      languageSubject.asObservable()
    );
    mockCurrencyService.getActive.and.returnValue(
      currencySubject.asObservable()
    );
    mockActiveCartService.isStable.and.returnValue(
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
    mockPaymentEventsService.emitReinitiatePaymentEvent.calls.reset();

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
    mockPaymentEventsService.emitReinitiatePaymentEvent.calls.reset();

    // Simulate currency change
    currencySubject.next('EUR');
    cartStableSubject.next(true);

    expect(
      mockPaymentEventsService.emitReinitiatePaymentEvent
    ).toHaveBeenCalledWith(456);
  });

  it('should bypassSecurityTrustHtml call bypassSecurityTrustHtml', () => {
    const html = '<script>console.log("script");</script>';
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
    component.bypassSecurityTrustHtml(html);

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
  });

  it('should bypassSecurityTrustResourceUrl call bypassSecurityTrustResourceUrl', () => {
    const url = 'https://sap.com';
    spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').and.stub();
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

    mockService.initiatePayment.and.returnValue(of(mockPaymentSessionData));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    const globalFunctionsInput: OpfRegisterGlobalFunctionsInput = {
      domain: OpfGlobalFunctionsDomain.CHECKOUT,
      paymentSessionId: mockPaymentSessionData.paymentSessionId,
    };

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).toHaveBeenCalledWith(jasmine.objectContaining(globalFunctionsInput));
  });

  it('should call unregisterGlobalFunctions if paymentSessionData is not HOSTED_FIELDS', () => {
    const mockPaymentSessionData = {
      paymentSessionId: 'session123',
      pattern: OpfPaymentRenderPattern.FULL_PAGE,
    };

    mockService.initiatePayment.and.returnValue(of(mockPaymentSessionData));

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
    mockService.initiatePayment.and.returnValue(of(undefined));

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
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
    component.bypassSecurityTrustHtml(null as any);

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(null);
  });

  it('should handle bypassSecurityTrustHtml with empty string', () => {
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.stub();
    component.bypassSecurityTrustHtml('');

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
  });

  it('should handle bypassSecurityTrustResourceUrl with null input', () => {
    spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').and.stub();
    component.bypassSecurityTrustResourceUrl(null as any);

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      null
    );
  });

  it('should handle bypassSecurityTrustResourceUrl with empty string', () => {
    spyOn(domSanitizer, 'bypassSecurityTrustResourceUrl').and.stub();
    component.bypassSecurityTrustResourceUrl('');

    expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      ''
    );
  });

  it('should handle ngOnInit with undefined selectedPaymentId', () => {
    mockService.initiatePayment.and.returnValue(of(null));
    component.selectedPaymentId = undefined as any;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(undefined);
  });

  it('should handle null paymentSessionData', () => {
    mockService.initiatePayment.and.returnValue(of(null));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).not.toHaveBeenCalled();
  });

  it('should handle undefined paymentSessionData', () => {
    mockService.initiatePayment.and.returnValue(of(undefined));

    component.selectedPaymentId = 123;
    component.ngOnInit();

    expect(mockService.initiatePayment).toHaveBeenCalledWith(123);
    expect(
      mockGlobalFunctionsService.registerGlobalFunctions
    ).not.toHaveBeenCalled();
  });

  describe('submitFormToIframe', () => {
    let mockFormElement: jasmine.SpyObj<HTMLFormElement>;

    beforeEach(() => {
      mockFormElement = jasmine.createSpyObj('HTMLFormElement', ['submit']);
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

      mockService.getRenderPaymentMethodEvent.and.returnValue(
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
  });
});
