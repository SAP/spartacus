import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
import { NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('ProductFacetNavigationComponent in product-list', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;
  let element: DebugElement;

  const mockFacets = [
    {
      category: false,
      multiSelect: false,
      name: 'Test Facet 01',
      priority: 100,
      values: [
        {
          count: 1,
          name: 'Test Facet 0101',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0102',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0103',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        }
      ],
      visible: true
    },
    {
      category: false,
      multiSelect: false,
      name: 'Test Facet 02',
      priority: 200,
      values: [
        {
          count: 1,
          name: 'Test Facet 0201',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0202',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0203',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        }
      ],
      visible: true
    },
    {
      category: false,
      multiSelect: false,
      name: 'Test Facet 03',
      priority: 300,
      values: [
        {
          count: 1,
          name: 'Test Facet 0301',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0302',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0303',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        }
      ],
      visible: true
    },
    {
      category: false,
      multiSelect: false,
      name: 'Test Facet 04',
      priority: 200,
      values: [
        {
          count: 1,
          name: 'Test Facet 0401',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0402',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        },
        {
          count: 1,
          name: 'Test Facet 0403',
          query: {
            query: {
              value: ''
            },
            url: ''
          }
        }
      ],
      visible: false
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbCollapseModule, NgbModalModule],
      declarations: [ProductFacetNavigationComponent]
    })
      .overrideComponent(ProductFacetNavigationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
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
      component.searchResult = {};
      element = fixture.debugElement;
    });

    it(`should not show facet groups if there are no facets`, () => {
      component.searchResult.facets = [];
      fixture.detectChanges();

      const facetGroups = element.queryAll(By.css('.y-search-facet-group'));
      expect(facetGroups.length).not.toBeGreaterThan(0);
    });

    it(`should not show facet groups if there are no visible facets`, () => {
      component.searchResult.facets = mockFacets.filter(
        facet => !facet.visible
      );
      fixture.detectChanges();

      const facetGroups = element.queryAll(By.css('.y-search-facet-group'));
      expect(facetGroups.length).not.toBeGreaterThan(0);
    });

    it(`should show correct number of facet groups`, () => {
      component.searchResult.facets = mockFacets.filter(facet => facet.visible);
      fixture.detectChanges();

      const facetGroups = element.queryAll(By.css('.y-search-facet-group'));
      expect(facetGroups.length).toEqual(3);
    });

    it(`should show correct title`, () => {
      component.searchResult.facets = [
        mockFacets.filter(facet => facet.visible)[0]
      ];
      fixture.detectChanges();

      const facetTitle = element.query(By.css('.y-search-facet-header'))
        .nativeElement;
      expect(facetTitle.textContent).toContain(
        component.searchResult.facets[0].name
      );
    });

    it(`should toggle facet after clicking the title`, () => {
      component.searchResult.facets = [
        mockFacets.filter(facet => facet.visible)[0]
      ];
      fixture.detectChanges();

      const facetTitleLink = element.query(
        By.css('.y-search-facet-header__link')
      );
      const facetCollapsableList = element.query(
        By.css('.y-search-facet-header + .collapse')
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
