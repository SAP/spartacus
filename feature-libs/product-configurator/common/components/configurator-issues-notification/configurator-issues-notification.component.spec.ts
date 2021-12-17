import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OrderEntry, PromotionLocation } from '@spartacus/core';
import { CartItemContext, CartItemContextSource } from '@spartacus/storefront';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
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

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

@Component({
  selector: 'cx-configure-cart-entry',
  template: '',
})
class MockConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
}

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<FormControl>(1);
  location$ = new BehaviorSubject<PromotionLocation>(
    PromotionLocation.ActiveCart
  );
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
    mockCartItemContext.item$?.next({
      statusSummaryList: testData.statusSummary,
      configurationInfos: testData.configurationInfos,
      product: { configurable: testData.productConfigurable ?? true },
    });
    mockCartItemContext.readonly$?.next(testData.readOnly);
    mockCartItemContext.quantityControl$?.next(new FormControl());
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorIssuesNotificationComponent,
          MockTranslatePipe,
          MockCxIconComponent,
          MockConfigureCartEntryComponent,
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

    mockCartItemContext.item$?.next(orderEntry);
  });

  it('should expose quantityControl$', (done) => {
    const quantityControl = new FormControl();
    component.quantityControl$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(quantityControl);
      done();
    });

    mockCartItemContext.quantityControl$?.next(quantityControl);
  });

  it('should expose readonly$', (done) => {
    component.readonly$.pipe(take(2), toArray()).subscribe((values) => {
      expect(values).toEqual([true, false]);
      done();
    });

    mockCartItemContext.readonly$?.next(true);
    mockCartItemContext.readonly$?.next(false);
  });

  it('should display configure from cart in case issues are present', () => {
    emitNewContextValue({
      statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
      configurationInfos: [],
      readOnly: false,
      productConfigurable: true,
    });

    fixture.detectChanges();

    expect(
      htmlElem.querySelectorAll('cx-configure-cart-entry').length
    ).toBeGreaterThan(0);
  });

  it('should not display configure from cart in case issues are present but product not configurable', () => {
    emitNewContextValue({
      statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
      configurationInfos: [],
      readOnly: false,
      productConfigurable: false,
    });

    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(0);
  });

  it('should return false if number of issues of ERROR status is = 0', () => {
    emitNewContextValue({
      statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Success }],
      configurationInfos: [],
      readOnly: false,
      productConfigurable: true,
    });

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(0);
  });

  describe('shouldShowButton', () => {
    beforeEach(() => {
      const quantityControl = new FormControl();

      mockCartItemContext.quantityControl$?.next(quantityControl);
      mockCartItemContext.item$?.next({
        statusSummaryList: [
          { numberOfIssues: 2, status: OrderEntryStatus.Error },
        ],
        product: { configurable: true },
      });
    });
    it('should prevent the rendering of "edit configuration" if context is SaveForLater', () => {
      mockCartItemContext.location$?.next(PromotionLocation.SaveForLater);
      fixture.detectChanges();

      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configure-cart-entry').length).toBe(
        0
      );
    });

    it('should allow the rendering of "edit configuration" if context is active cart', () => {
      mockCartItemContext.location$?.next(PromotionLocation.ActiveCart);
      fixture.detectChanges();

      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('cx-configure-cart-entry').length).toBe(
        1
      );
    });
  });

  describe('Notification banner', () => {
    it('should contain div element with ID cx-error-msg', function () {
      emitNewContextValue({
        statusSummary: [{ numberOfIssues: 2, status: OrderEntryStatus.Error }],
        configurationInfos: [],
        readOnly: false,
        productConfigurable: true,
      });

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '#cx-error-msg'
      );
    });
  });
});
