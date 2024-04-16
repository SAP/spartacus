import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Product,
  ProductSearchPage,
} from '@spartacus/core';
import {
  LaunchDialogService,
  ListNavigationModule,
  PageLayoutService,
  SpinnerModule,
  ViewConfig,
  ViewModes,
} from '@spartacus/storefront';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { Observable, of } from 'rxjs';
import { BundleProductListComponent } from './bundle-product-list.component';
import { BundleProductListComponentService } from './bundle-product-list.service';
import createSpy = jasmine.createSpy;

// Mock Components
@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating: any;
  @Input() disabled: boolean;
}

@Component({
  template: '',
  selector: 'cx-bundle-product-list-item',
})
class MockBundleProductListItemComponent {
  @Input() product: Product;
}

@Component({
  selector: 'cx-bundle-product-grid-item',
  template: '',
})
class MockBundleProductGridItemComponent {
  @Input() product: Product;
}

@Component({
  selector: 'cx-product-scroll',
  template: '',
})
class MockCxScrollComponent {
  @Input() scrollConfig: ViewConfig;
  @Input() model: ProductSearchPage;
  @Input() inputViewMode: ViewModes;
}

@Component({
  selector: 'cx-product-view',
  template: '',
})
class MockCxProductViewComponent {
  @Input() mode: ViewModes;
}

// Mock Services
class MockPageLayoutService {
  getSlots(): Observable<string[]> {
    return of(['LogoSlot']);
  }
  get templateName$(): Observable<string> {
    return of('LandingPage2Template');
  }
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

class MockGlobalMessageService {
  add = createSpy();
}

const mockProduct: Product = {
  code: '1',
};

const mockProductSearchPage: ProductSearchPage = {
  products: [mockProduct],
  pagination: {
    totalResults: 1,
  },
  sorts: [{ code: 'name-asc', selected: true }],
};

class MockBundleProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  availableEntities$ = of(mockProductSearchPage);
  checkDetails = createSpy('checkDetails');
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
  openDialogAndSubscribe = createSpy('openDialogAndSubscribe');
}

describe('BundleProductListComponent', () => {
  let component: BundleProductListComponent;
  let fixture: ComponentFixture<BundleProductListComponent>;
  let componentService: BundleProductListComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ListNavigationModule,
          FormsModule,
          RouterTestingModule,
          I18nTestingModule,
          InfiniteScrollModule,
          SpinnerModule,
        ],
        providers: [
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          {
            provide: PageLayoutService,
            useClass: MockPageLayoutService,
          },
          {
            provide: BundleProductListComponentService,
            useClass: MockBundleProductListComponentService,
          },
          {
            provide: ViewConfig,
            useClass: MockViewConfig,
          },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
        ],
        declarations: [
          BundleProductListComponent,
          MockBundleProductListItemComponent,
          MockBundleProductGridItemComponent,
          MockStarRatingComponent,
          MockFeatureLevelDirective,
          MockCxScrollComponent,
          MockCxProductViewComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleProductListComponent);
    component = fixture.componentInstance;
    componentService = TestBed.inject(BundleProductListComponentService);
    fixture.detectChanges();
  });

  it('Component should create', () => {
    expect(component).toBeDefined();
  });

  it('ComponentService should create', () => {
    expect(componentService).toBeDefined();
  });

  describe('onInit', () => {
    it('Should set infinite scroll due to viewConfig', () => {
      expect(component.isInfiniteScroll).toBe(true);
    });

    it('should set viewMode based on template', () => {
      MockPageLayoutService.prototype.templateName$.subscribe((template) => {
        expect(component.viewMode$.value).toBe(
          template === 'ProductGridPageTemplate'
            ? ViewModes.Grid
            : ViewModes.List
        );
      });
    });

    it('should send a message when availableEntities$ and viewMode$ change', () => {
      const globalMessageService = TestBed.inject(GlobalMessageService);
      component.viewMode$.next(ViewModes.Grid);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'sorting.pageViewUpdated' },
        GlobalMessageType.MSG_TYPE_ASSISTIVE,
        500
      );
    });
  });

  it('should sort products', () => {
    component.sortList('name-asc');
    expect(componentService.sort).toHaveBeenCalledWith('name-asc');
  });

  it('should set view mode', () => {
    component.setViewMode(ViewModes.Grid);
    expect(component.viewMode$.value).toBe(ViewModes.Grid);
  });

  it('should open dialog when check details', () => {
    const launchDialogService = TestBed.inject(LaunchDialogService);

    component.checkDetails(mockProduct);

    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    expect(componentService.checkDetails).toHaveBeenCalledWith(mockProduct);
  });
});
