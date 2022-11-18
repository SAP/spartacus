import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorOverviewFilterDialogComponent } from './configurator-overview-filter-dialog.component';

let component: ConfiguratorOverviewFilterDialogComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterDialogComponent>;
//let htmlElem: HTMLElement;

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
      }).compileComponents();
    })
  );
  beforeEach(() => {
    initialize();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
