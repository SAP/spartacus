import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorConflictSuggestionComponent } from './configurator-conflict-suggestion.component';

describe('ConfigurationConflictSuggestionComponent', () => {
  let component: ConfiguratorConflictSuggestionComponent;
  let fixture: ComponentFixture<ConfiguratorConflictSuggestionComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorConflictSuggestionComponent],
        imports: [I18nTestingModule],
        providers: [],
      })
        .overrideComponent(ConfiguratorConflictSuggestionComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorConflictSuggestionComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should return true for conflict group with more than one attribute', () => {
    const conflictGroup1: Configurator.Group = {
      ...ConfiguratorTestUtils.createGroup('1'),
      groupType: Configurator.GroupType.CONFLICT_GROUP,
    };
    expect(component.displayConflictSuggestion(conflictGroup1)).toBe(false);
    const conflictGroup2 = {
      ...ConfiguratorTestUtils.createGroup('2'),
      groupType: Configurator.GroupType.CONFLICT_GROUP,
      attributes: [{ name: '1' }],
    };
    expect(component.displayConflictSuggestion(conflictGroup2)).toBe(false);
    const conflictGroup3 = {
      ...ConfiguratorTestUtils.createGroup('3'),

      groupType: Configurator.GroupType.CONFLICT_GROUP,
      attributes: [{ name: '1' }, { name: '2' }],
    };
    expect(component.displayConflictSuggestion(conflictGroup3)).toBe(true);
    const group = {
      ...ConfiguratorTestUtils.createGroup('4'),
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
    };
    expect(component.displayConflictSuggestion(group)).toBe(false);
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      const conflictGroup = {
        ...ConfiguratorTestUtils.createGroup('1'),

        groupType: Configurator.GroupType.CONFLICT_GROUP,
        attributes: [
          { name: 'attribute_01', label: 'attribute_label_01' },
          { name: 'attribute_02', label: 'attribute_label_02' },
        ],
      };
      component.currentGroup = conflictGroup;
      component.suggestionNumber = 1;
      component.attribute = conflictGroup.attributes[0];
      fixture.detectChanges();
    });

    it("should contain div element with class name 'cx-title' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-title',
        0,
        'aria-label',
        'configurator.conflict.suggestionTitle number:2 configurator.conflict.suggestionText attribute:' +
          component.attribute.label
      );
    });

    it("should contain span element 'aria-hidden' attribute that removes span element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        0,
        'aria-hidden',
        'true',
        'configurator.conflict.suggestionTitle number:2'
      );
    });

    it("should contain span element 'aria-hidden' attribute that hides span content with suggestion text from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        1,
        'aria-hidden',
        'true',
        'configurator.conflict.suggestionText attribute:' +
          component.attribute.label
      );
    });
  });
});
