import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ConsignmentTracking, OrderHistoryFacade } from '@spartacus/order/root';
import {
  FocusDirective,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { MockUrlPipe } from '@spartacus/core/routing/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { MockFocusDirective } from '../../../order-detail-reorder/reorder-dialog/reorder-dialog.component.spec';
import { TrackingEventsComponent } from './tracking-events.component';

const shipDate = new Date('2019-02-11T13:05:12+0000');
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
  const userOrderService = {
    clearConsignmentTracking: vi.fn(),
  };
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [KeyboardFocusTestingModule, I18nTestingModule],
      providers: [
        { provide: OrderHistoryFacade, useValue: userOrderService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(TrackingEventsComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, FocusDirective],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockUrlPipe,
            MockFocusDirective,
            MockDatePipe,
          ],
        },
      })
      .compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingEventsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.shipDate = shipDate;
    userOrderService.clearConsignmentTracking.mockImplementation(() => {});
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
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});
    fixture.detectChanges();
    el.query(By.css('.btn-dismiss')).nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('Cross click');
    expect(userOrderService.clearConsignmentTracking).toHaveBeenCalled();
  });

  it('should emit handleClick event', () => {
    vi.spyOn(component, 'handleClick');
    vi.spyOn(component, 'close');

    expect(component.handleClick).toHaveBeenCalledTimes(0);

    el.nativeElement.click();
    fixture.detectChanges();

    expect(component.handleClick).toHaveBeenCalledTimes(1);
    expect(component.close).toHaveBeenCalledWith('Cross click');
  });
});
