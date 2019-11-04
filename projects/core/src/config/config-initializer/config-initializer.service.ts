import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { CONFIG_INITIALIZER, ConfigInitializer } from './config-initializer';
import { Config } from '../config.module';
import { BehaviorSubject } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';
import { deepMerge } from '../utils/deep-merge';

@Injectable({
  providedIn: 'root',
})
export class ConfigInitializerService {
  constructor(
    @Inject(Config) protected config: any,
    @Optional()
    @Inject(CONFIG_INITIALIZER)
    protected initializers: ConfigInitializer[]
  ) {
    this.initialize();
  }

  protected ongoingScopes$ = new BehaviorSubject<string[]>(undefined);

  get isStable(): boolean {
    return this.ongoingScopes$.value && this.ongoingScopes$.value.length === 0;
  }

  async getStableConfig(...scopes: string[]): Promise<any> {
    if (this.isStable) {
      return this.config;
    }
    return this.ongoingScopes$
      .pipe(
        filter(
          ongoingScopes => ongoingScopes && this.areReady(scopes, ongoingScopes)
        ),
        take(1),
        mapTo(this.config)
      )
      .toPromise();
  }

  protected finishScopes(scopes: string[]) {
    const newScopes = [...this.ongoingScopes$.value];
    for (const scope of scopes) {
      newScopes.splice(newScopes.indexOf(scope), 1);
    }
    this.ongoingScopes$.next(newScopes);
  }

  protected areReady(scopes: string[], ongoingScopes: string[]): boolean {
    if (!scopes.length) {
      return !ongoingScopes.length;
    }
    for (const scope of scopes) {
      for (const ongoingScope of ongoingScopes) {
        if (this.scopesOverlap(scope, ongoingScope)) {
          return false;
        }
      }
    }
    return true;
  }

  protected scopesOverlap(a: string, b: string): boolean {
    if (b.length > a.length) {
      [a, b] = [b, a];
    }
    return a.startsWith(b) && (a[b.length] || '.') === '.';
  }

  private initialize() {
    const ongoingScopes: string[] = [];

    if (!(this.initializers && this.initializers.length)) {
      this.ongoingScopes$.next(ongoingScopes);
      return;
    }

    const asyncConfigs: Promise<void>[] = [];

    for (const initializer of this.initializers) {
      if (!(initializer.scopes && initializer.scopes.length)) {
        this.ongoingScopes$.error('CONFIG_INITIALIZER should provide scope!');
        return;
      }

      if (isDevMode() && !this.areReady(initializer.scopes, ongoingScopes)) {
        console.warn(
          'More than one CONFIG_INITIALIZER is initializing the same config scope.'
        );
      }

      ongoingScopes.push(...initializer.scopes);

      asyncConfigs.push(
        (async () => {
          deepMerge(this.config, await initializer.configFactory());
          this.finishScopes(initializer.scopes);
        })()
      );
    }
    this.ongoingScopes$.next(ongoingScopes);

    Promise.all(asyncConfigs).catch(error => this.ongoingScopes$.error(error));
  }
}
