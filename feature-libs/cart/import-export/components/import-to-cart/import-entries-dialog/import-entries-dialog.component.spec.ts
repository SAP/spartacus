import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule } from '@spartacus/core';
import {
  LaunchDialogService,
  IconTestingModule,
  KeyboardFocusTestingModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ImportToCartService } from '../import-to-cart.service';
import { ImportEntriesDialogComponent } from './import-entries-dialog.component';

const mockFileValidity = {
  maxSize: 1,
  allowedExtensions: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    '.csv',
  ],
};

const mockProducts: ProductsData = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockName = 'mockSavedCart';

const mockLoadProduct: ProductImportInfo = {
  productCode: '123456',
  statusCode: ProductImportStatus.SUCCESS,
};

const loadProducts$: BehaviorSubject<ProductImportInfo> = new BehaviorSubject(
  mockLoadProduct
);

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of(mockFileValidity);
  }

  closeDialog(_reason: string): void {}
}

class MockImportToCartService implements Partial<ImportToCartService> {
  loadProductsToCart = () => loadProducts$.asObservable();
  isDataParsable = () => true;
}

@Component({
  selector: 'cx-import-entries-form',
  template: '',
})
class MockImportEntriesFormComponent {}

describe('ImportEntriesDialogComponent', () => {
  let component: ImportEntriesDialogComponent;
  let fixture: ComponentFixture<ImportEntriesDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: ImportToCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconTestingModule,
        KeyboardFocusTestingModule,
      ],
      declarations: [
        ImportEntriesDialogComponent,
        MockImportEntriesFormComponent,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ImportToCartService, useClass: MockImportToCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    importToCartService = TestBed.inject(ImportToCartService);

    spyOn(importToCartService, 'loadProductsToCart').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Import Products Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  describe('importProducts', () => {
    it('should call loadProductsToCart method', () => {
      loadProducts$.next(mockLoadProduct);
      component.importProducts({
        products: mockProducts,
        savedCartInfo: {
          name: mockName,
          description: '',
        },
      });

      expect(importToCartService.loadProductsToCart).toHaveBeenCalledWith(
        mockProducts,
        {
          name: mockName,
          description: '',
        }
      );
    });

    it('should call populateSummary when products are loaded', () => {
      spyOn<any>(component, 'populateSummary');
      component.importProducts({
        products: mockProducts,
        savedCartInfo: {
          name: mockName,
          description: '',
        },
      });

      expect(component['populateSummary']).toHaveBeenCalledWith(
        mockLoadProduct
      );
    });
  });
});
