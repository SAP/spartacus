import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  defaultNameSource,
  FilesFormValidators,
  ImportCsvService,
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule } from '@spartacus/core';
import {
  CmsComponentData,
  FileUploadModule,
  FormErrorsModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { ImportToCartService } from '../../import-to-cart.service';
import { ImportEntriesFormComponent } from './import-entries-form.component';

const mockLoadFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockCmsComponentData = {
  fileValidity: {
    maxSize: 1,
    allowedExtensions: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      '.csv',
    ],
  },
  cartOptions: {
    enableDefaultName: true,
    defaultNameSource: defaultNameSource.FILE_NAME,
  },
};

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockFile: File = new File([mockCsvString], 'mockFile', {
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

const MockCmsImportEntriesComponent = <CmsComponentData<any>>{
  data$: of(mockCmsComponentData),
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

describe('ImportEntriesFormComponent', () => {
  let component: ImportEntriesFormComponent;
  let fixture: ComponentFixture<ImportEntriesFormComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: ImportToCartService;
  let filesFormValidators: FilesFormValidators;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        FormErrorsModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ImportEntriesFormComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ImportToCartService, useClass: MockImportToCartService },
        { provide: ImportCsvService, useClass: MockImportCsvService },
        { provide: CmsComponentData, useValue: MockCmsImportEntriesComponent },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesFormComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
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

  it('should get the file Validity', () => {
    expect(component.fileValidity).toEqual(mockCmsComponentData.fileValidity);
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Import Products Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should build the form', () => {
    expect(component.form?.get('file')?.value).toBeDefined();
    expect(component.form?.get('name')?.value).toBeDefined();
    expect(component.form?.get('description')?.value).toBeDefined();
  });

  it('should validate maximum size and parsable file while building form', () => {
    expect(filesFormValidators.maxSize).toHaveBeenCalled();
    expect(filesFormValidators.parsableFile).toHaveBeenCalled();
  });

  it('should trigger submit event when save method is called', () => {
    component.form.get('file')?.setValue([mockFile]);
    const mockSubmitData = {
      products: mockProducts,
      name: '',
      description: '',
    };
    spyOn(component.submitEvent, 'emit');
    component.save();

    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockSubmitData);
  });
});
