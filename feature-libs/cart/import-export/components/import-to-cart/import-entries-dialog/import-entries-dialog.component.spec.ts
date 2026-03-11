import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AddOrderEntriesContext,
  OrderEntriesSource,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import {
  FocusDirective,
  IconComponent,
  LaunchDialogService,
  MockIconComponent,
  MockKeyboardFocusDirective,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ImportEntriesDialogComponent } from './import-entries-dialog.component';
import { ImportEntriesFormComponent } from './import-entries-form/import-entries-form.component';
import { ImportEntriesSummaryComponent } from './import-entries-summary/import-entries-summary.component';
import { ImportToNewSavedCartFormComponent } from './import-to-new-saved-cart-form/import-to-new-saved-cart-form.component';

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

@Component({
  selector: 'cx-import-to-new-saved-cart-form',
  template: '',
})
class MockImportToNewSavedCartFormComponent {
  @Input()
  type: OrderEntriesSource;
}

@Component({
  selector: 'cx-import-entries-summary',
  template: '',
})
class MockImportEntriesSummaryComponent {
  @Input()
  summary: any;
  @Input()
  type: OrderEntriesSource;
}

describe('ImportEntriesDialogComponent', () => {
  let component: ImportEntriesDialogComponent;
  let fixture: ComponentFixture<ImportEntriesDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImportEntriesDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(ImportEntriesDialogComponent, {
        remove: {
          imports: [
            TranslatePipe,
            IconComponent,
            FocusDirective,
            ImportEntriesFormComponent,
            ImportEntriesSummaryComponent,
            ImportToNewSavedCartFormComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockIconComponent,
            MockKeyboardFocusDirective,
            MockImportEntriesFormComponent,
            MockImportEntriesSummaryComponent,
            MockImportToNewSavedCartFormComponent,
          ],
        },
      })
      .compileComponents();

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
