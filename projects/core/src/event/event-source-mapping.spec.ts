import { FactoryProvider } from '@angular/core';
import {
  EVENT_SOURCE_MAPPINGS,
  provideEventSources,
} from './event-source-mapping';

describe('provideEventSources', () => {
  it('should return a factory provider for EVENT_SOURCE_MAPPINGS', () => {
    const factory = () => null;
    const deps = [];

    expect(provideEventSources(factory, deps)).toEqual({
      provide: EVENT_SOURCE_MAPPINGS,
      useFactory: factory,
      deps: deps,
      multi: true,
    } as FactoryProvider);
  });
});
