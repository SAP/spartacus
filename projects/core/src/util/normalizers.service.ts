import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class Normalizer<S, T> {
  abstract normalize(source: S, target: T): T;
}

@Injectable({
  providedIn: 'root',
})
export class NormalizersService {
  constructor(private injector: Injector) {}

  private normalizers: Map<
    InjectionToken<Normalizer<any, any>>,
    Normalizer<any, any>[]
  > = new Map();

  private getNormalizers<S, T>(
    injectionToken: InjectionToken<Normalizer<S, T>>
  ): Normalizer<S, T>[] {
    if (!this.normalizers.has(injectionToken)) {
      this.normalizers.set(
        injectionToken,
        this.injector.get<Normalizer<S, T>[]>(injectionToken, [])
      );
    }

    return this.normalizers.get(injectionToken);
  }

  hasNormalizers<S, T>(
    injectionToken: InjectionToken<Normalizer<S, T>>
  ): boolean {
    const normalizers = this.getNormalizers(injectionToken);
    return Array.isArray(normalizers) && normalizers.length > 0;
  }

  pipeable<S, T>(
    injetionToken: InjectionToken<Normalizer<S, T>>
  ): OperatorFunction<S, T> {
    if (this.hasNormalizers(injetionToken)) {
      return map((model: any) => this.normalizeSource(model, injetionToken));
    } else {
      return (observable: Observable<any>) => observable as Observable<T>;
    }
  }

  normalize<S, T>(
    source: S,
    injectionToken: InjectionToken<Normalizer<S, T>>
  ): T {
    if (this.hasNormalizers(injectionToken)) {
      return this.normalizeSource(source, injectionToken);
    } else {
      return source as any;
    }
  }

  private normalizeSource<S, T>(
    source: S,
    injectionToken: InjectionToken<Normalizer<S, T>>
  ): T {
    return this.getNormalizers(injectionToken).reduce(
      (target, normalizer) => {
        return normalizer.normalize(source, target);
      },
      undefined as T
    );
  }
}
