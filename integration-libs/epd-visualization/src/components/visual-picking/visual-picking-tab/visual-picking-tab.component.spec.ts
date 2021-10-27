import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ProductReference } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { VisualPickingTabComponent } from './visual-picking-tab.component';
import { VisualPickingProductFilterModule } from '../visual-picking-product-filter/visual-picking-product-filter.module';
import { VisualViewerModule } from '../../visual-viewer';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from '../visual-picking-product-list/visual-picking-product-list.service';
import { VisualPickingTabService } from './visual-picking-tab.service';
import { VisualPickingProductListComponent } from '../visual-picking-product-list/visual-picking-product-list.component';
import {
  VisualPickingProductListItem,
  VisualPickingProductListModule,
} from '../visual-picking-product-list';
import { VisualPickingProductFilterService } from '../visual-picking-product-filter/visual-picking-product-filter.service';
import { VisualPickingProductFilterComponent } from '../visual-picking-product-filter/visual-picking-product-filter.component';
import { Component } from '@angular/core';

class MockVisualPickingTabService {
  visualViewerService: VisualViewerService;
  visualPickingProductListService: VisualPickingProductListService;

  public initialize(
    _visualViewerService: VisualViewerService,
    _visualPickingProductListService: VisualPickingProductListService
  ): void {}
}

class MockVisualPickingProductFilterService {
  filter = '';

  getFilteredProducts$(
    _unfilteredProductReferences$: Observable<ProductReference[]>
  ): Observable<ProductReference[]> {
    return of([]);
  }
}

class MockVisualPickingProductListService {
  public getCurrentProductReferences$(): Observable<ProductReference[]> {
    return of([]);
  }

  public getFilteredProductReferences$(): Observable<ProductReference[]> {
    return of([]);
  }

  public get filteredItems$(): Observable<VisualPickingProductListItem[]> {
    return of([]);
  }
}

@Component({
  selector: 'cx-page-layout',
  template: 'mock',
})
class MockPageLayoutComponent {}

describe('VisualPickingTabComponent', () => {
  let visualPickingTabComponent: VisualPickingTabComponent;
  let fixture: ComponentFixture<VisualPickingTabComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IconModule,
        FormsModule,
        I18nModule,
        UrlModule,
        RouterTestingModule.withRoutes([
          {
            path: 'product',
            component: MockPageLayoutComponent,
          },
        ]),
        HttpClientTestingModule,
        VisualViewerModule,
        VisualPickingProductListModule,
        VisualPickingProductFilterModule,
      ],
    })
      .overrideModule(VisualPickingProductFilterModule, {
        set: {
          providers: [
            {
              provide: VisualPickingProductFilterService,
              useClass: MockVisualPickingProductFilterService,
            },
          ],
        },
      })
      .overrideComponent(VisualPickingTabComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingTabService,
              useClass: MockVisualPickingTabService,
            },
          ],
        },
      })
      .overrideComponent(VisualPickingProductFilterComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingProductFilterService,
              useClass: MockVisualPickingProductFilterService,
            },
          ],
        },
      })
      .overrideComponent(VisualPickingProductListComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingProductListService,
              useClass: MockVisualPickingProductListService,
            },
          ],
        },
      })
      .compileComponents();

    TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(VisualPickingTabComponent);
    visualPickingTabComponent = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create visual picking tab component', () => {
    expect(visualPickingTabComponent).toBeTruthy();
  });
});
