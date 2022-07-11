import { StateWithPickupLocations } from '../pickup-location-state';
import {
  getIntendedPickupLocationByProductCodeFactory,
  getIntendedPickupLocations,
} from './pickup-locations.selectors';

describe('PickupLocationSelectors', () => {
  describe('getIntendedPickupLocations', () => {
    it('should return the intended pickup locations', () => {
      const state: StateWithPickupLocations = {
        'pickup-locations': {
          intendedPickupLocations: {
            P0001: {
              name: 'Test',
            },
          },
        },
      };
      const result = getIntendedPickupLocations(state);
      expect(result).toEqual(state['pickup-locations'].intendedPickupLocations);
    });
  });

  describe('getIntendedPickupLocationByProductCodeFactory', () => {
    it('should return the intended pickup location for a given product', () => {
      const state: StateWithPickupLocations = {
        'pickup-locations': {
          intendedPickupLocations: {
            P0001: {
              name: 'Test',
            },
          },
        },
      };
      const result =
        getIntendedPickupLocationByProductCodeFactory('P0001')(state);
      expect(result).toEqual(
        state['pickup-locations'].intendedPickupLocations['P0001']
      );
    });
  });
});
