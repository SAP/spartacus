import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
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
  ViewModes
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

class MockBundleProductListComponentService {
  setQuery = createSpy('setQuery');
  viewPage = createSpy('viewPage');
  sort = createSpy('sort');
  availableEntities$ = of({});
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: any) {}
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
});
