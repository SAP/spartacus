import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingComponent } from './sorting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { Directive, Input } from '@angular/core';

describe('SortingComponent', () => {
  @Directive({
    selector: '[cxNgSelectA11y]',
  })
  class MockNgSelectA11yDirective {
    @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };
  }

  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgSelectModule, FormsModule, I18nTestingModule],
        declarations: [SortingComponent, MockNgSelectA11yDirective],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
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
