import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderEntryStatus } from '@spartacus/core';
import { ConfigComponentTestUtilsService } from 'projects/storefrontlib/src/cms-components/configurator/generic/service/configurator-component-test-utils.service';
import { ConfiguratorIssuesNotificationComponent } from './configurator-issues-notification.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

describe('ConfigureIssuesNotificationComponent', () => {
  let component: ConfiguratorIssuesNotificationComponent;
  let fixture: ComponentFixture<ConfiguratorIssuesNotificationComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfiguratorIssuesNotificationComponent,
        MockTranslatePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorIssuesNotificationComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.item = {
      statusSummaryList: [],
      product: {
        configurable: true,
      },
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

  it('should return number of issues of ERROR status', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 2, status: OrderEntryStatus.Error },
    ];
    expect(component.getNumberOfIssues()).toBe(2);
  });

  it('should return number of issues of ERROR status if ERROR and SUCCESS statuses are present', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 1, status: OrderEntryStatus.Success },
      { numberOfIssues: 3, status: OrderEntryStatus.Error },
    ];
    expect(component.getNumberOfIssues()).toBe(3);
  });

  it('should return number of issues as 0 if only SUCCESS status is present', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 2, status: OrderEntryStatus.Success },
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
    component.item.statusSummaryList = [
      { numberOfIssues: 2, status: OrderEntryStatus.Error },
    ];
    fixture.detectChanges();
    expect(component.hasIssues()).toBeTrue();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configure-cart-entry'
    );
  });

  it('should return false if number of issues of ERROR status is = 0', () => {
    component.item.statusSummaryList = [
      { numberOfIssues: 2, status: OrderEntryStatus.Success },
    ];
    fixture.detectChanges();
    expect(component.hasIssues()).toBeFalse();
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-configure-cart-entry'
    );
  });
});
