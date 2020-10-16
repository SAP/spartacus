import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, zip } from 'rxjs';
import { deepMerge } from '../utils/deep-merge';
import { isFeatureEnabled } from '../../features-config';
import {
  Config,
  ConfigChunk,
  DefaultConfig,
  DefaultConfigChunk,
  RootConfig,
} from '../config-tokens';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { skip, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService implements OnDestroy {
  /**
   * Will emit unified configuration when some ambient configuration will appear
   *
   * Ambient configuration can appear when we lazy load module with configuration
   */
  readonly unifiedConfig$: Observable<any>;

  /**
   * Global application configuration
   */
  readonly config: any;

  private readonly ambientDefaultConfig: any = {};
  private readonly ambientConfig: any = {};

  private subscription: Subscription;

  constructor(
    @Inject(RootConfig) protected rootConfig: any,
    @Inject(DefaultConfig) protected defaultConfig: any,
    protected unifiedInjector: UnifiedInjector,
    @Inject(Config) config: any
  ) {
    this.config = config;
    this.unifiedConfig$ = new BehaviorSubject(config);

    // We need to use subscription to propagate changes to the config from the beginning.
    // It will be possible to make it lazy, when we drop this compatibility feature
    // in the future.
    this.subscription = this.feedUnifiedConfig().subscribe();
  }

  private feedUnifiedConfig(): Observable<any> {
    const configChunks$: Observable<object[]> = this.unifiedInjector.get(
      ConfigChunk,
      []
    );
    const defaultConfigChunks$ = this.unifiedInjector.get(
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

  private processConfig(configChunks: any[], defaultConfigChunks: any[]) {
    if (defaultConfigChunks?.length) {
      deepMerge(this.ambientDefaultConfig, ...defaultConfigChunks);
    }
    if (configChunks.length) {
      deepMerge(this.ambientConfig, ...configChunks);
    }

    if (configChunks.length || defaultConfigChunks.length) {
      this.emitUnifiedConfig();
    }
  }

  private emitUnifiedConfig(): void {
    const newConfig = deepMerge(
      {},
      this.defaultConfig,
      this.ambientDefaultConfig,
      this.ambientConfig,
      this.rootConfig
    );
    (this.unifiedConfig$ as BehaviorSubject<any>).next(newConfig);

    // compatibility mechanism, can be disabled with feature toggle
    if (!isFeatureEnabled(this.config, 'disableConfigUpdates')) {
      deepMerge(this.config, newConfig);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    (this.unifiedConfig$ as BehaviorSubject<any>).complete();
  }
}
