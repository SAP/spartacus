import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import {
  ICON_TYPE,
  IconLoaderService,
  IconModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  ConfigFormUpdateEvent,
  Configurator,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';
import { Type } from '@angular/core';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';

export class MockIconFontLoaderService {
  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-exclamation-circle';
  }
  addLinkResource() {}
  getHtml(_iconType: ICON_TYPE) {}
  getFlipDirection(): void {}
}

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

const PRODUCT_CODE = 'CONF_LAPTOP';

const defaultMockRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: {
    key: 'OWNER_KEY',
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
    configuratorType: ConfiguratorType.CPQ,
  },
  displayOnly: false,
  forceReload: false,
  resolveIssues: false,
};

const conflictConfiguration: Configurator.Configuration =
  ConfigurationTestData.productConfigurationWithConflicts;

const mockData: any = {
  conflictGroups: of(conflictConfiguration.groups[0].subGroups),
  routerData: of(defaultMockRouterData),
};

const mockDialogData$ = new BehaviorSubject<any>(mockData);

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return mockDialogData$.asObservable();
  }

  closeDialog(_reason: string): void {}
}

@Component({
  selector: 'cx-configurator-conflict-description',
  template: '',
})
class MockConfiguratorConflictDescriptionComponent {
  @Input() currentGroup: Configurator.Group;
}

@Component({
  selector: 'cx-configurator-conflict-suggestion',
  template: '',
})
class MockConfiguratorConflictSuggestionComponent {
  @Input() currentGroup: Configurator.Group;
  @Input() attribute: Configurator.Attribute;
  @Input() suggestionNumber: number;
}

@Component({
  selector: 'cx-configurator-attribute-header',
  template: '',
})
class MockConfiguratorAttributeHeaderComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() owner: CommonConfigurator.Owner;
  @Input() groupId: string;
  @Input() groupType: Configurator.GroupType;
  @Input() expMode: boolean;
  @Input() isNavigationToGroupEnabled = true;
}

@Component({
  selector: 'cx-configurator-attribute-footer',
  template: '',
})
class MockConfiguratorAttributeFooterComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() owner: CommonConfigurator.Owner;
  @Input() groupId: string;
}

@Component({
  selector: 'cx-configurator-attribute-checkbox',
  template: '',
})
class MockConfiguratorAttributeCheckBoxComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;
  @Input() expMode: boolean;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();
}

@Component({
  selector: 'cx-configurator-attribute-radio-button',
  template: '',
})
class MockConfiguratorAttributeRadioButtonComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() ownerKey: string;
  @Input() language: string;
  @Input() ownerType: string;
  @Input() expMode: boolean;
  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();
}

describe('ConfiguratorConflictSolverDialogComponent', () => {
  let component: ConfiguratorConflictSolverDialogComponent;
  let fixture: ComponentFixture<ConfiguratorConflictSolverDialogComponent>;
  let htmlElem: HTMLElement;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let launchDialogService: LaunchDialogService;
  let mockLanguageService;

  beforeEach(
    waitForAsync(() => {
      mockLanguageService = {
        getAll: () => of([]),
        getActive: jasmine.createSpy().and.returnValue(of('en')),
      };

      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconModule],
        declarations: [
          MockConfiguratorConflictDescriptionComponent,
          MockConfiguratorConflictSuggestionComponent,
          MockConfiguratorAttributeHeaderComponent,
          MockConfiguratorAttributeFooterComponent,
          MockConfiguratorAttributeCheckBoxComponent,
          MockConfiguratorAttributeRadioButtonComponent,
          ConfiguratorConflictSolverDialogComponent,
        ],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
          { provide: LanguageService, useValue: mockLanguageService },
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

    spyOn(configuratorCommonsService, 'updateConfiguration').and.callThrough();

    launchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

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
      'cx-configurator-conflict-description'
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-group-attribute',
      2
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'cx-configurator-conflict-suggestion',
      2
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'cx-configurator-attribute-header',
      2
    );

    CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'cx-configurator-attribute-footer',
      2
    );
  });

  describe('updateConfiguration', () => {
    it('should update a configuration through the facade layer ', () => {
      const event: ConfigFormUpdateEvent = {
        changedAttribute: undefined,
        ownerKey: 'product/TEST_PRODUCT',
        updateType: Configurator.UpdateType.ATTRIBUTE,
      };

      component.updateConfiguration(event);

      expect(configuratorCommonsService.updateConfiguration).toHaveBeenCalled();
      expect(
        configuratorCommonsService.updateConfiguration
      ).toHaveBeenCalledWith(
        event.ownerKey,
        event.changedAttribute,
        event.updateType
      );
    });
  });

  describe('dismissModal', () => {
    it('should close dialog when dismissModal is called', () => {
      const reason = 'Close conflict solver dialog';
      component.ngOnInit();
      component.dismissModal(reason);
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(reason);
    });
  });
});
