import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { I18nTestingModule } from '@spartacus/core';
import {
  OrderEntriesSource,
  IconTestingModule,
  AddOrderEntriesContext,
  KeyboardFocusTestingModule,
  LaunchDialogService,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/storefront';
import { ImportEntriesDialogComponent } from './import-entries-dialog.component';

const mockProducts: ProductData[] = [
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

class MockAddOrderEntriesContext implements Partial<AddOrderEntriesContext> {
  addEntries = () => loadProducts$.asObservable();
}

const service: AddOrderEntriesContext =
  new MockAddOrderEntriesContext() as unknown as AddOrderEntriesContext;

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({ context: service });
  }

  closeDialog(_reason: string): void {}
}

@Component({
  selector: 'cx-import-entries-form',
  template: '',
})
class MockImportEntriesFormComponent {
  @Input()
  type: OrderEntriesSource;
}

describe('ImportEntriesDialogComponent', () => {
  let component: ImportEntriesDialogComponent;
  let fixture: ComponentFixture<ImportEntriesDialogComponent>;
  let launchDialogService: LaunchDialogService;

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(service, 'addEntries').and.callThrough();
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
      component.importProducts(service, {
        products: mockProducts,
        savedCartInfo: {
          name: mockName,
          description: '',
        },
      });

      expect(service.addEntries).toHaveBeenCalledWith(mockProducts, {
        name: mockName,
        description: '',
      });
    });

    it('should call populateSummary when products are loaded', () => {
      spyOn<any>(component, 'populateSummary');
      component.importProducts(service, {
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
