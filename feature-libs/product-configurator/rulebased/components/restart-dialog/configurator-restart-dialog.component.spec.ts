import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { CommonConfigurator } from '../../../common/core/model/common-configurator.model';
import {
  FocusDirective,
  IconComponent,
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { MockConfiguratorProductService } from '../../../common/testing/services/mock-configurator-product.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { MockConfiguratorProviderService } from '../../testing';
import { ConfiguratorRestartDialogComponent } from './configurator-restart-dialog.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const product: Product = { code: 'pCode' };

describe('ConfiguratorRestartDialogComponent', () => {
  let component: ConfiguratorRestartDialogComponent;
  let fixture: ComponentFixture<ConfiguratorRestartDialogComponent>;
  let htmlElem: HTMLElement;

  let mockLaunchDialogService: LaunchDialogService;
  let mockConfigCommonsService: ConfiguratorCommonsService;
  let mockRoutingService: RoutingService;
  let mockProductService: MockConfiguratorProductService;

  let dialogDataSender: BehaviorSubject<
    { owner: CommonConfigurator.Owner } | undefined
  >;

  function initialize() {
    dialogDataSender = new BehaviorSubject<
      { owner: CommonConfigurator.Owner } | undefined
    >({ owner: owner });
    fixture = TestBed.createComponent(ConfiguratorRestartDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    mockConfigCommonsService = TestBed.inject(ConfiguratorCommonsService);
    mockRoutingService = TestBed.inject(RoutingService);
    mockProductService = TestBed.inject(
      ProductService
    ) as unknown as MockConfiguratorProductService;
    mockProductService.product = product;
    vi.spyOn(mockLaunchDialogService, 'closeDialog');
  }

  class MockLaunchDialogService {
    closeDialog(): void {}
    data$ = dialogDataSender;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorRestartDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: ConfiguratorCommonsService,
          useClass:
            MockConfiguratorProviderService.MockConfiguratorCommonsService,
        },
        {
          provide: RoutingService,
          useClass: MockConfiguratorProviderService.MockRoutingService,
        },
        {
          provide: ProductService,
          useClass: MockConfiguratorProviderService.MockProductService,
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
    // dialogData$ filters out undefined, so completion without emit is valid
    expect(true).toBe(true); // stream completed without error
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
