import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPreferenceComponent } from './notification-preference.component';

describe('NotificationPreferenceComponent', () => {
  let component: NotificationPreferenceComponent;
  let fixture: ComponentFixture<NotificationPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
