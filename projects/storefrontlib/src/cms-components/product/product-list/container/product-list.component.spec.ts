import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nTestingModule } from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable, of } from 'rxjs';
import { PageLayoutService } from '../../../../cms-structure';
import {
  ListNavigationModule,
  MediaComponent,
  SpinnerModule,
} from '../../../../shared';
import { ViewConfig } from '../../../../shared/config/view-config';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import {
  ProductViewComponent,
  ViewModes,
} from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
import { ProductListComponent } from './product-list.component';
import { ProductScrollComponent } from './product-scroll/product-scroll.component';
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

@Component({
  template: '',
  selector: 'cx-product-list-item',
})
class MockProductListItemComponent {
  @Input()
  product;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
class MockAddToCartComponent {
  @Input() product;
  @Input() showQuantity;
}

class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  model$ = of({});
}

class MockViewConfig {
  view = {
    infiniteScroll: {
      active: true,
      productLimit: 0,
      showMoreButton: false,
    },
  };
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let componentService: ProductListComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NgbCollapseModule,
          ListNavigationModule,
          FormsModule,
          RouterTestingModule,
          I18nTestingModule,
          InfiniteScrollModule,
          SpinnerModule,
        ],
        providers: [
          {
            provide: PageLayoutService,
            useClass: MockPageLayoutService,
          },
          {
            provide: ProductListComponentService,
            useClass: MockProductListComponentService,
          },
          {
            provide: ViewConfig,
            useClass: MockViewConfig,
          },
        ],
        declarations: [
          ProductListComponent,
          ProductFacetNavigationComponent,
          ProductGridItemComponent,
          MockStarRatingComponent,
          MockAddToCartComponent,
          MediaComponent,
          ProductViewComponent,
          MockProductListItemComponent,
          MockUrlPipe,
          MockCxIconComponent,
          ProductScrollComponent,
          MockFeatureLevelDirective,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    componentService = TestBed.inject(ProductListComponentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should get model from the service', () => {
      expect(component.model$).toBe(componentService.model$);
    });

    it('should use infinite scroll when config setting is active', () => {
      expect(component.isInfiniteScroll).toEqual(true);
    });
  });

  it('sortList should call service.sort', () => {
    component.sortList('testSortCode');
    expect(componentService.sort).toHaveBeenCalledWith('testSortCode');
  });

  it('setViewMode should set view mode', () => {
    component.setViewMode(ViewModes.List);
    expect(component.viewMode$.value).toBe(ViewModes.List);

    component.setViewMode(ViewModes.Grid);
    expect(component.viewMode$.value).toBe(ViewModes.Grid);
  });
});
