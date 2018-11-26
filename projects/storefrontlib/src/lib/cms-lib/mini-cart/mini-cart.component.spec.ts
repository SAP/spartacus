import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterModule } from '@angular/router';

import * as NgrxStore from '@ngrx/store';
import { of } from 'rxjs';

import * as fromCart from '../../cart/store';
import * as fromUser from '../../user/store';
import * as fromAuth from '../../auth/store';
import { CmsModuleConfig } from '../../cms/cms-module-config';

import { MiniCartComponent } from './mini-cart.component';
import { CartService } from '../../cart/services/cart.service';
import { CartDataService } from '../../cart/services/cart-data.service';
import { CmsService } from '../../cms/facade/cms.service';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponents: {
    MiniCartComponent: { selector: 'MiniCartComponent' }
  }
};

describe('MiniCartComponent', () => {
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

  const MockCmsService = {
    getComponentData: () => of(mockComponentData)
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
        RouterTestingModule,
        NgrxStore.StoreModule.forRoot({}),
        NgrxStore.StoreModule.forFeature('cart', fromCart.getReducers()),
        NgrxStore.StoreModule.forFeature('user', fromUser.getReducers()),
        NgrxStore.StoreModule.forFeature('auth', fromAuth.getReducers())
      ],
      declarations: [MiniCartComponent],
      providers: [
        CartService,
        CartDataService,
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    miniCartComponent = fixture.componentInstance;

    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromCart.getActiveCart:
          return () => of(testCart);
        case fromCart.getEntries:
          return () => of(testEntries);
      }
    });
  });

  it('should be created', () => {
    expect(miniCartComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(miniCartComponent.component).toBeNull();
    miniCartComponent.onCmsComponentInit(mockComponentData.uid);
    expect(miniCartComponent.component).toBe(mockComponentData);

    expect(miniCartComponent.banner).toBe(
      mockComponentData.lightboxBannerComponent
    );
    expect(miniCartComponent.showProductCount).toEqual(
      +mockComponentData.shownProductCount
    );
  });

  describe('UI test', () => {
    it('should contain a link to redirect to /cart', () => {
      expect(fixture.debugElement.query(By.css('button[routerLink="/cart"]')));
    });
  });
});
