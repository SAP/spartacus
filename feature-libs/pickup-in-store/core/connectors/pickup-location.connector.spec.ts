import { TestBed } from '@angular/core/testing';
import {
  SetPickupOptionDeliveryPayload,
  SetPickupOptionInStorePayload,
} from '@spartacus/pickup-in-store/root';

import { PickupLocationAdapter } from './pickup-location.adapter';
import { PickupLocationConnector } from './pickup-location.connector';
import createSpy = jasmine.createSpy;

describe('Pickup Location Connector', () => {
  let service: PickupLocationConnector;
  let adapter: PickupLocationAdapter;

  const MockStockAdapter = {
    getStoreDetails: createSpy(),
    setDeliveryOption: createSpy(),
    setPickupOptionInStore: createSpy(),
    setPickupOptionDelivery: createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: PickupLocationAdapter, useValue: MockStockAdapter },
      ],
    });

    service = TestBed.inject(PickupLocationConnector);
    adapter = TestBed.inject(PickupLocationAdapter);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStoreDetails from connector should call adapter getStoreDetails ', () => {
    service.getStoreDetails('storeName');
    expect(adapter.getStoreDetails).toHaveBeenCalledWith('storeName');
  });
  it('setPickupOptionInStore from connector should call adapter setPickupOptionInStore ', () => {
    const payload: SetPickupOptionInStorePayload = {
      deliveryPointOfService: {
        name: 'storeName',
      },
      quantity: 1,
    };

    service.setPickupOptionInStore('cartId', 1, 'userId', payload);
    expect(adapter.setPickupOptionInStore).toHaveBeenCalledWith(
      'cartId',
      1,
      'userId',
      payload
    );
  });

  it('setPickupOptionDelivery from connector should call adapter setPickupOptionDelivery ', () => {
    const payload: SetPickupOptionDeliveryPayload = {
      deliveryPointOfService: {
        name: 'storeName',
      },
      product: {
        code: 'productCode',
      },
      quantity: 1,
    };
    const cartId = 'cartID';
    const entryNumber = 1;
    const userId = 'userID';

    service.setPickupOptionDelivery(cartId, entryNumber, userId, payload);
    expect(adapter.setPickupOptionDelivery).toHaveBeenCalledWith(
      cartId,
      entryNumber,
      userId,
      payload
    );
  });
});
