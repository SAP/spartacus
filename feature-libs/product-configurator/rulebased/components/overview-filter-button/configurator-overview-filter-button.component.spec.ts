import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';

let component: ConfiguratorOverviewFilterButtonComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterButtonComponent>;
//let htmlElem: HTMLElement;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterButtonComponent);
  //htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfigurationOverviewFormComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorOverviewFilterButtonComponent],
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
