import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { NEVER, of } from 'rxjs';
import { Component, Directive, Input } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';

let component: ConfiguratorOverviewFilterDialogComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterDialogComponent>;
let htmlElem: HTMLElement;

let mockLaunchDialogService: any;

const ovConfig = ConfigurationTestData.productConfiguration;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterDialogComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function initializeMocks() {
  mockLaunchDialogService = {
    closeDialog: jasmine.createSpy(),
    data$: of(ovConfig),
  };
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-configurator-overview-filter',
  template: '',
})
class MockConfiguratorOverviewFilterComponent {
  @Input() showFilterBar: boolean = true;
  @Input() config: Configurator.ConfigurationWithOverview;
}
@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('ConfiguratorOverviewFilterDialogComponent', () => {
  beforeEach(
    waitForAsync(() => {
      initializeMocks();
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorOverviewFilterDialogComponent,
          MockCxIconComponent,
          MockConfiguratorOverviewFilterComponent,
          MockKeyboadFocusDirective,
        ],
        imports: [I18nTestingModule],
        providers: [
          { provide: LaunchDialogService, useValue: mockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

  it('should create component', () => {
    initialize();
    expect(component).toBeDefined();
  });

  it('should close filter modal on request', () => {
    initialize();
    fixture.debugElement
      .query(By.css('.cx-dialog-header button'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Filtering'
    );
  });

  it('should close filter modal when clicking outside', () => {
    initialize();
    fixture.debugElement
      .query(By.css('.cx-modal-container'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Filtering'
    );
  });

  it('should not close filter modal when clicking inside the modal', () => {
    initialize();
    fixture.debugElement
      .query(By.css('.cx-modal-content'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).not.toHaveBeenCalled();
  });

  it('should close filter modal when pressing esc', () => {
    initialize();
    fixture.debugElement
      .query(By.css('.cx-modal-content'))
      .triggerEventHandler('esc');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Filtering'
    );
  });

  it('should render close button', () => {
    initialize();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.close'
    );
  });

  it('should render title', () => {
    initialize();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-title'
    );
  });

  it('should have modal header and body', () => {
    initialize();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-header'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-body'
    );
  });
  it('should not have a modal body if nothing is emitted', () => {
    mockLaunchDialogService.data$ = NEVER;
    initialize();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-header'
    );

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-dialog-body'
    );
  });

  describe('to support A11Y', () => {
    it('close button should have descriptive title', () => {
      initialize();
      CommonConfiguratorTestUtilsService.expectElementToHaveAttributeWithValue(
        expect,
        htmlElem,
        '.cx-dialog-header button',
        'title',
        'configurator.a11y.closeFilterMenu'
      );
    });
  });
});
