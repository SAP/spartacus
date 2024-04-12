/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  DefaultFeatureToggles,
  DefaultFeatureTogglesChunk,
  FeatureToggles,
  FeatureTogglesChunk,
  RootFeatureToggles,
} from './feature-toggles-tokens';

describe('FeatureToggles injection tokens', () => {
  describe('FeatureTogglesChunk', () => {
    it('should fallback to empty array, unless anything provided', () => {
      TestBed.configureTestingModule({});
      expect(TestBed.inject(FeatureTogglesChunk)).toEqual([]);
    });
  });

  describe('DefaultFeatureTogglesChunk', () => {
    it('should fallback to empty array, unless anything provided', () => {
      TestBed.configureTestingModule({});
      expect(TestBed.inject(DefaultFeatureTogglesChunk)).toEqual([]);
    });
  });

  describe('RootFeatureToggles', () => {
    it('should fallback to empty object, unless anything provided', () => {
      TestBed.configureTestingModule({});
      expect(TestBed.inject(RootFeatureToggles)).toEqual({});
    });

    it('should consist of merged properties of all provided FeatureTogglesChunk', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test1: true },
          },
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test2: false },
          },
        ],
      });
      expect(TestBed.inject(RootFeatureToggles)).toEqual({
        test1: true,
        test2: false,
      } as FeatureToggles);
    });

    it('should consist of merged properties of all provided FeatureTogglesChunk, and last provided wins when they clash by name', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test1: true, test2: true },
          },
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test2: false, test3: false },
          },
        ],
      });
      expect(TestBed.inject(RootFeatureToggles)).toEqual({
        test1: true,
        test2: false,
        test3: false,
      } as FeatureToggles);
    });

    it('should NOT take into account DefaultFeatureTogglesChunk', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test1: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test2: false },
          },
        ],
      });
      expect(TestBed.inject(RootFeatureToggles)).toEqual({
        test1: true,
      } as FeatureToggles);
    });
  });

  describe('DefaultFeatureToggles', () => {
    it('should fallback to empty object, unless anything provided', () => {
      TestBed.configureTestingModule({});
      expect(TestBed.inject(DefaultFeatureToggles)).toEqual({});
    });

    it('should consist of merged properties of all provided DefaultFeatureTogglesChunk', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test1: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test2: false },
          },
        ],
      });
      expect(TestBed.inject(DefaultFeatureToggles)).toEqual({
        test1: true,
        test2: false,
      } as FeatureToggles);
    });

    it('should consist of merged properties of all provided DefaultFeatureTogglesChunk, and last provided wins when they clash by name', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test1: true, test2: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test2: false, test3: false },
          },
        ],
      });
      expect(TestBed.inject(DefaultFeatureToggles)).toEqual({
        test1: true,
        test2: false,
        test3: false,
      } as FeatureToggles);
    });

    it('should NOT take into account FeatureTogglesChunk', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test1: true },
          },
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test2: false },
          },
        ],
      });
      expect(TestBed.inject(DefaultFeatureToggles)).toEqual({
        test1: true,
      } as FeatureToggles);
    });
  });

  describe('FeatureToggles', () => {
    it('should fallback to empty object, unless anything provided', () => {
      TestBed.configureTestingModule({});
      expect(TestBed.inject(FeatureToggles)).toEqual({});
    });

    it('should consist of merged properties of all provided FeatureTogglesChunk and DefaultFeatureTogglesChunk', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test1: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test2: false },
          },
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test3: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test4: false },
          },
        ],
      });
      expect(TestBed.inject(FeatureToggles)).toEqual({
        test1: true,
        test2: false,
        test3: true,
        test4: false,
      } as FeatureToggles);
    });

    it('should favor FeatureTogglesChunk over DefaultFeatureTogglesChunk, when they clash by name', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test1: true, test2: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test2: false, test3: false },
          },
        ],
      });
      expect(TestBed.inject(FeatureToggles)).toEqual({
        test1: true,
        test2: true,
        test3: false,
      } as FeatureToggles);
    });

    it('should favor FeatureTogglesChunk over DefaultFeatureTogglesChunk, when they clash by name - test 2', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test1: true, test2: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test2: false, test3: false },
          },
          {
            provide: FeatureTogglesChunk,
            multi: true,
            useValue: { test3: true, test4: true },
          },
          {
            provide: DefaultFeatureTogglesChunk,
            multi: true,
            useValue: { test4: false, test5: false },
          },
        ],
      });
      expect(TestBed.inject(FeatureToggles)).toEqual({
        test1: true,
        test2: true,
        test3: true,
        test4: true,
        test5: false,
      } as FeatureToggles);
    });
  });
});
