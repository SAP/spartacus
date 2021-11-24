import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import {
  I18nTestingModule,
  ImageType,
  OrderEntry,
  PriceType,
} from '@spartacus/core';
import { ContextService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ExportOrderEntriesComponent } from './export-order-entries.component';
import { ExportOrderEntriesToCsvService } from './export-order-entries-to-csv.service';
import createSpy = jasmine.createSpy;

const entry: OrderEntry = {
  basePrice: {
    currencyIso: 'USD',
    formattedValue: '$23.50',
    priceType: PriceType.BUY,
    value: 23.5,
  },
  cancellableQuantity: 0,
  entryNumber: 1,
  product: {
    availableForPickup: false,
    baseOptions: [],
    categories: [
      {
        code: '1358',
        name: 'Measuring & Layout Tools',
        url: '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/c/1358',
      },
      {
        code: 'brand_4434',
        name: 'Ednet',
        url: '/Brands/Ednet/c/brand_4434',
      },
    ],
    code: '3803058',
    images: {
      PRIMARY: {
        zoom: {
          altText: 'PC Service Set Professional',
          format: 'zoom',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
        product: {
          altText: 'PC Service Set Professional',
          format: 'product',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
        thumbnail: {
          altText: 'PC Service Set Professional',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
        cartIcon: {
          altText: 'PC Service Set Professional',
          format: 'cartIcon',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
      },
    },
    manufacturer: 'Ednet',
    name: 'PC Service Set Professional',
    purchasable: true,
    stock: {
      stockLevel: 365,
      stockLevelStatus: 'inStock',
    },
    url: '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/PC-Service-Set-Professional/p/3803058',
    slug: 'pc-service-set-professional',
    nameHtml: 'PC Service Set Professional',
  },
  quantity: 2,
  returnableQuantity: 0,
  totalPrice: {
    currencyIso: 'USD',
    formattedValue: '$47.00',
    priceType: PriceType.BUY,
    value: 47,
  },
  updateable: true,
};

const entries: OrderEntry[] = [entry, entry];

class MockExportProductsToCsvService {
  downloadCsv = createSpy('downloadCsv');
}

class MockImportExportContext {
  getEntries = createSpy('getEntries').and.returnValue(of(entries));
}
const contextService = new MockImportExportContext();

class MockContextService implements Partial<ContextService> {
  get = createSpy().and.returnValue(of(contextService));
}

describe('ExportOrderEntriesComponent', () => {
  let component: ExportOrderEntriesComponent;
  let fixture: ComponentFixture<ExportOrderEntriesComponent>;
  let exportEntriesService: ExportOrderEntriesToCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        I18nTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ExportOrderEntriesToCsvService,
          useClass: MockExportProductsToCsvService,
        },
        {
          provide: ContextService,
          useClass: MockContextService,
        },
      ],
      declarations: [ExportOrderEntriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportOrderEntriesComponent);
    component = fixture.componentInstance;

    exportEntriesService = TestBed.inject(ExportOrderEntriesToCsvService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display export to csv link and run downloadCsv on click', () => {
    fixture.detectChanges();

    const exportToCsvSpy = spyOn(component, 'exportCsv').and.callThrough();
    const btn = fixture.debugElement.query(By.css('button.cx-action-link'));

    expect(btn.nativeElement).toBeTruthy();

    btn.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(exportToCsvSpy).toHaveBeenCalledWith(entries);
      expect(exportEntriesService.downloadCsv).toHaveBeenCalledWith(entries);
    });
  });
});
