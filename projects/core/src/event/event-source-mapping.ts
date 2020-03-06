import { FactoryProvider, InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';

export type EventSourceMapping<T> = {
  type: Type<T>;
  source$: Observable<T>;
};

export const EVENT_SOURCE_MAPPINGS = new InjectionToken<
  EventSourceMapping<any>[]
>('EVENT_SOURCE_MAPPINGS');

export function provideEventSources<T>(
  useFactory: (..._args: any[]) => EventSourceMapping<T>[],
  deps?: any[]
): FactoryProvider {
  return {
    provide: EVENT_SOURCE_MAPPINGS,
    multi: true,
    useFactory,
    deps,
  };
}
