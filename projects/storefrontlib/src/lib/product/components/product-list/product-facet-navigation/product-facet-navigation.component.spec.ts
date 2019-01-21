import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
import { NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProductFacetNavigationComponent in product-list', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;
  let element: DebugElement;

  const mockFacetsValues = [
    {
      name: 'Test Facet 01'
    },
    {
      name: 'Test Facet 02'
    },
    {
      name: 'Test Facet 03'
    }
  ];

  const mockFacets = [
    {
      name: 'Test Facet 01',
      values: mockFacetsValues,
      visible: true
    },
    {
      name: 'Test Facet 02',
      values: mockFacetsValues,
      visible: true
    },
    {
      name: 'Test Facet 03',
      values: mockFacetsValues,
      visible: true
    },
    {
      name: 'Test Facet 04',
      values: mockFacetsValues,
      visible: false
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbCollapseModule, NgbModalModule],
      declarations: [ProductFacetNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFacetNavigationComponent);
    component = fixture.componentInstance;

    spyOn(component.filter, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define query decoder', () => {
    expect(component.queryCodec).toBeDefined();
  });

  it('should toggle value', () => {
    component.toggleValue('mockQuery');
    expect(component.filter.emit).toHaveBeenCalledWith('mockQuery');
  });

  describe('ProductFacetNavigationComponent UI tests', () => {
    beforeEach(() => {
      component.activeFacetValueCode = '0';
      component.searchResult = {
        facets: mockFacets
      };
      element = fixture.debugElement;
      fixture.detectChanges();
    });

    it(`should not show facet groups if there are no facets`, () => {
      component.searchResult.facets = [];
      fixture.detectChanges();

      const facetGroups = element.queryAll(By.css('.cx-search-facet-group'));
      expect(facetGroups.length).toEqual(0);
    });

    it(`should show correct number of facet groups`, () => {
      const facetGroups = element.queryAll(By.css('.cx-search-facet-group'));
      expect(facetGroups.length).toEqual(3);
    });

    it(`should show correct title`, () => {
      const facetTitle = element.query(By.css('.cx-search-facet-header'))
        .nativeElement;
      expect(facetTitle.textContent).toContain(
        component.searchResult.facets[0].name
      );
    });

    it(`should toggle facet after clicking the title`, () => {
      const facetTitleLink = element.query(
        By.css('.cx-search-facet-header__link')
      );
      const facetCollapsableList = element.query(
        By.css('.cx-search-facet-header + .collapse')
      );

      expect(facetCollapsableList.nativeElement.className).toContain('show');

      facetTitleLink.nativeElement.click();
      fixture.detectChanges();

      expect(facetCollapsableList.nativeElement.className).not.toContain(
        'show'
      );

      facetTitleLink.nativeElement.click();
      fixture.detectChanges();

      expect(facetCollapsableList.nativeElement.className).toContain('show');
    });
  });
});
