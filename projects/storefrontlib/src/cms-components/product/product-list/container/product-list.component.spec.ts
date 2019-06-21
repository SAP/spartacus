import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PageLayoutService } from '../../../../cms-structure';
import { ListNavigationModule, MediaComponent } from '../../../../shared';
import { ProductFacetNavigationComponent } from '../product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from '../product-grid-item/product-grid-item.component';
import {
  ProductViewComponent,
  ViewModes,
} from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
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
export class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input() productCode;
  @Input() showQuantity;
}

export class MockProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  clearSearchResults = createSpy('clearSearchResults');
  model$ = of({});
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let componentService: ProductListComponentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbCollapseModule,
        ListNavigationModule,
        FormsModule,
        RouterTestingModule,
        I18nTestingModule,
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    componentService = TestBed.get(ProductListComponentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should clear search results', () => {
      component.ngOnInit();
      expect(componentService.clearSearchResults).toHaveBeenCalled();
    });

    it('should get model from the service', () => {
      component.ngOnInit();
      expect(component.model$).toBe(componentService.model$);
    });
  });

  it('viewPage should call service.viewPage', () => {
    component.viewPage(123);
    expect(componentService.viewPage).toHaveBeenCalledWith(123);
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
