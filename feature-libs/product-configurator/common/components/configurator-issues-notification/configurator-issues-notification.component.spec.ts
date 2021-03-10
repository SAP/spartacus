import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OrderEntry } from '@spartacus/core';
import { CartItemContext, CartItemContextSource } from '@spartacus/storefront';
import { ReplaySubject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
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

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<FormControl>(1);
}

describe('ConfigureIssuesNotificationComponent', () => {
  let component: ConfiguratorIssuesNotificationComponent;
  let fixture: ComponentFixture<ConfiguratorIssuesNotificationComponent>;
  let htmlElem: HTMLElement;
  let mockCartItemContext: Partial<CartItemContextSource>;

  function emitNewContextValue(testData: {
    statusSummary: StatusSummary[];
    configurationInfos: ConfigurationInfo[];
    readOnly: boolean;
    productConfigurable: boolean;
  }) {
    mockCartItemContext.item$.next({
      statusSummaryList: testData.statusSummary,
      configurationInfos: testData.configurationInfos,
      product: { configurable: testData.productConfigurable ?? true },
    });
    mockCartItemContext.readonly$.next(testData.readOnly);
    mockCartItemContext.quantityControl$.next(new FormControl());
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorIssuesNotificationComponent,
          MockTranslatePipe,
        ],
        providers: [
          { provide: CartItemContext, useClass: MockCartItemContext },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorIssuesNotificationComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', (done) => {
    const orderEntry: OrderEntry = { orderCode: '123' };

    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should expose quantityControl$', (done) => {
    const quantityControl = new FormControl();
    component.quantityControl$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(quantityControl);
      done();
    });

    mockCartItemContext.quantityControl$.next(quantityControl);
  });

  it('should expose readonly$', (done) => {
    component.readonly$.pipe(take(2), toArray()).subscribe((values) => {
      expect(values).toEqual([true, false]);
      done();
    });

    mockCartItemContext.readonly$.next(true);
    mockCartItemContext.readonly$.next(false);
  });

  it('should display configure from cart in case issues are present', () => {
    emitNewContextValue({
      statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
      configurationInfos: null,
      readOnly: false,
      productConfigurable: true,
    });

    fixture.detectChanges();

    expect(
      htmlElem.querySelectorAll('cx-configure-cart-entry').length
    ).toBeGreaterThan(
      0,
      'expected configure cart entry to be present, but it is not; innerHtml: ' +
        htmlElem.innerHTML
    );
  });

  it('should not display configure from cart in case issues are present but product not configurable', () => {
    emitNewContextValue({
      statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
      configurationInfos: null,
      readOnly: false,
      productConfigurable: false,
    });

    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(
      0,
      'expected configure cart entry not to be present, but it is; innerHtml: ' +
        htmlElem.innerHTML
    );
  });

  it('should return false if number of issues of ERROR status is = 0', () => {
    emitNewContextValue({
      statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Success }],
      configurationInfos: null,
      readOnly: false,
      productConfigurable: true,
    });

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(
      0,
      'expected configure cart entry not to be present, but it is; innerHtml: ' +
        htmlElem.innerHTML
    );
  });
});
