import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfigOverviewAttributeComponent } from './config-overview-attribute.component';

describe('ConfigurationOverviewAttributeComponent', () => {
  let component: ConfigOverviewAttributeComponent;
  let fixture: ComponentFixture<ConfigOverviewAttributeComponent>;

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
    component.values = {
      attribute: 'Test Attribute Name',
      value: 'Test Attribute Value',
    };
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
