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
  ) {}

  protected ongoingScopes$ = new BehaviorSubject<string[]>(undefined);

  async getStableConfig(...scopes: string[]): Promise<any> {
    console.log('aaa', scopes);
    if (!this.config.initializing) {
      return this.config;
    }
    return this.ongoingScopes$
      .pipe(
        filter(
          ongoingScopes => ongoingScopes && this.areReady(ongoingScopes, scopes)
        ),
        take(1),
        mapTo(this.config)
      )
      .toPromise();
  }

  protected finishScope(scopes: string[]) {
    const newScopes = [...this.ongoingScopes$.value];
    for (const scope of scopes) {
      newScopes.splice(newScopes.indexOf(scope), 1);
    }
    this.ongoingScopes$.next(newScopes);
  }

  protected areReady(ongoing: string[], waitingFor: string[]): boolean {
    if (!waitingFor.length) {
      return !ongoing.length;
    }
    for (const waitingScope of waitingFor) {
      if (!this.isReady(ongoing, waitingScope)) {
        return false;
      }
    }
    return true;
  }

  protected isReady(ongoing: string[], waitingScope: string): boolean {
    for (const scope of ongoing) {
      if (
        waitingScope.startsWith(scope) &&
        (waitingScope[scope.length] || '.' === '.')
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * @internal
   */
  async initialize() {
    if (this.ongoingScopes$.value) {
      // guard against multiple initialization calls
      return;
    }

    if (!(this.initializers && this.initializers.length)) {
      deepMerge(this.config, { initializing: false });
      this.ongoingScopes$.next([]);
      return;
    }

    const ongoingScopes = ['initializing'];

    const asyncConfigs = [];

    for (const initializer of this.initializers) {
      if (isDevMode() && !(initializer.scopes && initializer.scopes.length)) {
        console.error('CONFIG_INITIALIZER should provide scope!');
      }

      if (isDevMode() && !this.areReady(ongoingScopes, initializer.scopes)) {
        console.warn(
          'More that one CONFIG_INITIALIZER is initializing the same config scope'
        );
      }

      ongoingScopes.push(...initializer.scopes);

      asyncConfigs.push(
        (async () => {
          deepMerge(this.config, await initializer.configFactory());
          this.finishScope(initializer.scopes);
        })()
      );
    }
    this.ongoingScopes$.next(ongoingScopes);
    await Promise.all(asyncConfigs);

    if (this.ongoingScopes$.value.length > 1) {
      console.error(
        "Config couldn't initialize properly!",
        this.ongoingScopes$.value.slice(1)
      );
    } else {
      deepMerge(this.config, { initializing: false });
      this.finishScope(['initializing']);
    }
  }
}
