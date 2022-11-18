import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
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

describe('ConfigurationOverviewFilterButtonComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
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
