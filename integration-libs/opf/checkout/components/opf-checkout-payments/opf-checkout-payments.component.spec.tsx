import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  QueryState,
  Translatable,
} from '@spartacus/core';
import { OpfPaymentMetadata, OpfService } from '@spartacus/opf/base/root';
import {
  ActiveConfiguration,
  OpfCheckoutFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/checkout/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OpfCheckoutPaymentsComponent } from './opf-checkout-payments.component';

const mockActiveConfigurations: ActiveConfiguration[] = [
  {
    id: 1,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test1',
  },
  {
    id: 2,
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Test2',
  },
  {
    id: 3,
    providerType: OpfPaymentProviderType.PAYMENT_METHOD,
    displayName: 'Test3',
  },
];
class MockOpfCheckoutFacade implements Partial<OpfCheckoutFacade> {
  getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  > {
    return activeConfigurationsState$.asObservable();
  }
}

const activeConfigurationsState$ = new BehaviorSubject<
  QueryState<ActiveConfiguration[] | undefined>
>({
  loading: false,
  error: false,
  data: [],
});

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

const mockOpfPaymentMetadata: OpfPaymentMetadata = {
  isPaymentInProgress: true,
  selectedPaymentOptionId: 111,
  termsAndConditionsChecked: true,
};

describe('OpfCheckoutPaymentsComponent', () => {
  let component: OpfCheckoutPaymentsComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentsComponent>;
  let globalMessageService: GlobalMessageService;
  let opfServiceMock: jasmine.SpyObj<OpfService>;

  beforeEach(async () => {
    opfServiceMock = jasmine.createSpyObj('OpfService', [
      'getOpfMetadataState',
      'updateOpfMetadataState',
    ]);

    opfServiceMock.getOpfMetadataState.and.returnValue(
      of(mockOpfPaymentMetadata)
    );
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [OpfCheckoutPaymentsComponent],
      providers: [
        { provide: OpfCheckoutFacade, useClass: MockOpfCheckoutFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: OpfService, useValue: opfServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutPaymentsComponent);
    component = fixture.componentInstance;
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
      mockOpfPaymentMetadata.selectedPaymentOptionId
    );
  });

  it('should change active payment option', () => {
    component.changePayment(mockActiveConfigurations[2]);
    expect(opfServiceMock.updateOpfMetadataState).toHaveBeenCalledWith({
      selectedPaymentOptionId: component.selectedPaymentId,
    });
  });

  it('should display an error message if active configurations are not available', () => {
    activeConfigurationsState$.next({
      loading: false,
      error: false,
      data: [],
    });

    fixture.detectChanges();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'opf.checkout.errors.noActiveConfigurations' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should display an error message if getting Active Configurations State fails', () => {
    activeConfigurationsState$.next({
      error: new Error('Request failed'),
      loading: false,
      data: undefined,
    });

    fixture.detectChanges();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'opf.checkout.errors.loadActiveConfigurations' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
