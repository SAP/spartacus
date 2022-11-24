import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from 'feature-libs/product-configurator/common/testing/common-configurator-test-utils.service';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';

let component: ConfiguratorOverviewFilterButtonComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterButtonComponent>;
let htmlElem: HTMLElement;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterButtonComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

let mockLaunchDialogService: LaunchDialogService = jasmine.createSpyObj([
  'openDialog',
]);

describe('ConfigurationOverviewFilterButtonComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ConfiguratorOverviewFilterButtonComponent],
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

  it('should open filter modal on request', () => {
    component.openFilterModal();
    expect(mockLaunchDialogService.openDialog).toHaveBeenCalled();
  });

  it('should render filter button', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-filter-button'
    );
  });
});
