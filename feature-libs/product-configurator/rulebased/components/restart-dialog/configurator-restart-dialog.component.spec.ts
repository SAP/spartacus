import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Product,
  ProductService,
  ProductTestingModule,
  RoutingService,
  RoutingTestingModule,
  TranslatePipe,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import {
  FocusDirective,
  IconComponent,
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, lastValueFrom, Observable, of, ReplaySubject } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { MockConfiguratorCommonsService } from '../../testing/services/mock-configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorRestartDialogComponent } from './configurator-restart-dialog.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const product: Product = { code: 'pCode' };

describe('ConfiguratorRestartDialogComponent', () => {
  let component: ConfiguratorRestartDialogComponent;
  let fixture: ComponentFixture<ConfiguratorRestartDialogComponent>;
  let htmlElem: HTMLElement;

  let mockLaunchDialogService: LaunchDialogService;
  let mockConfigCommonsService: MockConfiguratorCommonsService;
  let mockRoutingService: RoutingService;
  let mockProductService: ProductService;

  let dialogDataSender: BehaviorSubject<
    { owner: CommonConfigurator.Owner } | undefined
  >;

  function initialize() {
    mockConfigCommonsService = TestBed.inject(
      ConfiguratorCommonsService
    ) as unknown as MockConfiguratorCommonsService;
    mockRoutingService = TestBed.inject(RoutingService);
    mockProductService = TestBed.inject(ProductService);
    vi.spyOn(mockConfigCommonsService, 'forceNewConfiguration');
    vi.spyOn(mockRoutingService, 'go');
    vi.spyOn(mockProductService, 'get').mockReturnValue(of(product));
    dialogDataSender = new BehaviorSubject<
      { owner: CommonConfigurator.Owner } | undefined
    >({ owner: owner });
    fixture = TestBed.createComponent(ConfiguratorRestartDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    vi.spyOn(mockLaunchDialogService, 'closeDialog');
  }

  class MockLaunchDialogService {
    closeDialog(): void {}
    get data$() {
      return dialogDataSender;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfiguratorRestartDialogComponent,
        RoutingTestingModule,
        ProductTestingModule,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    })
      .overrideComponent(ConfiguratorRestartDialogComponent, {
        remove: {
          imports: [TranslatePipe, IconComponent, FocusDirective],
        },
        add: {
          imports: [
            I18nTestingModule,
            IconTestingModule,
            KeyboardFocusTestingModule,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    initialize();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should ignore invalid dialog data', async () => {
    dialogDataSender.next(undefined);
    dialogDataSender.complete();
    const dialogData = await lastValueFrom(component.dialogData$, {
      defaultValue: undefined,
    });
    expect(dialogData).toBeUndefined();
  });

  it('should query product by owner id', () => {
    expect(mockProductService.get).toHaveBeenCalledWith(owner.id);
  });

  it('should render title, description and close, restart and resume buttons', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-title'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.close'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '#cx-configurator-restart-dialog-description'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn-primary'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn-secondary'
    );
  });

  it('should close the dialog on resume', () => {
    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(
      mockConfigCommonsService.forceNewConfiguration
    ).not.toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith(
      {
        cxRoute: 'configure' + product.configuratorType,
        params: {
          ownerType: CommonConfigurator.OwnerType.PRODUCT,
          entityKey: product.code,
        },
      },
      {
        queryParams: {
          productCode: product.code,
        },
      }
    );
  });

  it('should create a new default config on restart', () => {
    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(mockConfigCommonsService.forceNewConfiguration).toHaveBeenCalledWith(
      owner
    );
    expect(mockRoutingService.go).not.toHaveBeenCalled();
  });

  it('close should navigate back to PDP on close', () => {
    fixture.debugElement.query(By.css('.close')).triggerEventHandler('click');
    checkBackToPDPBehavior();
  });

  it('should navigate back to PDP on escape', () => {
    fixture.debugElement
      .query(By.css('.cx-modal-content'))
      .triggerEventHandler('esc');
    checkBackToPDPBehavior();
  });

  function checkBackToPDPBehavior() {
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(
      mockConfigCommonsService.forceNewConfiguration
    ).not.toHaveBeenCalled();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'product',
      params: product,
    });
  }

  function expectRestartDialogContentPresent(): void {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-title'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn-primary'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn-secondary'
    );
  }

  function expectRestartDialogContentAbsent(): void {
    expect(htmlElem.querySelector('.cx-dialog-title')).toBeNull();
    expect(htmlElem.querySelector('.btn-primary')).toBeNull();
    expect(htmlElem.querySelector('.btn-secondary')).toBeNull();
  }

  describe('change detection with launch dialog data', () => {
    let productSender: ReplaySubject<Product>;

    beforeEach(() => {
      vi.spyOn(mockConfigCommonsService, 'forceNewConfiguration');
      vi.spyOn(mockRoutingService, 'go');
      productSender = new ReplaySubject<Product>(1);
      vi.spyOn(mockProductService, 'get').mockReturnValue(
        productSender.asObservable()
      );
      dialogDataSender = new BehaviorSubject<
        { owner: CommonConfigurator.Owner } | undefined
      >(undefined);
      fixture = TestBed.createComponent(ConfiguratorRestartDialogComponent);
      htmlElem = fixture.nativeElement;
      component = fixture.componentInstance;
      mockLaunchDialogService = TestBed.inject(LaunchDialogService);
      vi.spyOn(mockLaunchDialogService, 'closeDialog');
      fixture.detectChanges();
    });

    it('should show modal shell before launch dialog payload and product are available', () => {
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-modal-container'
      );
      expectRestartDialogContentAbsent();
    });

    it('should render title and actions when dialog payload and product emit after insert', () => {
      dialogDataSender.next({ owner });
      productSender.next(product);
      fixture.detectChanges();

      expectRestartDialogContentPresent();
    });

    it('should render title and actions when product emits after dialog payload', () => {
      dialogDataSender.next({ owner });
      fixture.detectChanges();
      expectRestartDialogContentAbsent();

      productSender.next(product);
      fixture.detectChanges();

      expectRestartDialogContentPresent();
    });

    it('should ignore launch dialog payload without owner', () => {
      dialogDataSender.next({} as { owner: CommonConfigurator.Owner });
      productSender.next(product);
      fixture.detectChanges();

      expectRestartDialogContentAbsent();
    });
  });

  describe('Accessibility', () => {
    it("should contain action button element with class name 'close' and 'title' attribute that indicates the text for close button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'close',
        0,
        'title',
        'configurator.a11y.closeRestartDialog'
      );
    });
    it("should contain action button element with class name 'cx-configurator-dialog-resume' and 'aria-describedby' attribute that points to the text for the resume button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-primary',
        0,
        'aria-describedby',
        'cx-configurator-restart-dialog-description'
      );
    });
    it("should contain action button element with class name 'cx-configurator-dialog-discard' and 'aria-describedby' attribute that points to the text for the start new button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-secondary',
        0,
        'aria-describedby',
        'cx-configurator-restart-dialog-description'
      );
    });
    it("should contain 'role' and 'aria-modal' attributes that indicate that the appeared pop-up is a modal dialog", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-modal-container',
        0,
        'aria-modal',
        'true'
      );
    });
  });
});
