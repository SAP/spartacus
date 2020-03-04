import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigOverviewAttributeComponent } from './config-overview-attribute.component';

describe('ConfigurationOverviewAttributeComponent', () => {
  let component: ConfigOverviewAttributeComponent;
  let fixture: ComponentFixture<ConfigOverviewAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigOverviewAttributeComponent],
      providers: [],
    })
      .overrideComponent(ConfigAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOverviewAttributeComponent);
    component = fixture.componentInstance;
    component.values = {
      attribute: 'Test Attribute Name',
      value: 'Test Attribute Value',
    };
  });

  it('should create  component', () => {
    expect(component).toBeDefined();
  });
});
