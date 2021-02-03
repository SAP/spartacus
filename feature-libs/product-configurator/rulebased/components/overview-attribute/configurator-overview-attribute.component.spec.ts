import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfiguratorOverviewAttributeComponent } from './configurator-overview-attribute.component';

describe('ConfigurationOverviewAttributeComponent', () => {
  let component: ConfiguratorOverviewAttributeComponent;
  let fixture: ComponentFixture<ConfiguratorOverviewAttributeComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, NgSelectModule],
        declarations: [ConfiguratorOverviewAttributeComponent],
        providers: [],
      });
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorOverviewAttributeComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attributeOverview = {
      attribute: 'Test Attribute Name',
      value: 'Test Attribute Value',
    };
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should show attribute value', () => {
    expect(htmlElem.querySelectorAll('.cx-attribute-value').length).toBe(1);

    expect(htmlElem.querySelectorAll('.cx-attribute-label').length).toBe(1);
  });
});
