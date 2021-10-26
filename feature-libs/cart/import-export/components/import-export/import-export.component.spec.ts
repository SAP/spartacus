import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { OrderEntry, RoutingService } from '@spartacus/core';
import {
  OrderEntriesSource,
  ExportContext,
  ImportContext,
  PageComponentModule,
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/storefront';
import { ImportExportComponent } from './import-export.component';
import createSpy = jasmine.createSpy;

const mockLoadProduct: ProductImportInfo = {
  productCode: '123456',
  statusCode: ProductImportStatus.SUCCESS,
};

class MockImportExportContext implements ImportContext, ExportContext {
  getEntries = () => entries$.asObservable();
  addEntries = (_products: ProductData[]) => loadProducts$.asObservable();
  readonly type: OrderEntriesSource;
}

const loadProducts$: BehaviorSubject<ProductImportInfo> = new BehaviorSubject(
  mockLoadProduct
);

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const entries$ = new BehaviorSubject<OrderEntry[]>(mockEntries);

const routerContextSubject = new BehaviorSubject<
  Partial<ImportContext & ExportContext>
>(new MockImportExportContext());

class MockRoutingService implements Partial<RoutingService> {
  getContext = createSpy().and.returnValue(routerContextSubject.asObservable());
}

@Component({
  selector: 'cx-import-entries',
  template: '',
})
export class MockImportEntriesComponent {
  @ViewChild('open') element: ElementRef;

  @Input()
  context: ImportContext | ExportContext;
}

@Component({
  selector: 'cx-export-entries',
  template: '',
})
export class MockExportEntriesComponent {
  @Input()
  entries: OrderEntry[];
}

describe('ImportExportComponent', () => {
  let component: ImportExportComponent;
  let fixture: ComponentFixture<ImportExportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, PageComponentModule],
      providers: [{ provide: RoutingService, useClass: MockRoutingService }],
      declarations: [
        ImportExportComponent,
        MockExportEntriesComponent,
        MockImportEntriesComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
