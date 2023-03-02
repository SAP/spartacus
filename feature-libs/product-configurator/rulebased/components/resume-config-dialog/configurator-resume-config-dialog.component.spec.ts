import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from 'feature-libs/product-configurator/common/testing/common-configurator-test-utils.service';
import { of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';

import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';

const owner: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('ConfiguratorResumeConfigDialogComponent', () => {
  let component: ConfiguratorResumeConfigDialogComponent;
  let fixture: ComponentFixture<ConfiguratorResumeConfigDialogComponent>;
  let htmlElem: HTMLElement;

  let mockLaunchDialogService: LaunchDialogService;
  let mockConfigCommonsService: ConfiguratorCommonsService;

  function initialize() {
    fixture = TestBed.createComponent(ConfiguratorResumeConfigDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockLaunchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(mockLaunchDialogService, 'closeDialog');
  }

  class MockLaunchDialogService {
    closeDialog(): void {}
    data$ = of({ previousOwner: owner });
  }

  function initializeMocks() {
    mockConfigCommonsService = jasmine.createSpyObj([
      'removeConfiguration',
      'getOrCreateConfiguration',
    ]);
  }

  //function asSpy(f: any) {
  //  return <jasmine.Spy>f;
  //}

  beforeEach(
    waitForAsync(() => {
      initializeMocks();
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorResumeConfigDialogComponent,
          MockCxIconComponent,
          MockKeyboadFocusDirective,
        ],
        imports: [I18nTestingModule],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: ConfiguratorCommonsService,
            useValue: mockConfigCommonsService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    initialize();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should render title, description, discard button and resume button', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-title'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-configurator-dialog-description'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-configurator-dialog-discard'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-configurator-dialog-resume'
    );
  });

  it('resume should close the dialog when selecting resume', () => {
    fixture.debugElement
      .query(By.css('.cx-configurator-dialog-resume'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(mockConfigCommonsService.removeConfiguration).not.toHaveBeenCalled();
    expect(
      mockConfigCommonsService.getOrCreateConfiguration
    ).not.toHaveBeenCalled();
  });

  it('discardConfig should create a new default config', () => {
    fixture.debugElement
      .query(By.css('.cx-configurator-dialog-discard'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalled();
    expect(mockConfigCommonsService.removeConfiguration).toHaveBeenCalled();
    expect(
      mockConfigCommonsService.getOrCreateConfiguration
    ).toHaveBeenCalledWith(owner, undefined, true);
  });
});
