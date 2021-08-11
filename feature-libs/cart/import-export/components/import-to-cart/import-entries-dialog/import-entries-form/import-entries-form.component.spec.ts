import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ImportService,
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule } from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ImportToCartService } from '../../import-to-cart.service';
import { ImportEntriesFormComponent } from './import-entries-form.component';

const mockLoadFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockFileValidity = {
  maxSize: 1,
  allowedExtensions: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    '.csv',
  ],
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

const loadFileData$: BehaviorSubject<string> = new BehaviorSubject(
  mockCsvString
);

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
  csvDataToProduct = () => mockProducts;
}

class MockImportService implements Partial<ImportService> {
  loadFile = () => loadFileData$.asObservable();
  readCsvData() {
    return mockLoadFileData;
  }
}

describe('ImportEntriesFormComponent', () => {
  let component: ImportEntriesFormComponent;
  let fixture: ComponentFixture<ImportEntriesFormComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: ImportToCartService;
  let importService: ImportService;

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
        { provide: ImportService, useClass: MockImportService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesFormComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    importToCartService = TestBed.inject(ImportToCartService);
    importService = TestBed.inject(ImportService);

    spyOn(importToCartService, 'loadProductsToCart').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the file Validity', () => {
    expect(component.fileValidity).toEqual(mockFileValidity);
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

  describe('loadFile', () => {
    beforeEach(() => {
      loadFileData$.next(mockCsvString);
      component.form.get('file')?.setValue([mockFile]);
    });
    it('should validate maximum size', () => {
      spyOn<any>(component, 'validateMaxSize');
      component.loadFile();

      expect(component['validateMaxSize']).toHaveBeenCalledWith(mockFile);
    });

    it('should validate if file is empty', () => {
      spyOn<any>(component, 'validateEmpty');
      component.loadFile();

      expect(component['validateEmpty']).toHaveBeenCalledWith(mockLoadFileData);
    });

    it('should validate if file is parsable', () => {
      spyOn<any>(component, 'validateParsable');
      component.loadFile();

      expect(component['validateParsable']).toHaveBeenCalledWith(
        mockLoadFileData
      );
    });

    it('should throw error if file is empty', () => {
      loadFileData$.next('');
      spyOn(importService, 'readCsvData').and.returnValue([]);
      component.loadFile();

      expect(component.fileError.empty).toBeTruthy();
    });

    it('should throw error if file is too big', () => {
      const mockLargeFile = new File([], 'mockFile');
      Object.defineProperty(mockLargeFile, 'size', { value: 1000001 });
      component.form.get('file')?.setValue([mockLargeFile]);
      component.loadFile();

      expect(component.fileError.tooLarge).toBeTruthy();
    });

    it('should throw error if file is not parsable', () => {
      spyOn(importToCartService, 'isDataParsable').and.returnValue(false);
      component.loadFile();

      expect(component.fileError.notParsable).toBeTruthy();
    });

    it('should call loadFile method from import service', () => {
      spyOn(importService, 'loadFile');
      component.loadFile();

      expect(importService.loadFile).toHaveBeenCalledWith(mockFile);
    });

    it('should load the file into loadedFile', () => {
      component.loadFile();
      expect(component.loadedFile).toEqual(mockLoadFileData);
    });
  });

  it('should trigger submit event when submit method is called', () => {
    component.form.get('file')?.setValue([mockFile]);
    const mockSubmitData = {
      products: mockProducts,
      name: '',
      description: '',
    };
    spyOn(component.submitEvent, 'emit');
    component.loadFile();
    component.submit();

    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockSubmitData);
  });

  it('should not trigger submit event when loadedFile data does not exist', () => {
    spyOn(component.submitEvent, 'emit');
    component.submit();

    expect(component.submitEvent.emit).not.toHaveBeenCalled();
  });
});
