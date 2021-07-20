import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, ImageType, PriceType } from '@spartacus/core';
import { ExportService } from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { ExportEntriesComponent } from './export-entries.component';
import { OrderEntry } from './../../../../../projects/core/src/model/order.model';

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
    url:
      '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/PC-Service-Set-Professional/p/3803058',
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

describe('ExportEntriesComponent', () => {
  let component: ExportEntriesComponent;
  let fixture: ComponentFixture<ExportEntriesComponent>;
  let exportService: ExportService;
  let exportEntriesService: ExportEntriesService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          I18nTestingModule,
          RouterTestingModule,
        ],
        declarations: [ExportEntriesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEntriesComponent);
    component = fixture.componentInstance;

    exportService = TestBed.inject(ExportService);
    exportEntriesService = TestBed.inject(ExportEntriesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display export to csv link and run downloadCsv on click', () => {
    component.entries$ = of([entry]);
    fixture.detectChanges();

    const exportToCsvSpy = spyOn(component, 'exportToCsv').and.callThrough();
    const downloadCsvSpy = spyOn(component, 'downloadCsv');
    const dataToCsvSpy = spyOn(exportService, 'dataToCsv');
    const exportEntriesSpy = spyOn(exportEntriesService, 'exportEntries');
    const btn = fixture.debugElement.query(By.css('button.cx-action-link'));

    expect(btn.nativeElement).toBeTruthy();

    btn.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(exportToCsvSpy).toHaveBeenCalled();
      expect(downloadCsvSpy).toHaveBeenCalled();
      expect(dataToCsvSpy).toHaveBeenCalled();
      expect(exportEntriesSpy).toHaveBeenCalled();
    });
  });

  it('should to not display button if no entries', () => {
    component.entries$ = of([]);

    const btn = fixture.debugElement.query(By.css('button.cx-action-link'));
    fixture.detectChanges();

    expect(btn).toBeNull();
  });
});
