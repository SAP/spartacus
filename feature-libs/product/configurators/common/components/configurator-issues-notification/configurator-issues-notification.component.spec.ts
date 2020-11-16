import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext, CartItemContextModel } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import {
  ConfigurationInfo,
  ConfiguratorOrderEntryStatus,
  StatusSummary,
} from './../../core/model/common-configurator.model';
import { ConfiguratorIssuesNotificationComponent } from './configurator-issues-notification.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

let item: OrderEntry;
function setContext(
  cartItemOutletConfiguratorComponent: ConfiguratorIssuesNotificationComponent,
  statusSummary: StatusSummary[],
  configurationInfos: ConfigurationInfo[],
  readOnly: boolean,
  productConfigurable: boolean = true
) {
  item = {
    statusSummaryList: statusSummary,
    configurationInfos: configurationInfos,
    product: { configurable: productConfigurable },
  };
  const newChunk: any = {
    item: item,
    readonly: readOnly,
    quantityControl: {},
  };
  const context$ = cartItemOutletConfiguratorComponent.cartItemContext
    .context$ as BehaviorSubject<CartItemContextModel>;
  context$.next({ ...context$.value, ...newChunk });
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
      providers: [CartItemContext],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorIssuesNotificationComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should know cart context', () => {
    expect(component.cartItemContext).toBeDefined();
  });

  it('should return number of issues of ERROR status', () => {
    setContext(
      component,
      [{ numberOfIssues: 2, status: ConfiguratorOrderEntryStatus.Error }],
      null,
      false
    );
    expect(component.getNumberOfIssues(item)).toBe(2);
  });

  it('should return number of issues of ERROR status if ERROR and SUCCESS statuses are present', () => {
    setContext(
      component,
      [
        { numberOfIssues: 1, status: ConfiguratorOrderEntryStatus.Success },
        { numberOfIssues: 3, status: ConfiguratorOrderEntryStatus.Error },
      ],
      null,
      false
    );

    expect(component.getNumberOfIssues(item)).toBe(3);
  });

  it('should return number of issues as 0 if only SUCCESS status is present', () => {
    setContext(
      component,
      [{ numberOfIssues: 2, status: ConfiguratorOrderEntryStatus.Success }],
      null,
      false
    );

    expect(component.getNumberOfIssues(item)).toBe(0);
  });

  it('should return number of issues as 0 if statusSummaryList is undefined', () => {
    setContext(component, null, null, false);
    expect(component.getNumberOfIssues(item)).toBe(0);
  });

  it('should return number of issues as 0 if statusSummaryList is empty', () => {
    setContext(component, [], null, false);
    expect(component.getNumberOfIssues(item)).toBe(0);
  });

  it('should display configure from cart in case issues are present', () => {
    setContext(
      component,
      [{ numberOfIssues: 2, status: ConfiguratorOrderEntryStatus.Error }],
      null,
      false
    );

    fixture.detectChanges();
    expect(component.hasIssues(item)).toBeTrue();

    expect(
      htmlElem.querySelectorAll('cx-configure-cart-entry').length
    ).toBeGreaterThan(
      0,
      'expected configure cart entry to be present, but it is not; innerHtml: ' +
        htmlElem.innerHTML
    );
  });

  it('should not display configure from cart in case issues are present but product not configurable', () => {
    setContext(
      component,
      [{ numberOfIssues: 2, status: ConfiguratorOrderEntryStatus.Error }],
      null,
      false,
      false
    );

    fixture.detectChanges();
    expect(component.hasIssues(item)).toBeTrue();

    expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(
      0,
      'expected configure cart entry not to be present, but it is; innerHtml: ' +
        htmlElem.innerHTML
    );
  });

  it('should return false if number of issues of ERROR status is = 0', () => {
    setContext(
      component,
      [{ numberOfIssues: 2, status: ConfiguratorOrderEntryStatus.Success }],
      null,
      false
    );

    fixture.detectChanges();
    expect(component.hasIssues(item)).toBeFalse();
    expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(
      0,
      'expected configure cart entry not to be present, but it is; innerHtml: ' +
        htmlElem.innerHTML
    );
  });
});
