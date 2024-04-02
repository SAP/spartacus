import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { ConsignmentTracking, OrderHistoryFacade } from '@spartacus/order/root';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { TrackingEventsComponent } from './tracking-events.component';

const shipDate = new Date('2019-02-11T13:05:12+0000');

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of(undefined);
  }

  closeDialog(_reason: string): void {}
}

describe('TrackingEventsComponent', () => {
  let component: TrackingEventsComponent;
  let fixture: ComponentFixture<TrackingEventsComponent>;
  let el: DebugElement;
  const userOrderService = jasmine.createSpyObj('UserOrderService', [
    'clearConsignmentTracking',
  ]);
  let launchDialogService: LaunchDialogService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SpinnerModule,
          I18nTestingModule,
          KeyboardFocusTestingModule,
          IconTestingModule,
        ],
        declarations: [TrackingEventsComponent, MockTranslateUrlPipe],
        providers: [
          { provide: OrderHistoryFacade, useValue: userOrderService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();

      launchDialogService = TestBed.inject(LaunchDialogService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingEventsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.shipDate = shipDate;
    userOrderService.clearConsignmentTracking.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show loading spinner', () => {
    component.tracking$ = EMPTY;
    fixture.detectChanges();
    expect(el.query(By.css('.cx-tracking-loading'))).toBeTruthy();
  });

  it('should show no tracking', () => {
    component.tracking$ = of({
      trackingID: '1234567890',
    } as ConsignmentTracking);
    fixture.detectChanges();
    expect(el.query(By.css('.cx-no-tracking-heading'))).toBeTruthy();
  });

  it('should show tracking info', () => {
    component.tracking$ = of({
      carrierDetails: {
        code: 'MockCarrier',
        name: 'MockCarrier',
      },
      trackingID: '1234567890',
      trackingEvents: [
        {
          detail: 'Your package has reached(Mock).',
          eventDate: '2019-01-06T07:18:22+0000',
          location: 'Boulder CO 80301, United States',
          referenceCode: 'DELIVERY_COMPLETED',
        },
        {
          detail: 'The package is delivering(Mock).',
          eventDate: '2019-01-06T07:18:22+0000',
          location: 'Evans Mills NY 13637, United States',
          referenceCode: 'DELIVERING',
        },
        {
          detail: 'The package is transferring(Mock).',
          eventDate: '2019-01-06T07:18:22+0000',
          location: 'Farmingdale NY 11735, United States',
          referenceCode: 'IN_TRANSIT',
        },
      ],
    } as ConsignmentTracking);
    fixture.detectChanges();
    expect(el.query(By.css('.cx-shipment-heading'))).toBeTruthy();
    expect(el.queryAll(By.css('.cx-tracking-event-body')).length).toBe(3);
  });

  it('should be able to close dialog', () => {
    spyOn(launchDialogService, 'closeDialog').and.stub();
    fixture.detectChanges();
    el.query(By.css('.btn-dismiss')).nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('Cross click');
    expect(userOrderService.clearConsignmentTracking).toHaveBeenCalled();
  });

  it('should emit handleClick event', () => {
    spyOn(component, 'handleClick').and.callThrough();
    spyOn(component, 'close');

    expect(component.handleClick).toHaveBeenCalledTimes(0);

    el.nativeElement.click();
    fixture.detectChanges();

    expect(component.handleClick).toHaveBeenCalledTimes(1);
    expect(component.close).toHaveBeenCalledWith('Cross click');
  });
});
