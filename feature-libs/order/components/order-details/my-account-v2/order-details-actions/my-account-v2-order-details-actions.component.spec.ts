import { Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  EventService,
  I18nModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, EMPTY, of } from 'rxjs';
import { OrderDetailsService } from '../../order-details.service';
import { MyAccountV2OrderDetailsActionsComponent } from './my-account-v2-order-details-actions.component';

const mockOrder1 = {
  returnable: true,
  cancellable: true,
};
const mockOrder2 = {
  returnable: false,
  cancellable: false,
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
class MockOrderDetailsService {
  getOrderDetails() {}
}

@Component({
  template: '',
  selector: 'cx-order-details-actions',
})
class MockOrderDetailActionsComponent {}

describe('MyAccountV2OrderDetailsActionsComponent', () => {
  let component: MyAccountV2OrderDetailsActionsComponent;
  let fixture: ComponentFixture<MyAccountV2OrderDetailsActionsComponent>;
  let el: DebugElement;
  let event: EventService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nModule],
        providers: [
          { provide: TranslationService, useClass: MockTranslationService },
          { provide: OrderDetailsService, useClass: MockOrderDetailsService },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
        declarations: [
          MyAccountV2OrderDetailsActionsComponent,
          MockUrlPipe,
          MockOrderDetailActionsComponent,
        ],
      }).compileComponents();
      event = TestBed.inject(EventService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2OrderDetailsActionsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Cancel and Return buttons & show View All and Download Invoices Button', () => {
    component.order$ = of(mockOrder1);
    fixture.detectChanges();
    expect(el.query(By.css('.cx-order-details-actions'))).toBeTruthy();
    const elements = fixture.debugElement.queryAll(By.css('button'));
    expect(elements.length).toEqual(4);
  });
  it('should not show Cancel and Return button & show View All and Download Invoices Button', () => {
    component.order$ = of(mockOrder2);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('button'));
    expect(elements.length).toEqual(2);
  });

  it('should trigger download invoices event', () => {
    spyOn(component, 'showDialog').and.callThrough();
    spyOn(event, 'dispatch');
    component.order$ = of(mockOrder1);
    fixture.detectChanges();
    let download_button = fixture.debugElement.nativeElement.querySelector(
      '#download-invoices-btn'
    );
    download_button.click(mockOrder1);
    expect(component.showDialog).toHaveBeenCalledWith(mockOrder1);
    expect(event.dispatch).toHaveBeenCalled();
  });
});
