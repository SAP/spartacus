import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nTestingModule } from '@spartacus/core';
import { ConsignmentTracking, OrderFacade } from '@spartacus/order/root';
import { SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { TrackingEventsComponent } from './tracking-events.component';

const shipDate = new Date('2019-02-11T13:05:12+0000');

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('TrackingEventsComponent', () => {
  let component: TrackingEventsComponent;
  let fixture: ComponentFixture<TrackingEventsComponent>;
  let el: DebugElement;
  const userOrderService = jasmine.createSpyObj('UserOrderService', [
    'clearConsignmentTracking',
  ]);
  const ngbActiveModal = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgbModule, SpinnerModule, I18nTestingModule],
        declarations: [TrackingEventsComponent, MockTranslateUrlPipe],
        providers: [
          { provide: NgbActiveModal, useValue: ngbActiveModal },
          { provide: OrderFacade, useValue: userOrderService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingEventsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.shipDate = shipDate;
    userOrderService.clearConsignmentTracking.and.stub();
    ngbActiveModal.dismiss.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show loading spinner', () => {
    component.tracking$ = of();
    fixture.detectChanges();
    expect(el.query(By.css('.tracking-loading'))).toBeTruthy();
  });

  it('should show no tracking', () => {
    component.tracking$ = of<ConsignmentTracking>({
      trackingID: '1234567890',
    });
    fixture.detectChanges();
    expect(el.query(By.css('.no-tracking-heading'))).toBeTruthy();
  });

  it('should show tracking info', () => {
    component.tracking$ = of<ConsignmentTracking>({
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
    });
    fixture.detectChanges();
    expect(el.query(By.css('.shipment-heading'))).toBeTruthy();
    expect(el.queryAll(By.css('.event-body')).length).toBe(3);
  });

  it('should be able to close dialog', () => {
    fixture.detectChanges();
    el.query(By.css('.btn-dismiss')).nativeElement.click();
    expect(ngbActiveModal.dismiss).toHaveBeenCalledWith('Cross click');
    expect(userOrderService.clearConsignmentTracking).toHaveBeenCalled();
  });
});
