/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  provideDefaultFeatureToggles,
  provideDefaultFeatureTogglesFactory,
  provideFeatureToggles,
  provideFeatureTogglesFactory,
} from './feature-toggles-providers';
import {
  DefaultFeatureTogglesChunk,
  FeatureToggles,
  FeatureTogglesChunk,
} from './feature-toggles-tokens';

describe('FeatureToggles providers', () => {
  describe(`provideFeatureToggles`, () => {
    it('should provide FeatureTogglesChunk with the given toggles', () => {
      const toggles = { test: true } as FeatureToggles;
      const provider = provideFeatureToggles(toggles);
      expect(provider).toEqual({
        provide: FeatureTogglesChunk,
        useValue: toggles,
        multi: true,
      });
    });
  });

  describe(`provideDefaultFeatureToggles`, () => {
    it('should provide DefaultFeatureTogglesChunk with the given toggles', () => {
      const toggles = { test: true } as FeatureToggles;
      const provider = provideDefaultFeatureToggles(toggles);
      expect(provider).toEqual({
        provide: DefaultFeatureTogglesChunk,
        useValue: toggles,
        multi: true,
      });
    });
  });

  describe(`provideFeatureTogglesFactory`, () => {
    it('should provide FeatureTogglesChunk with the given factory', () => {
      const factory = () => ({ test: true } as FeatureToggles);
      const provider = provideFeatureTogglesFactory(factory);
      expect(provider).toEqual({
        provide: FeatureTogglesChunk,
        useFactory: factory,
        multi: true,
      });
    });
  });

  describe(`provideDefaultFeatureTogglesFactory`, () => {
    it('should provide DefaultFeatureTogglesChunk with the given factory', () => {
      const factory = () => ({ test: true } as FeatureToggles);
      const provider = provideDefaultFeatureTogglesFactory(factory);
      expect(provider).toEqual({
        provide: DefaultFeatureTogglesChunk,
        useFactory: factory,
        multi: true,
      });
    });
  });
});
