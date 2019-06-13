import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  I18nTestingModule,
  ProductSearchPage,
  ProductSearchService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
import { ModalService } from '../../../../shared/components/modal/index';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('ProductFacetNavigationComponent in product-list', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;
  let element: DebugElement;
  let service: ProductSearchService;

  class MockProductSearchService {
    search = jasmine.createSpy('search');
    getResults(): Observable<ProductSearchPage> {
      return of();
    }

    clearSearchResults(): void {}
  }
  class MockActivatedRoute {
    params = of();
  }

  const mockFacetsValues = [
    {
      name: 'Test Facet 01',
    },
    {
      name: 'Test Facet 02',
    },
    {
      name: 'Test Facet 03',
    },
  ];

  const mockFacets = [
    {
      name: 'Test Facet 01',
      values: mockFacetsValues,
      visible: true,
    },
    {
      name: 'Test Facet 02',
      values: mockFacetsValues,
      visible: true,
    },
    {
      name: 'Test Facet 03',
      values: mockFacetsValues,
      visible: true,
    },
    {
      name: 'Test Facet 04',
      values: mockFacetsValues,
      visible: false,
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ProductFacetNavigationComponent, MockCxIconComponent],
      providers: [
        {
          provide: ProductSearchService,
          useClass: MockProductSearchService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        { provide: ModalService, useValue: { open: () => {} } },
      ],
    })
      .overrideComponent(ProductFacetNavigationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFacetNavigationComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProductSearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define query decoder', () => {
    expect(component.queryCodec).toBeDefined();
  });

  it('should toggle value', () => {
    component.toggleValue('mockQuery');
    expect(service.search).toHaveBeenCalledWith('mockQuery');
  });

  describe('ProductFacetNavigationComponent UI tests', () => {
    beforeEach(() => {
      component.ngOnInit();
      spyOn(service, 'getResults').and.returnValue(
        of({
          facets: mockFacets,
        })
      );
      fixture.detectChanges();
      element = fixture.debugElement;
    });

    it('should not show facet groups if there are no facets', () => {
      component.searchResult.facets = [];
      fixture.detectChanges();

      const facetGroups = element.queryAll(By.css('.cx-facet-group'));
      expect(facetGroups.length).toEqual(0);
    });

    it('should show correct number of facet groups', () => {
      component.searchResult.facets = mockFacets;
      fixture.detectChanges();

      const facetGroups = element.queryAll(By.css('.cx-facet-group'));
      expect(facetGroups.length).toEqual(3);
    });

    it('should show correct title', () => {
      const facetTitle = element.query(By.css('.cx-facet-header'))
        .nativeElement;
      expect(facetTitle.textContent).toContain(
        component.searchResult.facets[0].name
      );
    });

    it('should toggle facet after clicking the title', () => {
      const group = element.query(By.css('.cx-facet-group'));
      const trigger = group.children
        .find(child =>
          child.nativeElement.className.includes('cx-facet-header')
        )
        .query(By.css('.cx-facet-header-link')).nativeElement;
      const getList = () =>
        group.children.find(child =>
          child.nativeElement.className.includes('cx-facet-list')
        );
      let list = getList();

      // initial state
      expect(list && list.nativeElement).toBeTruthy();

      trigger.click();
      fixture.detectChanges();
      list = getList();

      // after first click, should not be visible
      expect(list && list.nativeElement).toBeFalsy();

      trigger.click();
      fixture.detectChanges();
      list = getList();

      // after second click, should be visible
      expect(list && list.nativeElement).toBeTruthy();
    });
  });
});
