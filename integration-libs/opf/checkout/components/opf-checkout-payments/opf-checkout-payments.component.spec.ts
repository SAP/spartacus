import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  MockTranslatePipe,
  PaginationModel,
  QueryState,
  Translatable,
  TranslatePipe,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import {
  OpfActiveConfiguration,
  OpfActiveConfigurationsResponse,
  OpfBaseFacade,
  OpfConfig,
  OpfMetadataModel,
  OpfMetadataStoreService,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OpfCheckoutBillingAddressFormService } from '../opf-checkout-billing-address-form';
import { OpfCheckoutPaymentWrapperComponent } from '../opf-checkout-payment-wrapper';
import { OpfCheckoutTermsAndConditionsAlertModule } from '../opf-checkout-terms-and-conditions-alert';
import { OpfCheckoutPaymentsComponent } from './opf-checkout-payments.component';
import { SAVED_CARDS_ID } from '@spartacus/opf/tokenisation/core';

@Component({
  template: '',
  selector: 'cx-pagination',
  imports: [I18nTestingModule, OpfCheckoutTermsAndConditionsAlertModule],
})
class MockPaginationComponent {
  @Input() pagination: PaginationModel;
  @Output() viewPageEvent = new EventEmitter<string>();
}

@Component({
  template: '',
  selector: 'cx-opf-checkout-payment-wrapper',
  imports: [I18nTestingModule, OpfCheckoutTermsAndConditionsAlertModule],
})
class MockOpfCheckoutPaymentWrapperComponent {}

const mockActiveConfigurations: OpfActiveConfiguration[] = [
  {
    id: 1,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test1',
  },
  {
    id: 2,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test2',
    logoUrl: 'logoUrl',
  },
  {
    id: 3,
    providerType: OpfPaymentProviderType.PAYMENT_METHOD,
    displayName: 'Test3',
  },
];
class MockOpfBaseFacade implements Partial<OpfBaseFacade> {
  getActiveConfigurationsState(): Observable<
    QueryState<OpfActiveConfigurationsResponse | undefined>
  > {
    return activeConfigurationsState$.asObservable();
  }
}

let activeConfigurationsState$ = new BehaviorSubject<
  QueryState<OpfActiveConfigurationsResponse | undefined>
>({
  loading: false,
  error: false,
  data: {
    value: [],
  },
});

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

class MockUserPaymentService implements Partial<UserPaymentService> {
  loadPaymentMethods(): void {}
  getPaymentMethods(): Observable<any[]> {
    return of([]);
  }
}

class MockCheckoutPaymentFacade implements Partial<CheckoutPaymentFacade> {
  deletePaymentDetails(): Observable<unknown> {
    return of({});
  }
}

const mockOpfMetadata: OpfMetadataModel = {
  isPaymentInProgress: true,
  selectedPaymentOptionId: 111,
  termsAndConditionsChecked: true,
  defaultSelectedPaymentOptionId: 1,
  opfPaymentSessionId: '111111',
  isTermsAndConditionsAlertClosed: false,
};

