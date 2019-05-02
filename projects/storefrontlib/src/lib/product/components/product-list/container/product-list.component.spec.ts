import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgbCollapseModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  I18nTestingModule,
  ProductSearchPage,
  ProductSearchService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AddToCartComponent } from '../../../../../cms-components/checkout';
import { MediaComponent } from '../../../../ui/components/media/media.component';
import { PaginationAndSortingModule } from '../../../../ui/components/pagination-and-sorting/pagination-and-sorting.module';
import { PaginationComponent } from '../../../../ui/components/pagination-and-sorting/pagination/pagination.component';
import { SortingComponent } from '../../../../ui/components/pagination-and-sorting/sorting/sorting.component';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import {
  ProductViewComponent,
  ViewModes,
} from '../product-view/product-view.component';
import { PageLayoutService } from './../../../../cms/page-layout/page-layout.service';
import { ProductListComponent } from './product-list.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

class MockPageLayoutService {
  getSlots(): Observable<string[]> {
    return of(['LogoSlot']);
  }
  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
  }
}

class MockProductSearchService {
  search = createSpy('search');
  searchResults$ = of();

  getSearchResults(): Observable<ProductSearchPage> {
    return of();
  }

  clearSearchResults(): void {}
}
class MockActivatedRoute {
  params = of();
  snapshot = { queryParams: {} };
  setParams = params => (this.snapshot.queryParams = params);
}
@Component({
  template: '',
  selector: 'cx-product-list-item',
})
class MockProductListItemComponent {
  @Input()
  product;
}

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

@Pipe({
  name: 'stripHtml',
})
class MockStripHtmlPipe implements PipeTransform {
  transform(): any {}
}

describe('ProductListComponent in product-list', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbPaginationModule,
        NgbCollapseModule,
        NgbRatingModule,
        PaginationAndSortingModule,
        FormsModule,
        RouterTestingModule,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: ProductSearchService,
          useClass: MockProductSearchService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
      ],
      declarations: [
        ProductListComponent,
        ProductFacetNavigationComponent,
        ProductGridItemComponent,
        MockStarRatingComponent,
        AddToCartComponent,
        MediaComponent,
        ProductViewComponent,
        MockProductListItemComponent,
        MockTranslateUrlPipe,
        MockStripHtmlPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update() method to be defined', done => {
    expect(component.update).toBeDefined();
    done();
  });

  it('should change pages', done => {
    const pagination = new PaginationComponent();
    component.query = 'mockQuery';
    pagination.viewPageEvent.subscribe(event => {
      expect(event).toEqual(1);
      component.viewPage(event);
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });

    pagination.pageChange(2);
  });

  it('should change sortings', done => {
    const pagination = new SortingComponent();
    component.query = 'mockQuery';
    pagination.sortListEvent.subscribe(event => {
      expect(event).toEqual('sortCode');
      component.viewPage(event);
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });

    pagination.sortList('sortCode');
  });

  it('should change view mode to grid from default list', done => {
    const viewMode = new ProductViewComponent();
    viewMode.modeChange.subscribe(event => {
      expect(event).toEqual(ViewModes.Grid);
      done();
    });

    viewMode.changeMode();
  });
});
