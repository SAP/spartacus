import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  NameSource,
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  LaunchDialogService,
  FilesFormValidators,
  ImportCsvService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ImportToCartService } from '../../import-to-cart.service';
import { ImportToSavedCartFormComponent } from './import-to-saved-cart-form.component';

const mockLoadFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockImportExportConfig: ImportExportConfig = {
  cartImportExport: {
    file: {
      separator: ',',
    },
    import: {
      fileValidity: {
        maxSize: 1,
        allowedExtensions: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv',
          '.csv',
        ],
      },
      cartNameGeneration: {
        source: NameSource.FILE_NAME,
      },
    },
  },
};

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockFile: File = new File([mockCsvString], 'mockFile.csv', {
  type: 'text/csv',
});

const mockProducts: ProductsData = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockLoadProduct: ProductImportInfo = {
  productCode: '123456',
  statusCode: ProductImportStatus.SUCCESS,
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockImportToCartService implements Partial<ImportToCartService> {
  loadProductsToCart = () => of(mockLoadProduct);
  isDataParsableToProducts = () => true;
  csvDataToProduct = () => mockProducts;
}

class MockImportCsvService implements Partial<ImportCsvService> {
  loadFile = () => of(mockCsvString);
  loadCsvData = () => of(mockLoadFileData);
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('ImportToSavedCartFormComponent', () => {
  let component: ImportToSavedCartFormComponent;
  let fixture: ComponentFixture<ImportToSavedCartFormComponent>;
  let importToCartService: ImportToCartService;
  let filesFormValidators: FilesFormValidators;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormErrorsModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        I18nTestingModule,
      ],
      declarations: [ImportToSavedCartFormComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ImportToCartService, useClass: MockImportToCartService },
        { provide: ImportCsvService, useClass: MockImportCsvService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ImportExportConfig, useValue: mockImportExportConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportToSavedCartFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    importToCartService = TestBed.inject(ImportToCartService);
    filesFormValidators = TestBed.inject(FilesFormValidators);

    spyOn(importToCartService, 'loadProductsToCart').and.callThrough();
    spyOn(filesFormValidators, 'maxSize').and.callThrough();
    spyOn(filesFormValidators, 'parsableFile').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form', () => {
    expect(component.form?.get('file')?.value).toBeDefined();
    expect(component.form?.get('name')?.value).toBeDefined();
    expect(component.form?.get('description')?.value).toBeDefined();
  });

  it('should trigger submit event when save method is called', () => {
    component.form.get('file')?.setValue([mockFile]);
    const mockSubmitData = {
      products: mockProducts,
      savedCartInfo: {
        name: '',
        description: '',
      },
    };
    spyOn(component.submitEvent, 'emit');
    component.save();

    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockSubmitData);
  });

  describe('updateCartName', () => {
    it('should call updateCartName on event change', () => {
      spyOn(component, 'updateCartName').and.callThrough();
      el.query(By.css('cx-file-upload')).triggerEventHandler('update', null);

      expect(component.updateCartName).toHaveBeenCalled();
    });

    const testData = [
      {
        testName: 'should update cart name based on the file name',
        cartNameGeneration: {
          source: NameSource.FILE_NAME,
        },
        resultMask: /^(mockFile)$/,
      },
      {
        testName: 'should update cart name based on the date',
        cartNameGeneration: {
          source: NameSource.DATE_TIME,
          fromDateOptions: {
            mask: 'yyyy/MM/dd_hh:mm',
          },
        },
        resultMask: /^\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[_]([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
      {
        testName: 'should update cart name based on the date with prefix',
        cartNameGeneration: {
          source: NameSource.DATE_TIME,
          fromDateOptions: {
            prefix: 'cart_',
            mask: 'yyyy/MM/dd_hh:mm',
          },
        },
        resultMask: /^(cart)[_]\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[_]([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
      {
        testName: 'should update cart name based on the date with suffix',
        cartNameGeneration: {
          source: NameSource.DATE_TIME,
          fromDateOptions: {
            suffix: '_cart',
            mask: 'yyyy/MM/dd_hh:mm',
          },
        },
        resultMask: /^\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[_]([01]?[0-9]|2[0-3]):[0-5][0-9][_](cart)$/,
      },
      {
        testName:
          'should update cart name based on the date with prefix and suffix',
        cartNameGeneration: {
          source: NameSource.DATE_TIME,
          fromDateOptions: {
            prefix: 'cart_',
            suffix: '_cart',
            mask: 'yyyy/MM/dd_hh:mm',
          },
        },
        resultMask: /^(cart)[_]\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[_]([01]?[0-9]|2[0-3]):[0-5][0-9][_](cart)$/,
      },
      {
        testName: 'should not update cart name if it was already filled',
        cartNameGeneration: {
          source: NameSource.FILE_NAME,
        },
        alreadyFilledName: 'alreadyFilledName',
        resultMask: /^(alreadyFilledName)$/,
      },
      {
        testName: 'should not update cart name if it is not enabled',
        cartNameGeneration: {},
        resultMask: /^$/,
      },
    ];

    testData.forEach(
      ({ testName, cartNameGeneration, resultMask, alreadyFilledName }) => {
        it(testName, () => {
          component['importExportConfig'] = {
            cartImportExport: {
              ...mockImportExportConfig.cartImportExport,
              import: {
                ...mockImportExportConfig.cartImportExport.import,
                cartNameGeneration,
              },
            },
          };
          component.ngOnInit();

          if (alreadyFilledName) {
            component.form.get('name')?.setValue(alreadyFilledName);
          }
          component.form.get('file')?.setValue([mockFile]);
          el.query(By.css('cx-file-upload')).triggerEventHandler(
            'update',
            null
          );

          expect(component.form.get('name')?.value).toMatch(resultMask);
        });
      }
    );
  });
});
