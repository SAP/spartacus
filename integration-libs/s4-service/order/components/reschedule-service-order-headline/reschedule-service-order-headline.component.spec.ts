import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderHeadlineComponent } from './reschedule-service-order-headline.component';

describe('RescheduleServiceOrderHeadlineComponent', () => {
  let component: RescheduleServiceOrderHeadlineComponent;
  let fixture: ComponentFixture<RescheduleServiceOrderHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RescheduleServiceOrderHeadlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RescheduleServiceOrderHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
