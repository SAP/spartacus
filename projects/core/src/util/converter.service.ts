import { Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UnifiedInjector } from '../lazy-loading/unified-injector';
import { getLastValueSync } from './rxjs/get-last-value-sync';

/**
 * Converter is used to convert source data model to target data model.
 * By convention, we distinguish two flows:
 *   - *Normalize* is the conversion from backend models to UI models
 *   - *Serialize* is the conversion of UI models to backend models (in case of submitting data to the backend).
 *
 * Converters can be stacked together to to apply decoupled customizations
 */
export interface Converter<S, T> {
  /**
   * Convert converts source model to target model. Can use optional target parameter,
   * used in case of stacking multiple converters (for example, to implement populator pattern).
   *
   * @param source Source data model
   * @param target Optional, partially converted target model
   */
  convert(source: S, target?: T): T;
}

@Injectable({
  providedIn: 'root',
})
export class ConverterService implements OnDestroy {
  protected subscriptions = new Subscription();

  constructor(protected unifiedInjector: UnifiedInjector) {
    // Clear cached converters when new injectors appear
    const cacheResetLogic = this.unifiedInjector.injectors$.pipe(
      tap(() => this.converters.clear())
    );

    this.subscriptions.add(cacheResetLogic.subscribe());
  }

  private converters: Map<
    InjectionToken<Converter<any, any>>,
    Converter<any, any>[]
  > = new Map();

  private getConverters<S, T>(
    injectionToken: InjectionToken<Converter<S, T>>
  ): Converter<S, T>[] {
    if (!this.converters.has(injectionToken)) {
      const converters = getLastValueSync(
        this.unifiedInjector.getMulti(injectionToken)
      );
      this.converters.set(injectionToken, converters);
    }

    return this.converters.get(injectionToken);
  }

  /**
   * Will return true if converters for specified token were provided
   */
  hasConverters<S, T>(
    injectionToken: InjectionToken<Converter<S, T>>
  ): boolean {
    const converters = this.getConverters(injectionToken);
    return Array.isArray(converters) && converters.length > 0;
  }

  /**
   * Pipeable operator to apply converter logic in a observable stream
   */
  pipeable<S, T>(
    injectionToken: InjectionToken<Converter<S, T>>
  ): OperatorFunction<S, T> {
    if (this.hasConverters(injectionToken)) {
      return map((model: S) => this.convertSource(model, injectionToken));
    } else {
      return (observable: Observable<any>) => observable as Observable<T>;
    }
  }

  /**
   * Pipeable operator to apply converter logic in a observable stream to collection of items
   */
  pipeableMany<S, T>(
    injectionToken: InjectionToken<Converter<S, T>>
  ): OperatorFunction<S[], T[]> {
    if (this.hasConverters(injectionToken)) {
      return map((model: S[]) => this.convertMany(model, injectionToken));
    } else {
      return (observable: Observable<any[]>) => observable as Observable<T[]>;
    }
  }

  /**
   * Apply converter logic specified by injection token to source data
   */
  convert<S, T>(source: S, injectionToken: InjectionToken<Converter<S, T>>): T {
    if (this.hasConverters(injectionToken)) {
      return this.convertSource(source, injectionToken);
    } else {
      return source as any;
    }
  }

  /**
   * Apply converter logic specified by injection token to a collection
   */
  convertMany<S, T>(
    sources: S[],
    injectionToken: InjectionToken<Converter<S, T>>
  ): T[] {
    if (this.hasConverters(injectionToken) && Array.isArray(sources)) {
      return sources.map((source) =>
        this.convertSource(source, injectionToken)
      );
    } else {
      return sources as any[];
    }
  }

  private convertSource<S, T>(
    source: S,
    injectionToken: InjectionToken<Converter<S, T>>
  ): T {
    return this.getConverters(injectionToken).reduce((target, converter) => {
      return converter.convert(source, target);
    }, undefined as T);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
