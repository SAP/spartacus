import { Directive, Input } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatureToggles, I18nTestingModule } from '@spartacus/core';
import { SortingComponent } from './sorting.component';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';

describe('SortingComponent', () => {
  @Directive({ selector: '[cxNgSelectA11y]' })
  class MockNgSelectA11yDirective {
    @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };
  }

  const mockFeatureToggles: FeatureToggles = {
    a11yRestoreFocusOnNgSelect: true,
  };

  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;
  let featureToggles: FeatureToggles;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgSelectModule,
        FormsModule,
        I18nTestingModule,
        SortingComponent,
        MockNgSelectA11yDirective,
      ],
      providers: [provideMockFeatureToggles({ ...mockFeatureToggles })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    featureToggles = TestBed.inject(FeatureToggles);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event', () => {
    spyOn(component.sortListEvent, 'emit');
    component.sortList('sortCode');
    expect(component.sortListEvent.emit).toHaveBeenCalledWith('sortCode');
  });

  describe('sortList() focus management (a11yRestoreFocusOnNgSelect)', () => {
    it('should focus the inner combobox after sort when toggle is enabled', fakeAsync(() => {
      const combobox = fixture.nativeElement.querySelector(
        '[role="combobox"]'
      ) as HTMLElement;
      spyOn(combobox, 'focus');

      component.sortList('relevance');
      tick(16);

      expect(combobox.focus).toHaveBeenCalled();
    }));

    it('should NOT focus the inner combobox after sort when toggle is disabled', fakeAsync(() => {
      featureToggles.a11yRestoreFocusOnNgSelect = false;
      const combobox = fixture.nativeElement.querySelector(
        '[role="combobox"]'
      ) as HTMLElement;
      spyOn(combobox, 'focus');

      component.sortList('relevance');
      tick(16);

      expect(combobox.focus).not.toHaveBeenCalled();
    }));
  });

  describe('selectedLabel', () => {
    it('should return name for selected option', () => {
      component.sortOptions = [
        {
          code: 'relevance',
          name: 'Relevance',
          selected: true,
        },
        {
          code: 'topRated',
          name: 'Top Rated',
          selected: false,
        },
        {
          code: 'name-asc',
          name: 'Name (ascending)',
          selected: false,
        },
        {
          code: 'name-desc',
          name: 'Name (descending)',
          selected: false,
        },
        {
          code: 'price-asc',
          name: 'Price (lowest first)',
          selected: false,
        },
        {
          code: 'price-desc',
          name: 'Price (highest first)',
          selected: false,
        },
      ];
      component.sortLabels = undefined;
      component.selectedOption = 'relevance';
      expect(component.selectedLabel).toBe('Relevance');
    });

    it('should return label for selected option if name does not exist', () => {
      component.sortOptions = [
        {
          code: 'relevance',
          selected: true,
        },
        {
          code: 'topRated',
          selected: false,
        },
        {
          code: 'name-asc',
          selected: false,
        },
        {
          code: 'name-desc',
          selected: false,
        },
        {
          code: 'price-asc',
          selected: false,
        },
        {
          code: 'price-desc',
          selected: false,
        },
      ];
      component.sortLabels = {
        relevance: 'Relevance',
        topRated: 'Top Rated',
        'name-asc': 'Name (ascending)',
        'name-desc': 'Name (descending)',
        'price-asc': 'Price (lowest first)',
        'price-desc': 'Price (highest first)',
      };
      component.selectedOption = 'topRated';
      expect(component.selectedLabel).toBe('Top Rated');
    });
  });
});
