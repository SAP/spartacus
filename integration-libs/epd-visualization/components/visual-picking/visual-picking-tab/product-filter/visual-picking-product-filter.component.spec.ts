import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nModule,
  MockTranslatePipe,
  ProductReference,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { VisualPickingProductFilterComponent } from './visual-picking-product-filter.component';
import { VisualPickingProductFilterService } from './visual-picking-product-filter.service';

class MockVisualPickingProductFilterService {
  set filter(filter: string) {
    expect(filter).toBe('2');
    this._filter = filter;
  }
  get filter() {
    return this._filter;
  }
  _filter = '';

  getFilteredProducts(
    _unfilteredProductReferences$: Observable<ProductReference[]>
  ): Observable<ProductReference[]> {
    return of([]);
  }
}

describe('VisualPickingProductFilterComponent', () => {
  let visualPickingProductFilterComponent: VisualPickingProductFilterComponent;
  let fixture: ComponentFixture<VisualPickingProductFilterComponent>;
  let mockVisualPickingProductFilterService =
    new MockVisualPickingProductFilterService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualPickingProductFilterComponent, MockTranslatePipe],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        I18nModule,
        CommonModule,
        FormsModule,
        UrlModule,
        IconModule,
      ],
      providers: [
        {
          provide: VisualPickingProductFilterService,
          useValue: mockVisualPickingProductFilterService,
        },
      ],
    }).compileComponents();

    TestBed.inject(HttpTestingController);

    TestBed.inject(VisualPickingProductFilterService);
    fixture = TestBed.createComponent(VisualPickingProductFilterComponent);
    visualPickingProductFilterComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create visual picking product filter component', () => {
    expect(visualPickingProductFilterComponent).toBeTruthy();
  });

  describe('filter', () => {
    it('should delegate to VisualPickingProductFilterService', () => {
      const setterSpy = spyOnProperty(
        mockVisualPickingProductFilterService,
        'filter',
        'set'
      );
      const getterSpy = spyOnProperty(
        mockVisualPickingProductFilterService,
        'filter',
        'get'
      );
      visualPickingProductFilterComponent.filter =
        visualPickingProductFilterComponent.filter;
      expect(setterSpy).toHaveBeenCalledTimes(1);
      expect(getterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
