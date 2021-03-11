import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguratorCartEntryBundleInfoComponent } from './configurator-cart-entry-bundle-info.component';
import { ControlContainer, FormControl } from '@angular/forms';
import { I18nTestingModule, OrderEntry } from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';
import { ReplaySubject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import {
  CommonConfiguratorUtilsService,
  ConfigurationInfo,
  ConfiguratorCartEntryBundleInfoService,
} from '@spartacus/product-configurator/common';
import { Type } from '@angular/core';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<FormControl>(1);
}

const emptyEntry: OrderEntry = {
  configurationInfos: [],
};

const configurationInfos: ConfigurationInfo[] = [
  {
    configurationLabel: 'Canon EOS 80D',
    configurationValue: '1 x $1,000.00',
    configuratorType: 'CLOUDCPQCONFIGURATOR',
    status: 'SUCCESS',
  },
];

const item: OrderEntry = {
  configurationInfos: configurationInfos,
};

describe('ConfiguratorCartEntryBundleInfoComponent', () => {
  let component: ConfiguratorCartEntryBundleInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryBundleInfoComponent>;
  //let htmlElem: HTMLElement;
  let mockCartItemContext: MockCartItemContext;
  let commonConfigUtilsService: CommonConfiguratorUtilsService;
  let configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfiguratorCartEntryBundleInfoComponent],
      providers: [
        { provide: CartItemContext, useClass: MockCartItemContext },
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    commonConfigUtilsService = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configCartEntryBundleInfoService = TestBed.inject(
      ConfiguratorCartEntryBundleInfoService as Type<
        ConfiguratorCartEntryBundleInfoService
      >
    );

    spyOn(
      commonConfigUtilsService,
      'isBundleBasedConfigurator'
    ).and.callThrough();
    spyOn(
      configCartEntryBundleInfoService,
      'retrieveNumberOfLineItems'
    ).and.callThrough();
    spyOn(
      configCartEntryBundleInfoService,
      'retrieveLineItems'
    ).and.callThrough();

    fixture = TestBed.createComponent(ConfiguratorCartEntryBundleInfoComponent);
    component = fixture.componentInstance;
    //htmlElem = fixture.nativeElement;
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

  describe('bundle info for cart entry', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: null,
        configurationInfos: null,
      });
      mockCartItemContext.readonly$.next(false);

      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-item-infos').length).toBe(
        0,
        "expected configuration info identified by selector '.cx-item-infos' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should be displayed if model provides a success entry', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: null,
        configurationInfos: [
          {
            configurationLabel: 'Color',
            configurationValue: 'Blue',
            configuratorType: 'CLOUDCPQCONFIGURATOR',
            status: 'SUCCESS',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-item-infos').length).toBe(
        1,
        "expected configuration info identified by selector '.cx-item-infos' to be present, but it is not! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should be displayed if model provides a warning entry', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: null,
        configurationInfos: [
          {
            configurationLabel: 'Pricing',
            configurationValue: 'could not be carried out',
            configuratorType: 'CLOUDCPQCONFIGURATOR',
            status: 'WARNING',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-item-infos').length).toBe(
        1,
        "expected configuration info identified by selector '.cx-item-infos' to be present, but it is not! innerHtml: " +
          htmlElem.innerHTML
      );
    });
  });

  describe('toggleItems', () => {
    it('should return corresponding state after toggling the link show / hide items', () => {
      expect(component.hideItems).toBe(true);
      component.toggleItems();
      expect(component.hideItems).toBe(false);
      component.toggleItems();
      expect(component.hideItems).toBe(true);
    });
  });

  describe('retrieveLineItems', () => {
    it('should return empty list of line items', () => {
      expect(component.retrieveLineItems(emptyEntry)?.length).toBe(0);
    });

    it('should return a list of line items that contains one line item', () => {
      expect(component.retrieveLineItems(item)?.length).toBe(1);
    });
  });

  describe('isBundleBasedConfigurator', () => {
    it('should return false because the configurator type is not bundle based one', () => {
      item.configurationInfos[0].configuratorType =
        'notBundleBasedConfiguratorType';
      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(item)).toBe(false);
    });

    it('should return true because the configurator type is a bundle based one', () => {
      item.configurationInfos[0].configuratorType = 'CLOUDCPQCONFIGURATOR';
      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(item)).toBe(true);
    });
  });
});
