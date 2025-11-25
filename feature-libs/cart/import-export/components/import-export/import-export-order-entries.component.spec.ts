import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AddOrderEntriesContext,
  GetOrderEntriesContext,
  OrderEntriesSource,
  OrderEntry,
  ProductData,
  ProductimportInfo,
  ProductimportStatus,
} from '@spartacus/cart/base/root';
import { ContextService, PageComponentModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { ExportOrderEntriesComponent } from '../export-entries';
import { importOrderEntriesComponent } from '../import-to-cart';
import { importExportOrderEntriesComponent } from './import-export-order-entries.component';
import createSpy = jasmine.createSpy;

const mockLoadProduct: ProductimportInfo = {
  productCode: '123456',
  statusCode: ProductimportStatus.SUCCESS,
};

class MockimportExportContext
  implements AddOrderEntriesContext, GetOrderEntriesContext
{
  getEntries = () => entries$.asObservable();
  addEntries = (_products: ProductData[]) => loadProducts$.asObservable();
  readonly type: OrderEntriesSource;
}

const loadProducts$: BehaviorSubject<ProductimportInfo> = new BehaviorSubject(
  mockLoadProduct
);

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

const entries$ = new BehaviorSubject<OrderEntry[]>(mockEntries);

const importExportContext = new BehaviorSubject<
  Partial<AddOrderEntriesContext & GetOrderEntriesContext>
>(new MockimportExportContext());

class MockContextService implements Partial<ContextService> {
  get = createSpy().and.returnValue(importExportContext.asObservable());
}

@Component({
  selector: 'cx-import-order-entries',
  template: '',
  imports: [PageComponentModule],
})
export class MockimportOrderEntriesComponent {
  @ViewChild('open') element: ElementRef;

  @Input()
  context: AddOrderEntriesContext | GetOrderEntriesContext;
}

@Component({
  selector: 'cx-export-order-entries',
  template: '',
  imports: [PageComponentModule],
})
export class MockExportOrderEntriesComponent {
  @Input()
  entries: OrderEntry[];
}

describe('importExportComponent', () => {
  let component: importExportOrderEntriesComponent;
  let fixture: ComponentFixture<importExportOrderEntriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PageComponentModule, importExportOrderEntriesComponent],
      providers: [{ provide: ContextService, useClass: MockContextService }],
    })
      .overrideComponent(importExportOrderEntriesComponent, {
        remove: {
          imports: [ExportOrderEntriesComponent, importOrderEntriesComponent],
        },
        add: {
          imports: [
            MockExportOrderEntriesComponent,
            MockimportOrderEntriesComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(importExportOrderEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
