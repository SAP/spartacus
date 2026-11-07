/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { Converter, ConverterService } from '../converter.service';

/**
 * Mock of {@link ConverterService} for unit tests. By default conversions are
 * identity (the source is returned unchanged).
 *
 * Methods return sensible defaults; override any of them per test with
 * `vi.spyOn(service, 'method').mockReturnValue(...)`.
 */
@Injectable()
export class MockConverterService implements Partial<ConverterService> {
  convert<S, T>(source: S, _injectionToken: InjectionToken<Converter<S, T>>): T {
    return source as unknown as T;
  }

  convertMany<S, T>(
    sources: S[],
    _injectionToken: InjectionToken<Converter<S, T>>
  ): T[] {
    return (sources ?? []) as unknown as T[];
  }

  pipeable<S, T>(
    _injectionToken: InjectionToken<Converter<S, T>>
  ): OperatorFunction<S, T> {
    return (source$: Observable<S>) => source$ as unknown as Observable<T>;
  }

  pipeableMany<S, T>(
    _injectionToken: InjectionToken<Converter<S, T>>
  ): OperatorFunction<S[], T[]> {
    return (source$: Observable<S[]>) => source$ as unknown as Observable<T[]>;
  }

  hasConverters<S, T>(_injectionToken: InjectionToken<Converter<S, T>>): boolean {
    return false;
  }
}
