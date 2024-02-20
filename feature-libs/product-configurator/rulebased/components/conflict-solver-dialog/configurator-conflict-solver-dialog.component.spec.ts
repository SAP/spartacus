import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import { I18nTestingModule } from '@spartacus/core';
import {
  ICON_TYPE,
  IconLoaderService,
  IconModule,
  LaunchDialogService,
  FocusConfig,
  KeyboardFocusService,
} from '@spartacus/storefront';
import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Type } from '@angular/core';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorStorefrontUtilsService } from './../service/configurator-storefront-utils.service';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';

export class MockIconFontLoaderService {
  getStyleClasses(_iconType: ICON_TYPE): void {}
  addLinkResource(): void {}
  getHtml(_iconType: ICON_TYPE): void {}
  getFlipDirection(): void {}
}

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
  dismissConflictSolverDialog(): void {}
}

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

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return mockDialogData$.asObservable();
  }

  closeDialog(_reason: string): void {}
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboardFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

@Component({
  selector: 'cx-configurator-group',
  template: '',
})
class MockConfiguratorDefaultFormComponent {
  @Input() group: Configurator.Group;
  @Input() owner: CommonConfigurator.Owner;
  @Input() isNavigationToGroupEnabled = true;
}

class MockConfigUtilsService {
  scrollToConfigurationElement(): void {}

  focusFirstAttribute(): void {}
}

describe('ConfiguratorConflictSolverDialogComponent', () => {
  let component: ConfiguratorConflictSolverDialogComponent;
  let fixture: ComponentFixture<ConfiguratorConflictSolverDialogComponent>;
  let htmlElem: HTMLElement;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let launchDialogService: LaunchDialogService;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
  let focusService: KeyboardFocusService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconModule],
        declarations: [
          MockConfiguratorDefaultFormComponent,
          ConfiguratorConflictSolverDialogComponent,
          MockKeyboardFocusDirective,
        ],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorConflictSolverDialogComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();

    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );

    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );

    spyOn(
      configuratorStorefrontUtilsService,
      'scrollToConfigurationElement'
    ).and.callThrough();

    spyOn(
      configuratorStorefrontUtilsService,
      'focusFirstAttribute'
    ).and.callThrough();

    spyOn(configuratorCommonsService, 'updateConfiguration').and.callThrough();

    launchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(launchDialogService, 'closeDialog').and.callThrough();

    focusService = TestBed.inject(KeyboardFocusService);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('Rendering', () => {
    it('should render a conflict solver dialog correctly', () => {
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
      focusService.set('key');
      component.init(NEVER, NEVER);
      expect(focusService.get()).toBeUndefined();
    });
  });
  describe('dismissModal', () => {
    it('should close dialog when dismissModal is called', () => {
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
