import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductData } from '@spartacus/cart/base/root';
import {
  defaultimportExportConfig,
  importExportConfig,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import {
  FilesFormValidators,
  FileUploadModule,
  FormErrorsModule,
  importCsvFileService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { importProductsFromCsvService } from '../../import-products-from-csv.service';
import { importEntriesFormComponent } from './import-entries-form.component';

const mockLoadFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockFile: File = new File([mockCsvString], 'mockFile.csv', {
  type: 'text/csv',
});

const mockProducts: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockimportToCartService implements Partial<importProductsFromCsvService> {
  isDataParsableToProducts = () => true;
  csvDataToProduct = () => mockProducts;
}

class MockimportCsvFileService implements Partial<importCsvFileService> {
  loadFile = () => of(mockLoadFileData);
  validateFile = () => of(null);
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('importEntriesFormComponent', () => {
  let component: importEntriesFormComponent;
  let fixture: ComponentFixture<importEntriesFormComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: importProductsFromCsvService;
  let filesFormValidators: FilesFormValidators;
  let importCsvService: importCsvFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormErrorsModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        I18nTestingModule,
        importEntriesFormComponent,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: importProductsFromCsvService,
          useClass: MockimportToCartService,
        },
        { provide: importCsvFileService, useClass: MockimportCsvFileService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: importExportConfig, useValue: defaultimportExportConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(importEntriesFormComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    importToCartService = TestBed.inject(importProductsFromCsvService);
    filesFormValidators = TestBed.inject(FilesFormValidators);
    importCsvService = TestBed.inject(importCsvFileService);

    spyOn(importToCartService, 'csvDataToProduct').and.callThrough();
    spyOn(importCsvService, 'validateFile').and.callThrough();
    spyOn(filesFormValidators, 'maxSize').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the accept', () => {
    expect(component.allowedTypes).toEqual(
      defaultimportExportConfig.cartimportExport.import.fileValidity
        .allowedTypes
    );
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close import Products Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should build the form', () => {
    expect(component.form?.get('file')?.value).toBeDefined();
  });

  it('should validate maximum size and parsable file while building form', () => {
    expect(filesFormValidators.maxSize).toHaveBeenCalled();
  });

  it('should trigger submit event when save method is called', () => {
    component.form.get('file')?.setValue([mockFile]);
    const mockSubmitData = {
      products: mockProducts,
    };
    spyOn(component.submitEvent, 'emit');
    component.save();

    expect(importToCartService.csvDataToProduct).toHaveBeenCalledWith(
      mockLoadFileData
    );
    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockSubmitData);
  });
});
