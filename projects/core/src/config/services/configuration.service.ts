import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, zip } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { isFeatureEnabled } from '../../features-config';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import {
  Config,
  ConfigChunk,
  DefaultConfig,
  DefaultConfigChunk,
  RootConfig,
} from '../config-tokens';
import { deepMerge } from '../utils/deep-merge';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService implements OnDestroy {
  /**
   * Will emit unified configuration when some ambient configuration will appear
   *
   * Ambient configuration can appear when we lazy load module with configuration
   */
  readonly unifiedConfig$: Observable<Config>;

  /**
   * Global application configuration
   */
  readonly config: Config;

  private readonly ambientDefaultConfig: Config = {};
  private readonly ambientConfig: Config = {};

  private subscription: Subscription;

  constructor(
    @Inject(RootConfig) protected rootConfig: Config,
    @Inject(DefaultConfig) protected defaultConfig: Config,
    protected unifiedInjector: UnifiedInjector,
    config: Config
  ) {
    this.config = config;
    this.unifiedConfig$ = new BehaviorSubject(config);

    // We need to use subscription to propagate changes to the config from the beginning.
    // It will be possible to make it lazy, when we drop this compatibility feature
    // in the future.
    this.subscription = this.feedUnifiedConfig().subscribe();
  }

  private feedUnifiedConfig(): Observable<[Config[], Config[]]> {
    const configChunks$: Observable<Config[]> = this.unifiedInjector.get(
      ConfigChunk,
      []
    );
    const defaultConfigChunks$: Observable<Config[]> = this.unifiedInjector.get(
      DefaultConfigChunk,
      []
    );

    return zip(configChunks$, defaultConfigChunks$).pipe(
      // we don't need result from the root injector
      skip(1),
      tap(([configChunks, defaultConfigChunks]) =>
        this.processConfig(configChunks, defaultConfigChunks)
      )
    );
  }

  private processConfig(configChunks: Config[], defaultConfigChunks: Config[]) {
    if (defaultConfigChunks?.length) {
      deepMerge(
        this.ambientDefaultConfig as Record<string, unknown>,
        ...defaultConfigChunks
      );
    }
    if (configChunks.length) {
      deepMerge(this.ambientConfig as Record<string, unknown>, ...configChunks);
    }

    if (configChunks.length || defaultConfigChunks.length) {
      this.emitUnifiedConfig();
    }
  }

  private emitUnifiedConfig(): void {
    const newConfig: Config = deepMerge(
      {},
      this.defaultConfig,
      this.ambientDefaultConfig,
      this.ambientConfig,
      this.rootConfig
    );
    (this.unifiedConfig$ as BehaviorSubject<Config>).next(newConfig);

    // compatibility mechanism, can be disabled with feature toggle
    if (!isFeatureEnabled(this.config, 'disableConfigUpdates')) {
      deepMerge(this.config as Record<string, unknown>, newConfig);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    (this.unifiedConfig$ as BehaviorSubject<Config>).complete();
  }
}
