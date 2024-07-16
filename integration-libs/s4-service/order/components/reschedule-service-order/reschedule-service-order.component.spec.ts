import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderComponent } from './reschedule-service-order.component';

describe('RescheduleServiceOrderComponent', () => {
  let component: RescheduleServiceOrderComponent;
  let fixture: ComponentFixture<RescheduleServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RescheduleServiceOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RescheduleServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
