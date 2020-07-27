import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureErrorNotificationBannerComponent } from './configure-error-notification-banner.component';

describe('ConfigureErrorNotificationBannerComponent', () => {
  let component: ConfigureErrorNotificationBannerComponent;
  let fixture: ComponentFixture<ConfigureErrorNotificationBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureErrorNotificationBannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfigureErrorNotificationBannerComponent
    );
    component = fixture.componentInstance;
    component.item = {
      statusSummaryList: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return no issue message key if the number of issues is null/undefined or equals zero', () => {
    let result = component.getIssueMessageKey(null);
    expect(result).toEqual('');

    result = component.getIssueMessageKey(undefined);
    expect(result).toEqual('');

    result = component.getIssueMessageKey(0);
    expect(result).toEqual('');
  });

  it('should return a singular issue message key for one issue', () => {
    const result = component.getIssueMessageKey(1);
    expect(result).toEqual('configurator.notificationBanner.numberOfIssue');
  });

  it('should return a plural issue message key for more than one issue', () => {
    const result = component.getIssueMessageKey(3);
    expect(result).toEqual('configurator.notificationBanner.numberOfIssues');
  });

  it('should return number of issues of ERROR status', () => {
    component.item.statusSummaryList = [{ numberOfIssues: 2, status: 'ERROR' }];
    expect(component.getNumberOfIssues()).toBe(2);
  });

  it('should return number of issues of ERROR status if ERROR and SUCCESS statuses are present', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 1, status: 'SUCCESS' },
      { numberOfIssues: 3, status: 'ERROR' },
    ];
    expect(component.getNumberOfIssues()).toBe(3);
  });

  it('should return number of issues as 0 if only SUCCESS status is present', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 2, status: 'SUCCESS' },
    ];
    expect(component.getNumberOfIssues()).toBe(0);
  });

  it('should return number of issues as 0 if statusSummaryList is undefined', () => {
    component.item.statusSummaryList = undefined;
    expect(component.getNumberOfIssues()).toBe(0);
  });

  it('should return number of issues as 0 if statusSummaryList is empty', () => {
    component.item.statusSummaryList = [];
    expect(component.getNumberOfIssues()).toBe(0);
  });

  it('should return true if number of issues of ERROR status is > 0', () => {
    component.item.statusSummaryList = [{ numberOfIssues: 2, status: 'ERROR' }];
    expect(component.hasIssues()).toBeTrue();
  });

  it('should return false if number of issues of ERROR status is = 0', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 2, status: 'SUCCESS' },
    ];
    expect(component.hasIssues()).toBeFalse();
  });
});
