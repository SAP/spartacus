import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorOverviewFilterComponent } from './configurator-overview-filter.component';

let component: ConfiguratorOverviewFilterComponent;
let fixture: ComponentFixture<ConfiguratorOverviewFilterComponent>;
//let htmlElem: HTMLElement;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewFilterComponent);
  //htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

describe('ConfigurationOverviewFilterComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorOverviewFilterComponent],
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
