import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromCms from '../../cms/store';
import * as fromCart from '../../cart/store';
import * as fromUser from '../../user/store';
import * as fromAuth from '@auth/store';
import { ConfigService } from '../../cms/config.service';

import { MiniCartComponent } from './mini-cart.component';
import { CartService } from '../../cart/services/cart.service';
import { CartDataService } from '../../cart/services/cart-data.service';

export class UseConfigService {
  cmsComponentMapping = {
    MiniCartComponent: 'MiniCartComponent'
  };
}

describe('MiniCartComponent', () => {
  let store: Store<fromCms.CmsState>;
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;

  const mockComponentData = {
    uid: '001',
    typeCode: 'MiniCartComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    shownProductCount: '3',
    lightboxBannerComponent: {
      uid: 'banner',
      typeCode: 'SimpleBannerComponent'
    }
  };

  const testCart: any = {
    code: 'xxx',
    guid: 'xxx',
    total_items: 0,
    deliveryItemsQuantity: '1',
    total_price: {
      currency_iso: 'USD',
      value: 10.0
    },
    total_price_with_tax: {
      currency_iso: 'USD',
      value: 10.0
    }
  };

  const testEntries: any = [
    { '1234': { entryNumber: 0, product: { code: '1234' } } }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cms: combineReducers(fromCms.reducers),
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers),
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      declarations: [MiniCartComponent],
      providers: [
        CartService,
        CartDataService,
        { provide: ConfigService, useClass: UseConfigService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    miniCartComponent = fixture.componentInstance;

    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValues(
      of(mockComponentData),
      of(testCart),
      of(testEntries)
    );
  });

  it('should be created', () => {
    expect(miniCartComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(miniCartComponent.component).toBeNull();

    miniCartComponent.bootstrap();
    expect(miniCartComponent.component).toBe(mockComponentData);

    expect(miniCartComponent.banner).toBe(
      mockComponentData.lightboxBannerComponent
    );
    expect(miniCartComponent.showProductCount).toEqual(
      +mockComponentData.shownProductCount
    );
  });

  // will do the ui test after replace Material
});
