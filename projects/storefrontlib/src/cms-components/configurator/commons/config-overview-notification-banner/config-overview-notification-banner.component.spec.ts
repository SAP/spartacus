import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOverviewNotificationBannerComponent } from './config-overview-notification-banner.component';

describe('ConfigOverviewNotificationBannerComponent', () => {
  let component: ConfigOverviewNotificationBannerComponent;
  let fixture: ComponentFixture<ConfigOverviewNotificationBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigOverviewNotificationBannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfigOverviewNotificationBannerComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
