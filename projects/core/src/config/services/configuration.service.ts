import {
  Inject,
  Injectable,
  InjectFlags,
  NgModuleRef,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { deepMerge } from '../utils/deep-merge';
import { isFeatureEnabled } from '../../features-config';
import {
  Config,
  ConfigChunk,
  DefaultConfig,
  DefaultConfigChunk,
  RootConfig,
} from '../config-tokens';
import { LazyModulesService } from '../../lazy-loading';

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
    protected lazyModules: LazyModulesService,
    @Inject(Config) config: any
  ) {
    this.config = config;
    this.unifiedConfig$ = new BehaviorSubject(config);

    // We need to use subscription to propagate changes to the config from the beginning.
    // It will be possible to make it lazy, when we drop this compatibility feature
    // in the future.
    this.subscription = this.lazyModules.modules$.subscribe((moduleRef) =>
      this.processModule(moduleRef)
    );
  }

  // We are extracting ambient configuration from lazy loaded modules
  private processModule(moduleRef: NgModuleRef<any>) {
    const defaultConfigs = moduleRef.injector.get(
      DefaultConfigChunk,
      null,
      InjectFlags.Self
    );
    if (defaultConfigs?.length) {
      deepMerge(this.ambientDefaultConfig, ...defaultConfigs);
    }
    const configs = moduleRef.injector.get(ConfigChunk, null, InjectFlags.Self);
    if (configs?.length) {
      deepMerge(this.ambientConfig, ...configs);
    }
    this.emitUnifiedConfig();
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
