import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';

let component: ConfiguratorOverviewFilterDialogComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterDialogComponent>;
let htmlElem: HTMLElement;

let mockLaunchDialogService: LaunchDialogService;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterDialogComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function initializeMocks() {
  mockLaunchDialogService = jasmine.createSpyObj(['closeDialog']);
}

describe('ConfiguratorOverviewFilterDialogComponent', () => {
  beforeEach(
    waitForAsync(() => {
      initializeMocks();
      TestBed.configureTestingModule({
        declarations: [ConfiguratorOverviewFilterDialogComponent],
        imports: [I18nTestingModule],
        providers: [
          { provide: LaunchDialogService, useValue: mockLaunchDialogService },
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

  it('should close filter modal on request', () => {
    fixture.debugElement
      .query(By.css('.cx-dialog-header button'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Filtering'
    );
  });

  it('should close filter modal when clicking outside', () => {
    fixture.debugElement
      .query(By.css('.cx-modal-container'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Filtering'
    );
  });

  it('should not close filter modal when clicking inside the modal', () => {
    fixture.debugElement
      .query(By.css('.cx-modal-content'))
      .triggerEventHandler('click');
    expect(mockLaunchDialogService.closeDialog).not.toHaveBeenCalled();
  });

  it('should close filter modal when pressing esc', () => {
    fixture.debugElement
      .query(By.css('.cx-modal-content'))
      .triggerEventHandler('esc');
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Filtering'
    );
  });

  it('should render close button', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.close'
    );
  });

  it('should render title', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-dialog-title'
    );
  });

  it('should have modal header and body', () => {
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

  describe('A11Y', () => {
    it('close button should have descriptive title', () => {
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
