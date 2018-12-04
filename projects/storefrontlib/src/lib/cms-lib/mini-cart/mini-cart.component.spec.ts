import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CartService } from '@spartacus/core';
import { CmsService } from '../../cms/facade/cms.service';

import { MiniCartComponent } from './mini-cart.component';

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

  const MockCartService = {
    cart$: of(testCart),
    entries$: of(testEntries)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiniCartComponent],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        { provide: CartService, useValue: MockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    miniCartComponent = fixture.componentInstance;
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
