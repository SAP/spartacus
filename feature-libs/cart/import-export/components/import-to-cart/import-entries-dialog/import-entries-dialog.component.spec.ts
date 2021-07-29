import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImportService } from '@spartacus/cart/import-export/core';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ImportToCartService } from '../import-to-cart.service';
import { ImportEntriesDialogComponent } from './import-entries-dialog.component';

const mockCsvData = [
  '"Sku","Quantity","Name","Price"',
  '"693923","1","mockName", "$4.00"',
  '"232133","2","mockName2", "$5.00"',
];

const mockLoadFileData = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockFile: File = new File(mockCsvData, 'mockFile', {
  type: 'text/csv',
});

const mockFileValidity = {
  maxSize: 1,
  allowedExtensions: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    '.csv',
  ],
};

const loadFileData$: BehaviorSubject<string[][]> = new BehaviorSubject(
  mockLoadFileData
);

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of(mockFileValidity);
  }

  closeDialog(_reason: string): void {}
}

class MockImportToCartService implements Partial<ImportToCartService> {
  loadProductsToCart(): void {}
  isDataParsable = () => true;
}

class MockImportService implements Partial<ImportService> {
  //   loadFile() {
  //     return of([]);
  //   }
  loadFile = () => loadFileData$.asObservable();
}

fdescribe('ImportEntriesDialogComponent', () => {
  let component: ImportEntriesDialogComponent;
  let fixture: ComponentFixture<ImportEntriesDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: ImportToCartService;
  let importService: ImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ImportEntriesDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ImportToCartService, useClass: MockImportToCartService },
        { provide: ImportService, useClass: MockImportService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesDialogComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    importToCartService = TestBed.inject(ImportToCartService);
    importService = TestBed.inject(ImportService);

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

  it('should build the form', () => {
    expect(component.form?.get('file')?.value).not.toBeUndefined();
    expect(component.form?.get('name')?.value).not.toBeUndefined();
    expect(component.form?.get('description')?.value).not.toBeUndefined();
  });

  describe('loadFile', () => {
    it('should validate maximum size', () => {
      spyOn<any>(component, 'validateMaxSize');
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockFile, component.form);

      expect(component['validateMaxSize']).toHaveBeenCalledWith(mockFile);
    });

    it('should validate if file is empty', () => {
      spyOn<any>(component, 'validateEmpty');
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockFile, component.form);

      expect(component['validateEmpty']).toHaveBeenCalledWith(mockLoadFileData);
    });

    it('should validate if file is parsable', () => {
      spyOn<any>(component, 'validateParsable');
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockFile, component.form);

      expect(component['validateParsable']).toHaveBeenCalledWith(
        mockLoadFileData
      );
    });

    it('should throw error if file is empty', () => {
      loadFileData$.next([]);
      component.loadFile(mockFile, component.form);

      expect(component.fileError.empty).toBeTruthy();
    });

    it('should throw error if file is too big', () => {
      const mockLargeFile = new File([], 'mockFile');
      Object.defineProperty(mockLargeFile, 'size', { value: 1000001 });
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockLargeFile, component.form);

      expect(component.fileError.tooLarge).toBeTruthy();
    });

    it('should throw error if file is not parsable', () => {
      spyOn(importToCartService, 'isDataParsable').and.returnValue(false);
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockFile, component.form);

      expect(component.fileError.notParsable).toBeTruthy();
    });

    it('should call loadFile method from import service', () => {
      spyOn(importService, 'loadFile');
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockFile, component.form);

      expect(importService.loadFile).toHaveBeenCalledWith(mockFile);
    });
  });

  describe('importProducts', () => {
    it('should call importProducts method on click of upload', async () => {
      spyOn(component, 'importProducts');
      const uploadButton = fixture.debugElement.queryAll(By.css('button'))[2]
        .nativeElement;
      uploadButton.disabled = false;
      uploadButton.click();

      expect(component.importProducts).toHaveBeenCalled();
    });

    it('should call loadProductsToCart method', () => {
      spyOn(importToCartService, 'loadProductsToCart');
      loadFileData$.next(mockLoadFileData);
      component.loadFile(mockFile, component.form);
      component.importProducts();

      expect(importToCartService.loadProductsToCart).toHaveBeenCalledWith(
        mockLoadFileData,
        {
          name: '',
          description: '',
        }
      );
    });

    it('should not call loadProductsToCart if loadedFile is null', () => {
      spyOn(importToCartService, 'loadProductsToCart');
      component.loadedFile = null;
      component.importProducts();

      expect(importToCartService.loadProductsToCart).not.toHaveBeenCalled();
    });
  });
});
