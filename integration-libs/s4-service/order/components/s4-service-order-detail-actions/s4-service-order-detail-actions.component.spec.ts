import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4ServiceOrderDetailActionsComponent } from './s4-service-order-detail-actions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nModule,
  RoutingService,
  Translatable,
  TranslationService,
} from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/root';
import { By } from '@angular/platform-browser';
import { Order } from '@spartacus/order/root';

const mockOrder1 = {
  serviceCancellable: true,
  serviceReschedulable: true,
  status: 'PENDING',
  servicedAt: '2021-08-10T10:00:00Z',
};
const mockOrder2 = {
  serviceCancellable: false,
  serviceReschedulable: false,
  status: 'CANCELLED',
  servicedAt: '2021-08-10T10:00:00Z',
};
const mockOrder3 = {
  serviceCancellable: false,
  serviceReschedulable: false,
  status: 'PENDING',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
class MockRoutingService {
  go() {}
}
class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}
class MockCheckoutServiceSchedulePickerService {
  getHoursFromServiceSchedule(_dateTime: string) {
    return 0;
  }
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
}

@Component({
  template: '',
  selector: 'cx-order-details-actions',
})
class MockOrderDetailActionsComponent {}

describe('S4ServiceOrderDetailActionsComponent', () => {
  let component: S4ServiceOrderDetailActionsComponent;
  let fixture: ComponentFixture<S4ServiceOrderDetailActionsComponent>;
  let el: DebugElement;
  let checkoutServiceSchedulePickerService: CheckoutServiceSchedulePickerService;
  let globalMessageService: GlobalMessageService;
  let beforeEachFn = (order: Order) => {
    class MockOrderDetailsService {
      getOrderDetails() {
        return of(order);
      }
    }

    TestBed.configureTestingModule({
      imports: [I18nModule, RouterTestingModule],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: CheckoutServiceSchedulePickerService,
          useClass: MockCheckoutServiceSchedulePickerService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
      declarations: [
        S4ServiceOrderDetailActionsComponent,
        MockUrlPipe,
        MockOrderDetailActionsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(S4ServiceOrderDetailActionsComponent);
    checkoutServiceSchedulePickerService = TestBed.inject(
      CheckoutServiceSchedulePickerService
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.order$ = of(order);
    fixture.detectChanges();
    spyOn(globalMessageService, 'add').and.callThrough();
  };

  describe('order serviceable', () => {
    beforeEach(() => {
      beforeEachFn(mockOrder1);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should show Cancel button when service is serviceCancellable', () => {
      component.displayActions$ = of(true);
      fixture.detectChanges();
      expect(el.query(By.css('.cx-order-details-actions'))).toBeTruthy();
      const elements = el.queryAll(By.css('#cancel-service-btn'));
      expect(elements.length).toEqual(1);
    });
    it('should show Reschedule button when service is reschedulable', () => {
      component.displayActions$ = of(true);
      fixture.detectChanges();
      expect(el.query(By.css('.cx-order-details-actions'))).toBeTruthy();
      const elements = el.queryAll(By.css('#reschedule-service-btn'));
      expect(elements.length).toEqual(1);
    });
    it('should display action buttons when time to service is more than 24 hours', () => {
      spyOn(
        checkoutServiceSchedulePickerService,
        'getHoursFromServiceSchedule'
      ).and.returnValue(40);
      fixture.detectChanges();
      component.displayActions$.subscribe((res) => {
        expect(res).toBe(true);
      });
    });
    it('should not display action buttons when time to service is within 24 hours', () => {
      spyOn(
        checkoutServiceSchedulePickerService,
        'getHoursFromServiceSchedule'
      ).and.returnValue(10);
      fixture.detectChanges();
      component.displayActions$.subscribe((res) => {
        expect(res).toBe(false);
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'rescheduleService.serviceNotAmendable' },
        GlobalMessageType.MSG_TYPE_INFO
      );
    });
  });

  describe('order not serviceable', () => {
    beforeEach(() => {
      beforeEachFn(mockOrder2);
    });

    it('should not show Reschedule button when service is not reschedulable', () => {
      component.displayActions$ = of(true);
      fixture.detectChanges();
      const elements = fixture.debugElement.queryAll(By.css('a'));
      expect(elements.length).toEqual(0);
    });

    it('should not display action buttons when service is cancelled', () => {
      fixture.detectChanges();
      component.displayActions$.subscribe((res) => {
        expect(res).toBe(false);
      });
    });
  });

  describe('displayActions', () => {
    beforeEach(() => {
      beforeEachFn(mockOrder3);
    });

    it('should not show Cancel button when service is not serviceCancellable', () => {
      fixture.detectChanges();
      const elements = el.queryAll(By.css('#cancel-service-btn'));
      expect(elements.length).toEqual(0);
    });

    it('should display action buttons row as a failsafe', () => {
      fixture.detectChanges();
      component.displayActions$.subscribe((res) => {
        expect(res).toBe(true);
      });
    });
  });
});
