import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigOverviewAttributeComponent } from './config-overview-attribute.component';

describe('ConfigurationOverviewAttributeComponent', () => {
  let component: ConfigOverviewAttributeComponent;
  let fixture: ComponentFixture<ConfigOverviewAttributeComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigOverviewAttributeComponent],
      providers: [],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOverviewAttributeComponent);
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
    expect(
      htmlElem.querySelectorAll('.cx-config-overview-attribute-value').length
    ).toBe(1);
  });
});
