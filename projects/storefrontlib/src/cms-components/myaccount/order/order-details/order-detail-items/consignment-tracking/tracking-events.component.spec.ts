import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingEventsComponent } from './tracking-events.component';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { SpinnerModule } from '../../../../../../shared/components/spinner/spinner.module';
import { I18nTestingModule, ConsignmentTracking } from '@spartacus/core';
import { By } from '@angular/platform-browser';

class MockNgbActiveModal {
  dismiss(): void {}

  close(): void {}
}

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, SpinnerModule, I18nTestingModule],
      declarations: [TrackingEventsComponent, MockTranslateUrlPipe],
      providers: [{ provide: NgbActiveModal, useValue: MockNgbActiveModal }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingEventsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.shipDate = shipDate;
    fixture.detectChanges();
  });

  it('should create', () => {
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
    expect(el.query(By.css('.no-tracking-info'))).toBeTruthy();
  });

  it('should show tracking info', () => {
    component.tracking$ = of<ConsignmentTracking>({
      carrierDetails: {
        code: 'MockCarrier',
        name: 'MockCarrier',
      },
      trackingID: '1234567890',
    });
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-consignment-tracking-dialog__shipment-row'))
    ).toBeTruthy();
  });
});
