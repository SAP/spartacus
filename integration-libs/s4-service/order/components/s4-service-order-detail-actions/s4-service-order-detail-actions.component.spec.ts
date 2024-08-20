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
import { By } from '@angular/platform-browser';
import { Order } from '@spartacus/order/root';

const mockOrder1 = {
  serviceCancellable: true,
  status: 'PENDING',
};
const mockOrder2 = {
  serviceCancellable: false,
  status: 'CANCELLED',
};
const mockOrder3 = {
  serviceCancellable: false,
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
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
      declarations: [
        S4ServiceOrderDetailActionsComponent,
        MockUrlPipe,
        MockOrderDetailActionsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(S4ServiceOrderDetailActionsComponent);
    globalMessageService = TestBed.inject(GlobalMessageService);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.order$ = of(order);
    fixture.detectChanges();
    spyOn(globalMessageService, 'add').and.callThrough();
  };

  describe('serviceCancellable', () => {
    beforeEach(() => {
      beforeEachFn(mockOrder1);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should show Cancel button when service is serviceCancellable', () => {
      fixture.detectChanges();
      expect(el.query(By.css('.cx-order-details-actions'))).toBeTruthy();
      const elements = el.queryAll(By.css('#cancel-service-btn'));
      expect(elements.length).toEqual(1);
    });
  });


  describe('serviceNotCancellable', () => {
    beforeEach(() => {
      beforeEachFn(mockOrder2);
    });

    it('should not  display action buttons when service is cancelled', () => {
      fixture.detectChanges();
      const btnRow = el.query(By.css('.cx-order-details-actions.row'));
      expect(btnRow).toBeFalsy();
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
      const btnRow = el.query(By.css('.cx-order-details-actions.row'));

      expect(btnRow.nativeElement).toBeTruthy();
    });
  });
});
