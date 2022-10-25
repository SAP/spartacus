import { StateWithPickupLocations } from '../pickup-location-state';
import {
  getIntendedPickupLocationByProductCode,
  getIntendedPickupLocations,
  getPickupOptionByProductCode,
} from './pickup-locations.selectors';

describe('PickupLocationSelectors', () => {
  describe('getIntendedPickupLocations', () => {
    it('should return the intended pickup locations', () => {
      const state: StateWithPickupLocations = {
        'pickup-locations': {
          intendedPickupLocations: {
            P0001: {
              name: 'Test',
              pickupOption: 'pickup',
            },
          },
          storeDetails: {},
          defaultPointOfService: {
            displayName: 'London School',
            name: 'London School',
          },
        },
      };
      const result = getIntendedPickupLocations(state);
      expect(result).toEqual(state['pickup-locations'].intendedPickupLocations);
    });
  });

  describe('getIntendedPickupLocationByProductCode', () => {
    it('should return the intended pickup location for a given product', () => {
      const state: StateWithPickupLocations = {
        'pickup-locations': {
          intendedPickupLocations: {
            P0001: {
              name: 'Test',
              pickupOption: 'pickup',
            },
          },
          storeDetails: {},
          defaultPointOfService: {
            displayName: 'London School',
            name: 'London School',
          },
        },
      };
      const result = getIntendedPickupLocationByProductCode('P0001')(state);
      expect(result).toEqual(
        state['pickup-locations'].intendedPickupLocations['P0001']
      );
    });
  });

  describe('getPickupOptionByProductCode', () => {
    it('should return a pickup option for product code', () => {
      const state: StateWithPickupLocations = {
        'pickup-locations': {
          intendedPickupLocations: {
            P0001: {
              name: 'Test',
              pickupOption: 'pickup',
            },
            P0002: {
              pickupOption: 'delivery',
            },
          },
          storeDetails: {},
          defaultPointOfService: {
            displayName: 'London School',
            name: 'London School',
          },
        },
      };

      const state2: StateWithPickupLocations = {
        'pickup-locations': {
          intendedPickupLocations: {},
          storeDetails: {},
          defaultPointOfService: {
            displayName: 'London School',
            name: 'London School',
          },
        },
      };

      const result = getPickupOptionByProductCode('P0001')(state);
      const result2 = getPickupOptionByProductCode('P0002')(state);
      const result3 = getPickupOptionByProductCode('P0002')(state2);
      expect(result).toEqual('pickup');
      expect(result2).toEqual('delivery');
      expect(result3).toEqual('delivery');
    });
  });
});
