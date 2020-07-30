import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfigConflictDescriptionComponent } from './config-conflict-description.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('ConfigurationConflictDescriptionComponent', () => {
  let component: ConfigConflictDescriptionComponent;

  let fixture: ComponentFixture<ConfigConflictDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigConflictDescriptionComponent, MockCxIconComponent],
      imports: [],
      providers: [],
    })
      .overrideComponent(ConfigConflictDescriptionComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigConflictDescriptionComponent);
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
