import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AddOrderEntriesContext,
  OrderEntriesSource,
  ProductData,
  ProductimportInfo,
  ProductimportStatus,
} from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { importEntriesDialogComponent } from './import-entries-dialog.component';

const mockProducts: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockName = 'mockSavedCart';

const mockLoadProduct: ProductimportInfo = {
  productCode: '123456',
  statusCode: ProductimportStatus.SUCCESS,
};

const loadProducts$: BehaviorSubject<ProductimportInfo> = new BehaviorSubject(
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
  imports: [I18nTestingModule, IconTestingModule, KeyboardFocusTestingModule],
})
class MockimportEntriesFormComponent {
  @Input()
  type: OrderEntriesSource;
}

describe('importEntriesDialogComponent', () => {
  let component: importEntriesDialogComponent;
  let fixture: ComponentFixture<importEntriesDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconTestingModule,
        KeyboardFocusTestingModule,
        importEntriesDialogComponent,
        MockimportEntriesFormComponent,
        MockFeatureDirective,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(importEntriesDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(service, 'addEntries').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close import Products Dialog';
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
