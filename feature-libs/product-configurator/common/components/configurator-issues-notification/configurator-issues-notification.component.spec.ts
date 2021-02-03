import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext, CartItemContextSource } from '@spartacus/storefront';
import {
  ConfigurationInfo,
  OrderEntryStatus,
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
function emitNewContextValue(
  component: ConfiguratorIssuesNotificationComponent,
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
  const contextSource = component['cartItemContext'] as CartItemContextSource;
  contextSource.item$.next(item);
  contextSource.readonly$.next(readOnly);
  contextSource.quantityControl$.next({} as any);
}

describe('ConfigureIssuesNotificationComponent', () => {
  let component: ConfiguratorIssuesNotificationComponent;
  let fixture: ComponentFixture<ConfiguratorIssuesNotificationComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorIssuesNotificationComponent,
          MockTranslatePipe,
        ],
        providers: [
          CartItemContextSource,
          { provide: CartItemContext, useExisting: CartItemContextSource },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorIssuesNotificationComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return number of issues of ERROR status', () => {
    emitNewContextValue(
      component,
      [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
      null,
      false
    );
    expect(component.getNumberOfIssues(item)).toBe(2);
  });

  it('should return number of issues of ERROR status if ERROR and SUCCESS statuses are present', () => {
    emitNewContextValue(
      component,
      [
        { numberOfIssues: 1, status: OrderEntryStatus.Success },
        { numberOfIssues: 3, status: OrderEntryStatus.Error },
      ],
      null,
      false
    );

    expect(component.getNumberOfIssues(item)).toBe(3);
  });

  it('should return number of issues as 0 if only SUCCESS status is present', () => {
    emitNewContextValue(
      component,
      [{ numberOfIssues: 2, status: OrderEntryStatus.Success }],
      null,
      false
    );

    expect(component.getNumberOfIssues(item)).toBe(0);
  });

  it('should return number of issues as 0 if statusSummaryList is undefined', () => {
    emitNewContextValue(component, null, null, false);
    expect(component.getNumberOfIssues(item)).toBe(0);
  });

  it('should return number of issues as 0 if statusSummaryList is empty', () => {
    emitNewContextValue(component, [], null, false);
    expect(component.getNumberOfIssues(item)).toBe(0);
  });

  it('should display configure from cart in case issues are present', () => {
    emitNewContextValue(
      component,
      [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
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
    emitNewContextValue(
      component,
      [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
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
    emitNewContextValue(
      component,
      [{ numberOfIssues: 2, status: OrderEntryStatus.Success }],
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
