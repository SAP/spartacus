import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Converter<S, T> {
  convert(source: S, target?: T): T;
}

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor(private injector: Injector) {}

  private converters: Map<
    InjectionToken<Converter<any, any>>,
    Converter<any, any>[]
  > = new Map();

  private getConverters<S, T>(
    injectionToken: InjectionToken<Converter<S, T>>
  ): Converter<S, T>[] {
    if (!this.converters.has(injectionToken)) {
      const converters = this.injector.get<Converter<S, T>[]>(
        injectionToken,
        []
      );
      if (!Array.isArray(converters)) {
        console.warn(
          'Converter must be multi-provided, please use "multi: true" for',
          injectionToken.toString()
        );
      }
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
      return map((model: any) => this.convertSource(model, injectionToken));
    } else {
      return (observable: Observable<any>) => observable as Observable<T>;
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

  private convertSource<S, T>(
    source: S,
    injectionToken: InjectionToken<Converter<S, T>>
  ): T {
    return this.getConverters(injectionToken).reduce(
      (target, converter) => {
        return converter.convert(source, target);
      },
      undefined as T
    );
  }
}
