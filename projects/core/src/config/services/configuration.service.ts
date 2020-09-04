import { Inject, Injectable, InjectFlags, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { deepMerge } from '../utils/deep-merge';
import { EventService } from '../../event/event.service';
import { ModuleInitializedEvent } from '../../cms/events/module-initialized-event';
import { isFeatureEnabled } from '../../features-config';
import {
  Config,
  ConfigChunk,
  DefaultConfig,
  DefaultConfigChunk,
  RootConfig,
} from '../config-injectors';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService implements OnDestroy {
  /**
   * Will emit unified configuration when some ambient configuration will appear
   *
   * Ambiet configuration can appear when we lazy load module with configuration
   */
  readonly unifiedConfig$: Observable<any>;

  /**
   * Global application configuration
   */
  readonly config: any;

  private readonly ambientDefaultConfig: any = {};
  private readonly ambientConfig: any = {};

  private eventsSubscription: Subscription;

  constructor(
    @Inject(RootConfig) protected rootConfig: any,
    @Inject(DefaultConfig) protected defaultConfig: any,
    protected events: EventService,
    @Inject(Config) config: any
  ) {
    this.config = config;
    this.unifiedConfig$ = new BehaviorSubject(config);

    this.eventsSubscription = this.events
      .get(ModuleInitializedEvent)
      .subscribe((moduleInitialized) => {
        this.processModule(moduleInitialized);
      });
  }

  // We are extracting ambient configuration from lazy loaded modules
  private processModule(moduleInitialized: ModuleInitializedEvent) {
    const defaultConfigs = moduleInitialized.moduleRef.injector.get(
      DefaultConfigChunk,
      null,
      InjectFlags.Self
    );
    if (defaultConfigs?.length) {
      deepMerge(this.ambientDefaultConfig, ...defaultConfigs);
    }
    const configs = moduleInitialized.moduleRef.injector.get(
      ConfigChunk,
      null,
      InjectFlags.Self
    );
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
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
