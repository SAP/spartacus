import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingEventsComponent } from './tracking-events.component';

describe('TrackingEventsComponent', () => {
  let component: TrackingEventsComponent;
  let fixture: ComponentFixture<TrackingEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
