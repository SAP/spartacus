import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  OpfCheckoutFacade,
  ActiveConfiguration,
  OpfPaymentProviderType,
} from '@spartacus/opf/root';
import { Observable, of } from 'rxjs';
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
  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return of(mockActiveConfigurations);
  }
}

describe('OpfCheckoutPaymentsComponent', () => {
  let component: OpfCheckoutPaymentsComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpfCheckoutPaymentsComponent],
      providers: [
        { provide: OpfCheckoutFacade, useClass: MockOpfCheckoutFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set first objects id as selected / active', () => {
    expect(component.selectedPaymentId).toEqual(mockActiveConfigurations[0].id);
  });

  it('should change active payment option', () => {
    component.changePayment(mockActiveConfigurations[2]);
    expect(component.selectedPaymentId).toEqual(mockActiveConfigurations[2].id);
  });
});
