import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { CheckoutServiceDetailsComponent } from './checkout-service-details.component';
import {
  GlobalMessageService,
  I18nTestingModule,
  QueryState,
} from '@spartacus/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutServiceDetailsFacade,
  CheckoutServiceSchedulePickerService,
  ServiceDateTime,
} from '@spartacus/s4-service/root';
import { Observable, of, throwError } from 'rxjs';
import createSpy = jasmine.createSpy;
const mockScheduledAt = '2024-06-27T09:30:00-04:00';
class MockActivatedRoute implements Partial<ActivatedRoute> {}
class MockCheckoutStepService implements Partial<CheckoutStepService> {
  getBackBntText = createSpy().and.returnValue('common.back');
  next = createSpy().and.callThrough();
  back = createSpy().and.callThrough();
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.callThrough();
}
class MockCheckoutServiceDetailsFacade {
  getSelectedServiceDetailsState(): Observable<
    QueryState<ServiceDateTime | undefined>
  > {
    return of({ loading: false, error: false, data: mockScheduledAt });
  }

  getServiceProducts(): Observable<string[]> {
    return of(['product1', 'product2']);
  }

  setServiceScheduleSlot(_scheduledAt: ServiceDateTime) {
    return of({ success: true });
  }
}
class MockCheckoutServiceSchedulePickerService
  implements Partial<CheckoutServiceSchedulePickerService>
{
  getMinDateForService = createSpy().and.returnValue(of('2024-06-25'));
  getScheduledServiceTimes = createSpy().and.returnValue(
    of(['8:30', '9:30', '10:30'])
  );
  convertDateTimeToReadableString =
    createSpy().and.returnValue('27/06/2024, 9:30');
  getServiceDetailsFromDateTime = createSpy().and.returnValue({
    date: '27/06/2024',
    time: '09:30',
  });
  convertToDateTime = createSpy().and.returnValue('2024-06-27T09:30:00-04:00');
}
describe('CheckoutServiceDetailsComponent', () => {
  let component: CheckoutServiceDetailsComponent;
  let fixture: ComponentFixture<CheckoutServiceDetailsComponent>;
  let checkoutServiceDetailsFacade: CheckoutServiceDetailsFacade;
  let pickerService: CheckoutServiceSchedulePickerService;
  let checkoutStepService: CheckoutStepService;
  let messageService: GlobalMessageService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [I18nTestingModule, CheckoutServiceDetailsComponent],
    providers: [
        {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
        },
        {
            provide: CheckoutStepService,
            useClass: MockCheckoutStepService,
        },
        {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
        },
        {
            provide: CheckoutServiceDetailsFacade,
            useClass: MockCheckoutServiceDetailsFacade,
        },
        UntypedFormBuilder,
        {
            provide: CheckoutServiceSchedulePickerService,
            useClass: MockCheckoutServiceSchedulePickerService,
        },
    ],
}).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutServiceDetailsComponent);
    checkoutServiceDetailsFacade = TestBed.inject(CheckoutServiceDetailsFacade);
    pickerService = TestBed.inject(CheckoutServiceSchedulePickerService);
    checkoutStepService = TestBed.inject(CheckoutStepService);
    messageService = TestBed.inject(GlobalMessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit and set already selected date and time', () => {
    component.ngOnInit();
    expect(component.form?.get('scheduleDate')?.value).toEqual('27/06/2024');
    expect(component.form?.get('scheduleTime')?.value).toEqual('09:30');
    expect(pickerService.getServiceDetailsFromDateTime).toHaveBeenCalled();
  });
  it('should call ngOnInit and set minimum date and earliest time, if no value was previously selected', () => {
    component.minServiceDate$ = of('2030-12-12');
    component.selectedServiceDetails$ = of('');
    component.scheduleTimes$ = of(['13:13', '14:14', '15:15']);
    component.ngOnInit();
    expect(component.form?.get('scheduleDate')?.value).toEqual('2030-12-12');
    expect(component.form?.get('scheduleTime')?.value).toEqual('13:13');
  });
  it('should get back button text', () => {
    component.back();
    expect(checkoutStepService.getBackBntText).toHaveBeenCalled();
    expect(component.backBtnText).toEqual('common.back');
  });
  it('should set schedule time', () => {
    component.setScheduleTime({
      target: { value: '10:30' },
    } as unknown as Event);
    expect(component.form?.get('scheduleTime')?.value).toEqual('10:30');
  });
  it('should update service details when service products are available in cart', () => {
    spyOn(checkoutServiceDetailsFacade, 'getServiceProducts').and.returnValue(
      of(['123', '456'])
    );
    spyOn(
      checkoutServiceDetailsFacade,
      'setServiceScheduleSlot'
    ).and.callThrough();
    spyOn(
      checkoutServiceDetailsFacade,
      'getSelectedServiceDetailsState'
    ).and.callThrough();

    component.next();
    expect(
      checkoutServiceDetailsFacade.setServiceScheduleSlot
    ).toHaveBeenCalled();
    expect(checkoutStepService.next).toHaveBeenCalled();
  });
  it('should move to next step when no service products are available in cart', () => {
    spyOn(checkoutServiceDetailsFacade, 'getServiceProducts').and.returnValue(
      of([])
    );
    component.next();
    expect(checkoutStepService.next).toHaveBeenCalled();
  });
  it('should show error if any error throw', () => {
    spyOn(checkoutServiceDetailsFacade, 'getServiceProducts').and.returnValue(
      of(['3435'])
    );
    spyOn(
      checkoutServiceDetailsFacade,
      'setServiceScheduleSlot'
    ).and.returnValue(throwError('Throwing Error message'));
    component.next();
    expect(checkoutStepService.next).not.toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });
  it('should throw error if we pass inappropriate scheduledAt', () => {
    spyOn(
      checkoutServiceDetailsFacade,
      'setServiceScheduleSlot'
    ).and.returnValue(throwError('Throwing Error message'));
    (pickerService.convertToDateTime as jasmine.Spy).and.returnValue('');
    component.form = new UntypedFormBuilder().group({});
    component.next();
    expect(pickerService.convertToDateTime).toHaveBeenCalledWith('', '');
    expect(
      checkoutServiceDetailsFacade.setServiceScheduleSlot
    ).toHaveBeenCalledWith('');
    expect(messageService.add).toHaveBeenCalled();
  });
});
