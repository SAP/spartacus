import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';
import { Config, RootConfig } from '../config-tokens';
import { deepMerge } from '../utils/deep-merge';
import {
  ConfigInitializer,
  CONFIG_INITIALIZER_FORROOT_GUARD,
} from './config-initializer';

/**
 * Provides support for CONFIG_INITIALIZERS
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigInitializerService {
  constructor(
    protected config: Config,
    @Optional()
    @Inject(CONFIG_INITIALIZER_FORROOT_GUARD)
    protected initializerGuard: any,
    @Inject(RootConfig) protected rootConfig: Config
  ) {}

  protected ongoingScopes$ = new BehaviorSubject<string[] | undefined>(
    undefined
  );

  /**
   * Returns true if config is stable, i.e. all CONFIG_INITIALIZERS resolved correctly
   */
  get isStable(): boolean {
    return !this.initializerGuard || this.ongoingScopes$.value?.length === 0;
  }

  /**
   * Recommended way to get config for code that can run before app will finish
   * initialization (APP_INITIALIZERS, selected service constructors)
   *
   * Used without parameters waits for the whole config to become stable
   *
   * Parameters allow to describe which part of the config should be stable using
   * string describing config part, e.g.:
   * 'siteContext', 'siteContext.language', etc.
   *
   * @param scopes String describing parts of the config we want to be sure are stable
   */
  getStable(...scopes: string[]): Observable<Config> {
    if (this.isStable) {
      return of(this.config);
    }
    return this.ongoingScopes$.pipe(
      filter(
        (ongoingScopes) =>
          !!ongoingScopes && this.areReady(scopes, ongoingScopes)
      ),
      take(1),
      mapTo(this.config)
    );
  }

  /**
   * Removes provided scopes from currently ongoingScopes
   *
   * @param scopes
   */
  protected finishScopes(scopes: string[]) {
    const newScopes = [...(this.ongoingScopes$.value ?? [])];
    for (const scope of scopes) {
      newScopes.splice(newScopes.indexOf(scope), 1);
    }
    this.ongoingScopes$.next(newScopes);
  }

  /**
   * Return true if provided scopes are not part of ongoingScopes
   *
   * @param scopes
   * @param ongoingScopes
   */
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

  /**
   * Check if two scopes overlap.
   *
   * Example of scopes that overlap:
   * 'test' and 'test', 'test.a' and 'test', 'test' and 'test.a'
   *
   * Example of scopes that do not overlap:
   * 'test' and 'testA', 'test.a' and 'test.b', 'test.nested' and 'test.nest'
   *
   * @param a ScopeA
   * @param b ScopeB
   */
  protected scopesOverlap(a: string, b: string): boolean {
    if (b.length > a.length) {
      [a, b] = [b, a];
    }
    return a.startsWith(b) && (a[b.length] || '.') === '.';
  }

  /**
   * @internal
   *
   * Not a part of a public API, used by APP_INITIALIZER to initialize all provided CONFIG_INITIALIZERS
   *
   */
  async initialize(initializers?: ConfigInitializer[]) {
    if (this.ongoingScopes$.value) {
      // guard for double initialization
      return;
    }

    const ongoingScopes: string[] = [];

    const asyncConfigs: Promise<void>[] = [];

    for (const initializer of initializers || []) {
      if (!initializer) {
        continue;
      }
      if (!initializer.scopes || !initializer.scopes.length) {
        throw new Error('CONFIG_INITIALIZER should provide scope!');
      }

      if (isDevMode() && !this.areReady(initializer.scopes, ongoingScopes)) {
        console.warn(
          'More than one CONFIG_INITIALIZER is initializing the same config scope.'
        );
      }

      ongoingScopes.push(...initializer.scopes);

      asyncConfigs.push(
        (async () => {
          const initializerConfig = await initializer.configFactory();
          // contribute configuration to rootConfig
          deepMerge(
            this.rootConfig as Record<string, unknown>,
            initializerConfig
          );
          // contribute configuration to global config
          deepMerge(this.config as Record<string, unknown>, initializerConfig);
          this.finishScopes(initializer.scopes);
        })()
      );
    }
    this.ongoingScopes$.next(ongoingScopes);

    if (asyncConfigs.length) {
      await Promise.all(asyncConfigs);
    }
  }
}
