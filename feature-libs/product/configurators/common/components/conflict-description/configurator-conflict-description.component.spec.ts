import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorConflictDescriptionComponent } from './configurator-conflict-description.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('ConfigurationConflictDescriptionComponent', () => {
  let component: ConfiguratorConflictDescriptionComponent;
  let fixture: ComponentFixture<ConfiguratorConflictDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfiguratorConflictDescriptionComponent,
        MockCxIconComponent,
      ],
      imports: [],
      providers: [],
    })
      .overrideComponent(ConfiguratorConflictDescriptionComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorConflictDescriptionComponent);
    component = fixture.componentInstance;
  });
  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should return true for conflict group', () => {
    const conflictGroup = { groupType: Configurator.GroupType.CONFLICT_GROUP };
    expect(component.displayConflictDescription(conflictGroup)).toBe(true);
    const group = { groupType: Configurator.GroupType.ATTRIBUTE_GROUP };
    expect(component.displayConflictDescription(group)).toBe(false);
  });
});
