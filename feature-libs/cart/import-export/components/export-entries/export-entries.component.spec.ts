import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import {
  I18nTestingModule,
  ImageType,
  OrderEntry,
  PriceType,
} from '@spartacus/core';
import { ExportProductsToCsvService } from './export-products-to-csv.service';
import { ExportEntriesComponent } from './export-entries.component';
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

const entries$ = new BehaviorSubject([entry]);

class MockExportProductsToCsvService {
  downloadCsv = createSpy('downloadCsv');
}

describe('ExportEntriesComponent', () => {
  let component: ExportEntriesComponent;
  let fixture: ComponentFixture<ExportEntriesComponent>;

  let exportEntriesService: ExportProductsToCsvService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          I18nTestingModule,
          RouterTestingModule,
        ],
        providers: [
          {
            provide: ExportProductsToCsvService,
            useClass: MockExportProductsToCsvService,
          },
        ],
        declarations: [ExportEntriesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEntriesComponent);
    component = fixture.componentInstance;

    exportEntriesService = TestBed.inject(ExportProductsToCsvService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display export to csv link and run downloadCsv on click', () => {
    entries$.next([entry]);
    fixture.detectChanges();

    const exportToCsvSpy = spyOn(component, 'exportCsv').and.callThrough();
    const btn = fixture.debugElement.query(By.css('button.cx-action-link'));

    expect(btn.nativeElement).toBeTruthy();

    btn.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(exportToCsvSpy).toHaveBeenCalledWith();
      expect(exportEntriesService.downloadCsv).toHaveBeenCalledWith([entry]);
    });
  });

  it('should to not display button if no entries', () => {
    entries$.next([]);

    const btn = fixture.debugElement.query(By.css('button.cx-action-link'));
    fixture.detectChanges();

    expect(btn).toBeNull();
  });
});
