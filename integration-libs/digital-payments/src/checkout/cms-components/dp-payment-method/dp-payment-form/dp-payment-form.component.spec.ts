import { DpPaymentRequest } from './../../../models/dp-checkout.model';
import {
  DIGITAL_PAYMENTS_FEATURE,
  StateWithDigitalPayments,
} from '../../../store/digital-payments-state';
import {
  MockTranslatePipe,
  WindowRef,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpPaymentFormComponent } from './dp-payment-form.component';
import { Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../../store/reducers';
import { DpCheckoutPaymentService } from '../../../facade';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';

const postUrl = 'https://dummy.url';
const mockDpPaymentRequest: DpPaymentRequest = {
  url: postUrl,
  signature: 'ASDFGHJKE456789',
  sessionId: 'QWERTYUIOPASDFGHJKLZXCVBNM',
};

const mockWinRef: WindowRef = {
  nativeWindow: {
    location: { href: 'previous-url' },
  },
} as WindowRef;

class MockDpCheckoutPaymentService
  implements Partial<DpCheckoutPaymentService> {
  getCardRegistrationDetails(): Observable<DpPaymentRequest> {
    return of({});
  }
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('DpPaymentFormComponent', () => {
  let component: DpPaymentFormComponent;
  let fixture: ComponentFixture<DpPaymentFormComponent>;
  let store: Store<StateWithDigitalPayments>;
  let dpPaymentService: MockDpCheckoutPaymentService;
  let winRef: WindowRef;
  let msgService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DpPaymentFormComponent,
        MockTranslatePipe,
        MockSpinnerComponent,
      ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          DIGITAL_PAYMENTS_FEATURE,
          fromReducers.getReducers()
        ),
      ],
      providers: [
        {
          provide: DpCheckoutPaymentService,
          useClass: MockDpCheckoutPaymentService,
        },
        {
          provide: DpPaymentFormComponent,
          useClass: DpPaymentFormComponent,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageService,
        },
        { provide: WindowRef, useValue: mockWinRef },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    dpPaymentService = TestBed.inject(DpCheckoutPaymentService);
    winRef = TestBed.inject(WindowRef);
    msgService = TestBed.inject(GlobalMessageService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.closeForm, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should redirect to provider page', () => {
      spyOn(dpPaymentService, 'getCardRegistrationDetails').and.returnValue(
        of(mockDpPaymentRequest)
      );

      component.ngOnInit();

      expect(dpPaymentService.getCardRegistrationDetails).toHaveBeenCalled();
      expect(winRef.nativeWindow.location.href).toEqual(postUrl);
    });

    it('should throw error on empty response', () => {
      spyOn(dpPaymentService, 'getCardRegistrationDetails').and.returnValue(
        of({})
      );
      spyOn(msgService, 'add').and.stub();

      component.ngOnInit();

      expect(dpPaymentService.getCardRegistrationDetails).toHaveBeenCalled();
      expect(msgService.add).toHaveBeenCalledWith(
        { key: 'dpPaymentForm.error.redirect' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(component.closeForm.emit).toHaveBeenCalled();
    });
  });
});
