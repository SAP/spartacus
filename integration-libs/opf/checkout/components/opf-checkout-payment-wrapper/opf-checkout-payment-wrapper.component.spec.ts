import { ViewContainerRef, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGlobalFunctionsService } from '@spartacus/opf/global-functions/core';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
  OpfRegisterGlobalFunctionsInput,
} from '@spartacus/opf/global-functions/root';
import { OpfPaymentRenderPattern } from '@spartacus/opf/payment/root';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
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

    TestBed.configureTestingModule({
      declarations: [OpfCheckoutPaymentWrapperComponent],
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
});
