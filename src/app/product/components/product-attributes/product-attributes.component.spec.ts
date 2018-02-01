import { of } from 'rxjs/observable/of';
import { ProductModule } from './../../product.module';
import { MaterialModule } from 'app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAttributesComponent } from './product-attributes.component';
import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../store/reducers/product.reducer';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

const id = '1641905';
const componentData = {
  availableForPickup: true,
  categories: [
    {
      code: '902'
    },
    {
      code: 'brand_18'
    }
  ],
  classifications: [
    {
      code: '834',
      features: [
        {
          code: 'ElectronicsClassification/1.0/834.source data-sheet, 6617',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: 'ICEcat.biz'
            }
          ],
          name: 'Source data-sheet',
          range: false
        },
        {
          code: 'ElectronicsClassification/1.0/834.form factor, 771',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: '9-pin SecureDigital (SD)'
            }
          ],
          name: 'Form factor',
          range: false
        },
        {
          code: 'ElectronicsClassification/1.0/834.plug and play, 775',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: 'true'
            }
          ],
          name: 'Plug and Play',
          range: false
        },
        {
          code:
            'ElectronicsClassification/1.0/834.write protection switch, 4321',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: 'true'
            }
          ],
          name: 'Write protection switch',
          range: false
        },
        {
          code: 'ElectronicsClassification/1.0/834.warranty, 1448',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: 'Lifetime'
            }
          ],
          name: 'Warranty',
          range: false
        }
      ],
      name: 'Technical details'
    },
    {
      code: '829',
      features: [
        {
          code: 'ElectronicsClassification/1.0/829.transfer rate, 2329',
          comparable: true,
          featureUnit: {
            name: 'megabyte per second',
            symbol: 'MB/s',
            unitType: '40'
          },
          featureValues: [
            {
              value: '4'
            }
          ],
          name: 'Transfer rate',
          range: false
        },
        {
          code: 'ElectronicsClassification/1.0/829.internal memory, 6',
          comparable: true,
          featureUnit: {
            name: 'megabyte',
            symbol: 'MB',
            unitType: '19'
          },
          featureValues: [
            {
              value: '32768'
            }
          ],
          name: 'Internal memory',
          range: false
        },
        {
          code: 'ElectronicsClassification/1.0/829.flash card type, 2305',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: 'Secure Digital High-Capacity (SDHC)'
            }
          ],
          name: 'Flash card type',
          range: false
        }
      ],
      name: 'Memory'
    },
    {
      code: '854',
      features: [
        {
          code: 'ElectronicsClassification/1.0/854.dimensions w x d x h, 49',
          comparable: true,
          featureUnit: {
            name: 'millimeter',
            symbol: 'mm',
            unitType: '24'
          },
          featureValues: [
            {
              value: '24 × 32 × 2.1'
            }
          ],
          name: 'Dimensions W x D x H',
          range: false
        },
        {
          code: 'ElectronicsClassification/1.0/854.weight, 94',
          comparable: true,
          featureUnit: {
            name: 'gram',
            symbol: 'g',
            unitType: '38'
          },
          featureValues: [
            {
              value: '2.3'
            }
          ],
          name: 'Weight',
          range: false
        }
      ],
      name: 'Weight & dimensions'
    },
    {
      code: '851',
      features: [
        {
          code: 'ElectronicsClassification/1.0/851.input voltage, 1466',
          comparable: true,
          featureUnit: {
            name: 'Volt',
            symbol: 'V',
            unitType: '42'
          },
          featureValues: [
            {
              value: '3.3'
            }
          ],
          name: 'Input voltage',
          range: false
        }
      ],
      name: 'Energy management'
    },
    {
      code: '852',
      features: [
        {
          code:
            'ElectronicsClassification/1.0/852.operating temperature ran, 1112',
          comparable: true,
          featureUnit: {
            name: 'degrees Celcium',
            symbol: '°C',
            unitType: '65'
          },
          featureValues: [
            {
              value: '-25'
            },
            {
              value: '85'
            }
          ],
          name: 'Operating temperature range (T-T)',
          range: true
        },
        {
          code:
            'ElectronicsClassification/1.0/852.storage temperature range, 757',
          comparable: true,
          featureUnit: {
            name: 'degrees Celcium',
            symbol: '°C',
            unitType: '65'
          },
          featureValues: [
            {
              value: '-40'
            },
            {
              value: '85'
            }
          ],
          name: 'Storage temperature range (T-T)',
          range: true
        }
      ],
      name: 'Environmental conditions'
    },
    {
      code: '4162',
      features: [
        {
          code: 'ElectronicsClassification/1.0/4162.colour of product, 1766',
          comparable: true,
          featureUnit: {
            name: '.',
            symbol: '.',
            unitType: '300'
          },
          featureValues: [
            {
              value: 'Black'
            }
          ],
          name: 'Colour of product',
          range: false
        }
      ],
      name: 'Colour'
    }
  ],
  code: id,
  description: 'Secure Digital High Capacity cards ',
  manufacturer: 'Kingston',
  name: '32GB SDHC Card',
  numberOfReviews: 0,
  price: {
    currencyIso: 'USD',
    formattedValue: '$142.70',
    priceType: 'BUY',
    value: 142.7
  },
  priceRange: {},
  purchasable: true,
  stock: {
    stockLevel: 4,
    stockLevelStatus: 'lowStock'
  },
  summary: 'SD High Capacity',
  url: '/electronics/products/1641905'
};

fdescribe('ProductAttributesComponent in product', () => {
  let store: Store<fromProduct.ProductState>;
  let productAttributesComponent: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
          }),
          RouterTestingModule
        ],
        declarations: [ProductAttributesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    productAttributesComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should create', () => {
    expect(productAttributesComponent).toBeTruthy();
  });

  it('should load specified data', () => {
    productAttributesComponent.productCode = id;
    productAttributesComponent.ngOnChanges();
    expect(productAttributesComponent.model).toEqual(componentData[0]);
  });
});
