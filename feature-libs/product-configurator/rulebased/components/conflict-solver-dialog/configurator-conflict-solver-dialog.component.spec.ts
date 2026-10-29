import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  TranslatePipe,
} from '@spartacus/core';
import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '../../../common/core/model/common-configurator.model';
import {
  FocusDirective,
  IconTestingModule,
  KeyboardFocusService,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, NEVER, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorGroupComponent } from '../group';
import { ConfiguratorStorefrontUtilsService } from './../service/configurator-storefront-utils.service';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import {
  MockConfiguratorGroupComponent,
  MockConfiguratorProviderService,
} from '../../testing';

const mockRouterData: ConfiguratorRouter.Data = {
  owner: {
    key: 'OWNER_KEY',
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: 'CONF_LAPTOP',
    configuratorType: ConfiguratorType.CPQ,
  },
};

const mockData: any = {
  conflictGroup: of(ConfigurationTestData.productConfiguration.groups[0]),
  routerData: of(mockRouterData),
};

const mockDialogData$ = new BehaviorSubject<any>(mockData);

class MockLaunchDialogService {
  data$ = mockDialogData$.asObservable();
  closeDialog = vi.fn();
  openDialogAndSubscribe = vi.fn();
}

describe('ConfiguratorConflictSolverDialogComponent', () => {
  let component: ConfiguratorConflictSolverDialogComponent;
  let fixture: ComponentFixture<ConfiguratorConflictSolverDialogComponent>;
  let htmlElem: HTMLElement;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let launchDialogService: LaunchDialogService;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
  let focusService: KeyboardFocusService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [IconTestingModule, ConfiguratorConflictSolverDialogComponent],
      providers: [
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass:
            MockConfiguratorProviderService.MockConfiguratorStorefrontUtilsService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass:
            MockConfiguratorProviderService.MockConfiguratorCommonsService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(ConfiguratorConflictSolverDialogComponent, {
        remove: {
          imports: [
            ConfiguratorGroupComponent,
            FocusDirective,
            FeatureDirective,
            TranslatePipe,
            CxDatePipe,
          ],
        },
        add: {
          imports: [
            MockConfiguratorGroupComponent,
            KeyboardFocusTestingModule,
            MockFeatureDirective,
            I18nTestingModule,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorConflictSolverDialogComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    configuratorCommonsService = TestBed.inject(ConfiguratorCommonsService);

    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService
    );

    vi.spyOn(
      configuratorStorefrontUtilsService,
      'scrollToConfigurationElement'
    );

    vi.spyOn(configuratorStorefrontUtilsService, 'focusFirstAttribute');

    vi.spyOn(configuratorCommonsService, 'updateConfiguration');

    launchDialogService = TestBed.inject(LaunchDialogService);
    vi.spyOn(launchDialogService, 'closeDialog');

    focusService = TestBed.inject(KeyboardFocusService);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('Rendering', () => {
    it('should render a conflict solver dialog correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-modal-container'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-modal-content'
      );
      // HEADER
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-dialog-header'
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-dialog-title',
        'configurator.header.resolveIssue'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-dialog-header button.close'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-dialog-header button span cx-icon'
      );

      //  CONTENT
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-dialog-body'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-msg-warning'
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-msg-warning',
        'configurator.header.conflictWarning'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-group'
      );
    });
  });

  describe('init', () => {
    it('should clear persisted focus key', () => {
      fixture.detectChanges();
      focusService.set('key');
      component.init(NEVER, NEVER);
      expect(focusService.get()).toBeUndefined();
    });
  });
  describe('dismissModal', () => {
    it('should close dialog when dismissModal is called', () => {
      fixture.detectChanges();
      const reason = 'Close conflict solver dialog';
      component.ngOnInit();
      component.dismissModal(reason);
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(reason);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalled();
      expect(
        configuratorStorefrontUtilsService.focusFirstAttribute
      ).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it("should contain action button element with class name 'close' and 'aria-label' attribute that indicates the text for close button", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'close',
        0,
        'aria-label',
        'configurator.a11y.closeConflictSolverModal'
      );
    });

    it("should contain action button element with class name 'close' and 'aria-atomic' attribute that indicates whether a screen reader will present a changed region based on the change notifications defined by the aria-relevant attribute", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-visually-hidden',
        0,
        'aria-atomic',
        'true'
      );
    });

    it("should contain div element with class name 'cx-visually-hidden' and 'aria-live' attribute that indicates that the appeared conflict solver modal requires the user's immediate attention", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-visually-hidden',
        0,
        'aria-live',
        'assertive'
      );
    });

    it("should contain action button element with class name 'close' and 'aria-relevant' attribute that indicates what notifications a user will be triggered when the HTML tree within a live region is modified", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-visually-hidden',
        0,
        'aria-relevant',
        'additions'
      );
    });

    it('should contain a explanatory text that is seen only for a screen reader and explains that the conflicts must be resolved to continue', () => {
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'div.cx-visually-hidden',
        'configurator.header.conflictWarning'
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
