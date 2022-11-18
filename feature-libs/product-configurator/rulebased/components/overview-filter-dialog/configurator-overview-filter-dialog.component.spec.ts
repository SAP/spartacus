import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';

let component: ConfiguratorOverviewFilterDialogComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterDialogComponent>;
//let htmlElem: HTMLElement;

let mockLaunchDialogService: LaunchDialogService = jasmine.createSpyObj([
  'closeDialog',
]);

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterDialogComponent);
  //htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfiguratorOverviewFilterDialogComponent', () => {
  beforeEach(
    waitForAsync(() => {
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
    component.closeFilterModal();
    expect(mockLaunchDialogService.closeDialog).toHaveBeenCalledWith(
      'Skipping Filtering'
    );
  });
});
