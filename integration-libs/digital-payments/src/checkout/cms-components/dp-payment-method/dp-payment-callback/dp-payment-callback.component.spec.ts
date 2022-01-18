import { DpPaymentRequest } from './../../../models/dp-checkout.model';
import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';
import { DpCheckoutPaymentService } from './../../../facade/dp-checkout-payment.service';
import {
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  PaymentDetails,
} from '@spartacus/core';
import {
  ActivatedRoute,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DpPaymentCallbackComponent } from './dp-payment-callback.component';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';

class MockDpCheckoutPaymentService
  implements Partial<DpCheckoutPaymentService>
{
  createPaymentDetails(): Observable<PaymentDetails> {
    return of({});
  }
}

class MockDpLocalStorageService implements Partial<DpLocalStorageService> {
  readCardRegistrationState(): DpPaymentRequest {
    return {};
  }
}

const mockActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    }),
  },
};

const emptyActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({}),
  },
};

const mockSessionId = 'mockSesionId';
const mockSignature = 'mockSignature';

const mockPaymentDetails: PaymentDetails = {
  id: 'mockId',
  cardNumber: '***********1234',
};

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('DpPaymentCallbackComponent with success query param', () => {
  let component: DpPaymentCallbackComponent;
  let fixture: ComponentFixture<DpPaymentCallbackComponent>;
  let dpPaymentService: DpCheckoutPaymentService;
  let dpStorageService: DpLocalStorageService;
  let msgService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), StoreModule.forRoot({})],
      declarations: [
        DpPaymentCallbackComponent,
        MockTranslatePipe,
        MockSpinnerComponent,
      ],
      providers: [
        {
          provide: DpPaymentCallbackComponent,
          useClass: DpPaymentCallbackComponent,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: DpCheckoutPaymentService,
          useClass: MockDpCheckoutPaymentService,
        },
        {
          provide: DpLocalStorageService,
          useClass: MockDpLocalStorageService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageService,
        },
      ],
    }).compileComponents();

    dpPaymentService = TestBed.inject(DpCheckoutPaymentService);
    dpStorageService = TestBed.inject(DpLocalStorageService);
    msgService = TestBed.inject(GlobalMessageService);

    spyOn(msgService, 'add').and.stub();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.closeCallback, 'emit').and.callThrough();
    spyOn(component.paymentDetailsAdded, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should fetch payment details', () => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(
        of(mockPaymentDetails)
      );

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature
      );
    });

    it('should show payment fetch error when empty payment details', () => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(of({}));

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature
      );
      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.error.paymentFetch' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
    });

    it('should show unknown error when empty payment request', () => {
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue({});

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.error.unknown' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
    });
    it('should show no error when correct payment details', () => {
      const mockDpPaymentRequest: DpPaymentRequest = {
        sessionId: mockSessionId,
        signature: mockSignature,
      };
      spyOn(dpStorageService, 'readCardRegistrationState').and.returnValue(
        mockDpPaymentRequest
      );
      spyOn(dpPaymentService, 'createPaymentDetails').and.returnValue(
        of(mockPaymentDetails)
      );

      component.ngOnInit();

      expect(dpStorageService.readCardRegistrationState).toHaveBeenCalled();
      expect(dpPaymentService.createPaymentDetails).toHaveBeenCalledWith(
        mockSessionId,
        mockSignature
      );
      expect(component.paymentDetailsAdded.emit).toHaveBeenCalledWith(
        mockPaymentDetails
      );
    });
  });
});

describe('DpPaymentCallbackComponent without query param', () => {
  let component: DpPaymentCallbackComponent;
  let fixture: ComponentFixture<DpPaymentCallbackComponent>;
  let msgService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), StoreModule.forRoot({})],
      declarations: [
        DpPaymentCallbackComponent,
        MockTranslatePipe,
        MockSpinnerComponent,
      ],
      providers: [
        {
          provide: DpPaymentCallbackComponent,
          useClass: DpPaymentCallbackComponent,
        },
        {
          provide: ActivatedRoute,
          useValue: emptyActivatedRoute,
        },
        {
          provide: DpCheckoutPaymentService,
          useClass: MockDpCheckoutPaymentService,
        },
        {
          provide: DpLocalStorageService,
          useClass: MockDpLocalStorageService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageService,
        },
      ],
    }).compileComponents();

    msgService = TestBed.inject(GlobalMessageService);

    spyOn(msgService, 'add').and.stub();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should show cancelled or failed error when cancelled', async () => {
      spyOn(component.closeCallback, 'emit').and.callThrough();

      component.ngOnInit();

      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.cancelledOrFailed' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
      expect(component.closeCallback.emit).toHaveBeenCalled();
    });
  });
});
