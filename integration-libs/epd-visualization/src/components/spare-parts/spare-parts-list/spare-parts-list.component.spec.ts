import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SparePartsListComponent } from './spare-parts-list.component';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of({
      code: '1',
    });
  }
}

class MockProductReferenceService {
  get(_code: string): Observable<ProductReference[]> {
    return of([
      {
        target: {
          code: '111',
          name: 'product reference 1',
          price: {
            formattedValue: '$100.00',
          },
          images: {
            PRIMARY: {
              image: {
                url: 'whatever.jpg',
              },
            },
          },
        },
      },
      {
        target: {
          code: '222',
          name: 'product reference 2',
          price: {
            formattedValue: '$200.00',
          },
        },
      },
    ]);
  }

  cleanReferences(): void {}
}

describe('SparePartsListComponent', () => {
  let sparePartsListComponent: SparePartsListComponent;
  let fixture: ComponentFixture<SparePartsListComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SparePartsListComponent],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: ProductReferenceService,
          useClass: MockProductReferenceService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SparePartsListComponent);
    sparePartsListComponent = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create spare parts list component', () => {
    expect(sparePartsListComponent).toBeTruthy();
  });
});