describe('OpfCheckoutPaymentsComponent', () => {
  let component: OpfCheckoutPaymentsComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentsComponent>;
  let globalMessageService: GlobalMessageService;
  let opfMetadataStoreServiceMock: jasmine.SpyObj<OpfMetadataStoreService>;
  let el: DebugElement;
  let mockBillingAddressFormService: Partial<OpfCheckoutBillingAddressFormService>;

  beforeEach(async () => {
    opfMetadataStoreServiceMock = jasmine.createSpyObj(
      'OpfMetadataStoreService',
      ['getOpfMetadataState', 'updateOpfMetadata']
    );

    opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      of(mockOpfMetadata)
    );
    mockBillingAddressFormService = {
      paymentOptionsDisabled$: of(false),
    };

    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        OpfCheckoutTermsAndConditionsAlertModule,
        OpfCheckoutPaymentsComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: OpfBaseFacade,
          useClass: MockOpfBaseFacade,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: OpfMetadataStoreService,
          useValue: opfMetadataStoreServiceMock,
        },
        {
          provide: OpfCheckoutBillingAddressFormService,
          useValue: mockBillingAddressFormService,
        },
        {
          provide: UserPaymentService,
          useClass: MockUserPaymentService,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentFacade,
        },
      ],
    })
      .overrideComponent(OpfCheckoutPaymentsComponent, {
        remove: {
          imports: [
            OpfCheckoutPaymentWrapperComponent,
            PaginationComponent,
            TranslatePipe,
          ],
        },
        add: {
          imports: [
            MockOpfCheckoutPaymentWrapperComponent,
            MockPaginationComponent,
            MockTranslatePipe,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutPaymentsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });
  beforeEach(() => {
    globalMessageService = TestBed.inject(GlobalMessageService);
    spyOn(globalMessageService, 'add').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preselect the payment options', () => {
    fixture.detectChanges();
    expect(component.selectedPaymentId).toBe(
      mockOpfMetadata.selectedPaymentOptionId
    );
  });

  it('should change active payment option', () => {
    component.changePayment(mockActiveConfigurations[2]);
    expect(opfMetadataStoreServiceMock.updateOpfMetadata).toHaveBeenCalledWith({
      selectedPaymentOptionId: component.selectedPaymentId,
    });
  });

  it('should display an error message if active configurations are not available', () => {
    activeConfigurationsState$.next({
      loading: false,
      error: false,
      data: {
        value: [],
      },
    });

    fixture.detectChanges();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'opfCheckout.errors.noActiveConfigurations' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should display an error message if getting Active Configurations State fails', () => {
    activeConfigurationsState$.next({
      error: new Error('Request failed'),
      loading: false,
      data: {
        value: undefined,
      },
    });

    fixture.detectChanges();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'opfCheckout.errors.loadActiveConfigurations' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should preselect the default payment option', () => {
    const defaultSelectedPaymentOptionId = 1;

    opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
      of({
        isPaymentInProgress: false,
        selectedPaymentOptionId: undefined,
        termsAndConditionsChecked: true,
        defaultSelectedPaymentOptionId,
        opfPaymentSessionId: '111111',
        isTermsAndConditionsAlertClosed: false,
      })
    );

    fixture.detectChanges();

    expect(component.selectedPaymentId).toBe(defaultSelectedPaymentOptionId);
  });

  it('should render payment provider logo', () => {
    activeConfigurationsState$.next({
      loading: false,
      error: false,
      data: {
        value: mockActiveConfigurations,
      },
    });

    fixture.detectChanges();

    mockActiveConfigurations.forEach((configuration) => {
      const logoElement = el.query(
        By.css(
          'label[for=paymentId-' + configuration.id + ']  .cx-payment-logo'
        )
      );

      if (configuration?.logoUrl) {
        expect(logoElement).toBeTruthy();
        expect(logoElement.nativeElement.attributes['alt'].value).toBe(
          configuration.displayName
        );
        expect(logoElement.nativeElement.attributes['src'].value).toBe(
          configuration.logoUrl
        );
      } else {
        expect(logoElement).toBeFalsy();
      }
    });
  });

  it('should render pagination component', () => {
    activeConfigurationsState$ = new BehaviorSubject<
      QueryState<OpfActiveConfigurationsResponse | undefined>
    >({
      loading: false,
      error: false,
      data: {
        value: mockActiveConfigurations,
        page: {
          size: 1,
          totalPages: mockActiveConfigurations.length,
          totalElements: mockActiveConfigurations.length,
          number: 1,
        },
      },
    });

    fixture.detectChanges();

    const paginationElement = el.query(
      By.css('.cx-payment-options-list-pagination')
    );

    expect(paginationElement).toBeTruthy();
  });

  describe('onSavedCardsSelected', () => {
    it('should set selectedPaymentId to SAVED_CARDS_ID', () => {
      component.onSavedCardsSelected();
      expect(component.selectedPaymentId).toBe(SAVED_CARDS_ID);
    });

    it('should update opf metadata with SAVED_CARDS_ID', () => {
      component.onSavedCardsSelected();
      expect(
        opfMetadataStoreServiceMock.updateOpfMetadata
      ).toHaveBeenCalledWith({
        selectedPaymentOptionId: SAVED_CARDS_ID,
      });
    });

    it('should call emitOutletContext', () => {
      spyOn<any>(component, 'emitOutletContext');
      component.onSavedCardsSelected();
      expect(component['emitOutletContext']).toHaveBeenCalled();
    });
  });

  describe('emitOutletContext', () => {
    it('should emit outlet context with savedCardsSelected callback', (done) => {
      component.selectedPaymentId = 1;
      component['outletContext$'].subscribe((context) => {
        expect(context).toBeTruthy();
        expect(context.selectedPaymentId).toBe(1);
        expect(context.savedCardsId).toBe(SAVED_CARDS_ID);
        expect(typeof context.savedCardsSelected).toBe('function');
        done();
      });
      component['emitOutletContext']();
    });

    it('should include showSavedCardsList flag when saved cards are selected', (done) => {
      component.selectedPaymentId = SAVED_CARDS_ID;
      component['outletContext$'].subscribe((context) => {
        expect(context.showSavedCardsList).toBe(true);
        done();
      });
      component['emitOutletContext']();
    });

    it('should exclude showSavedCardsList when other payment is selected', (done) => {
      component.selectedPaymentId = 1;
      component['outletContext$'].subscribe((context) => {
        expect(context.showSavedCardsList).toBe(false);
        done();
      });
      component['emitOutletContext']();
    });

    it('should include disabled flag based on explicit terms and conditions', (done) => {
      component.disabled = true;
      component.explicitTermsAndConditions = true;
      component['outletContext$'].subscribe((context) => {
        expect(context.disabled).toBe(true);
        done();
      });
      component['emitOutletContext']();
    });
  });

  describe('pageChange', () => {
    it('should update pagination index', () => {
      component.pageChange(2);
      expect(component['paginationIndex']).toBe(2);
    });

    it('should call updateActiveConfiguration', () => {
      spyOn(component, 'updateActiveConfiguration');
      component.pageChange(1);
      expect(component.updateActiveConfiguration).toHaveBeenCalled();
    });
  });

  describe('getPaginationModel', () => {
    it('should calculate pagination model from page data', () => {
      const paginationModel = component.getPaginationModel({
        size: 10,
        totalPages: 5,
        totalElements: 50,
        number: 2,
      });

      expect(paginationModel.pageSize).toBe(10);
      expect(paginationModel.totalPages).toBe(5);
      expect(paginationModel.totalResults).toBe(50);
      expect(paginationModel.currentPage).toBe(1); // 0-indexed
    });

    it('should update pagination index when page number is provided', () => {
      component.getPaginationModel({
        size: 10,
        totalPages: 5,
        totalElements: 50,
        number: 3,
      });

      expect(component['paginationIndex']).toBe(2); // 0-indexed
    });
  });

  describe('checkIfOnlyOnePaymentOptionAvailable', () => {
    it('should return true when only one payment option available', () => {
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: [mockActiveConfigurations[0]],
          page: {
            totalPages: 1,
          },
        },
      };

      const result = component['checkIfOnlyOnePaymentOptionAvailable'](state);
      expect(result).toBe(true);
    });

    it('should return false when multiple payment options available', () => {
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: mockActiveConfigurations,
          page: {
            totalPages: 2,
          },
        },
      };

      const result = component['checkIfOnlyOnePaymentOptionAvailable'](state);
      expect(result).toBe(false);
    });

    it('should return false when no payment options available', () => {
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: [],
        },
      };

      const result = component['checkIfOnlyOnePaymentOptionAvailable'](state);
      expect(result).toBe(false);
    });
  });

  describe('handleDefaultPaymentOptionInputSelection', () => {
    it('should set selectedPaymentId when only one option available', () => {
      component.isOnlyOnePaymentOptionAvailable = true;
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: [mockActiveConfigurations[0]],
        },
      };

      component['handleDefaultPaymentOptionInputSelection'](state);

      expect(component.selectedPaymentId).toBe(mockActiveConfigurations[0].id);
    });

    it('should emit selectedPaymentProviderName when only one option available', () => {
      spyOn(component.selectedPaymentProviderName, 'emit');
      component.isOnlyOnePaymentOptionAvailable = true;
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: [mockActiveConfigurations[1]],
        },
      };

      component['handleDefaultPaymentOptionInputSelection'](state);

      expect(component.selectedPaymentProviderName.emit).toHaveBeenCalledWith(
        mockActiveConfigurations[1].displayName
      );
    });

    it('should update metadata with default selected payment option id', () => {
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: [mockActiveConfigurations[0]],
        },
      };

      component['handleDefaultPaymentOptionInputSelection'](state);

      expect(
        opfMetadataStoreServiceMock.updateOpfMetadata
      ).toHaveBeenCalledWith({
        defaultSelectedPaymentOptionId: mockActiveConfigurations[0].id,
      });
    });

    it('should force select default payment when flag is set', () => {
      component.forceDefaultPaymentOptionInputSelection = true;
      component.selectedPaymentId = undefined;
      const state: QueryState<OpfActiveConfigurationsResponse | undefined> = {
        loading: false,
        error: false,
        data: {
          value: mockActiveConfigurations,
        },
      };

      component['handleDefaultPaymentOptionInputSelection'](state);

      expect(component.selectedPaymentId).toBe(mockActiveConfigurations[0].id);
    });
  });

  describe('getPaymentInfoMessage', () => {
    let translationService: any;

    beforeEach(() => {
      translationService = TestBed.inject(TranslationService);
    });

    it('should return default message when paymentId is undefined', (done) => {
      component.getPaymentInfoMessage(undefined).subscribe((message) => {
        expect(message).toBeTruthy();
        done();
      });
    });

    it('should return mapped message when found in config', (done) => {
      spyOn(translationService, 'translate').and.returnValue(
        of('Custom message')
      );
      const opfConfig = TestBed.inject(OpfConfig);
      (opfConfig as any).opf = {
        paymentOption: {
          paymentInfoMessagesMap: {
            1: 'customMessageKey',
          },
        },
      };

      component.getPaymentInfoMessage(1).subscribe((message) => {
        expect(message).toBeTruthy();
        done();
      });
    });
  });

  describe('isPaymentInfoMessageVisible', () => {
    it('should return false when enableInfoMessage is not set', () => {
      const opfConfig = TestBed.inject(OpfConfig);
      (opfConfig as any).opf = {};

      expect(component.isPaymentInfoMessageVisible).toBe(false);
    });

    it('should return false when isPaymentInfoMessageEnabled is false', () => {
      component.isPaymentInfoMessageEnabled = false;
      const opfConfig = TestBed.inject(OpfConfig);
      (opfConfig as any).opf = {
        paymentOption: {
          enableInfoMessage: true,
        },
      };

      expect(component.isPaymentInfoMessageVisible).toBe(false);
    });

    it('should return true when both flags are enabled', () => {
      component.isPaymentInfoMessageEnabled = true;
      const opfConfig = TestBed.inject(OpfConfig);
      (opfConfig as any).opf = {
        paymentOption: {
          enableInfoMessage: true,
        },
      };

      expect(component.isPaymentInfoMessageVisible).toBe(true);
    });
  });

  describe('preselectPaymentOption with terms and conditions', () => {
    it('should clear selection when terms not checked and explicit required', () => {
      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of({
          isPaymentInProgress: false,
          selectedPaymentOptionId: 111,
          termsAndConditionsChecked: false,
          defaultSelectedPaymentOptionId: 1,
          opfPaymentSessionId: '111111',
          isTermsAndConditionsAlertClosed: false,
        })
      );

      component.explicitTermsAndConditions = true;

      fixture.detectChanges();

      expect(component.selectedPaymentId).toBeUndefined();
    });

    it('should preselect when terms not required', () => {
      opfMetadataStoreServiceMock.getOpfMetadataState.and.returnValue(
        of({
          isPaymentInProgress: false,
          selectedPaymentOptionId: 111,
          termsAndConditionsChecked: false,
          defaultSelectedPaymentOptionId: 1,
          opfPaymentSessionId: '111111',
          isTermsAndConditionsAlertClosed: false,
        })
      );

      component.explicitTermsAndConditions = false;

      fixture.detectChanges();

      expect(component.selectedPaymentId).toBe(111);
    });
  });

  describe('outlet context savedCardsSelected callback', () => {
    it('should call onSavedCardsSelected when invoking savedCardsSelected callback', (done) => {
      spyOn(component, 'onSavedCardsSelected');
      component['outletContext$'].subscribe((context) => {
        if (typeof context.savedCardsSelected === 'function') {
          context.savedCardsSelected();
          expect(component.onSavedCardsSelected).toHaveBeenCalled();
          done();
        }
      });
      component['emitOutletContext']();
    });
  });
});
