import { Inject, Injectable, ViewContainerRef } from '@angular/core';
import {
  TriggerConfig,
  TriggerRenderStrategy,
  TRIGGER_CALLER,
} from '../config/trigger-config';
import { RenderStrategy } from './render.strategy';

@Injectable({ providedIn: 'root' })
export class LaunchService {
  // Keep a list of rendered elements
  protected renderedCallers: TRIGGER_CALLER[] = [];

  constructor(
    @Inject(RenderStrategy)
    protected renderStrategies: RenderStrategy[],
    protected triggerConfig: TriggerConfig
  ) {
    this.renderStrategies = this.renderStrategies || [];
  }

  /**
   * Render the element based on the strategy from the trigger configuration
   *
   * @param caller TRIGGER_CALLER
   * @param vcr View Container Ref of the container for inline rendering
   */
  launch(caller: TRIGGER_CALLER, vcr?: ViewContainerRef): void {
    const config = this.findConfiguration(caller);
    const renderer = this.getRenderStrategy(config);

    // Render if the strategy exists
    if (renderer) {
      renderer.render(config, caller, vcr);
    }
  }

  /**
   * Util method to remove element from rendered elements list
   *
   * @param caller TRIGGER_CALLER
   */
  clear(caller: TRIGGER_CALLER): void {
    const config = this.findConfiguration(caller);
    const renderer = this.getRenderStrategy(config);

    // Render if the strategy exists
    if (renderer) {
      renderer.removeRendered(caller, config);
    }
  }

  /**
   * Returns the configuration for the caller
   *
   * @param caller TRIGGER_CALLER
   */
  protected findConfiguration(caller: TRIGGER_CALLER): TriggerRenderStrategy {
    return this.triggerConfig?.trigger[caller];
  }

  /**
   * Returns the render strategy based on the configuration
   *
   * @param config Configuration for trigger
   */
  protected getRenderStrategy(config: TriggerRenderStrategy): RenderStrategy {
    return this.renderStrategies.find(strategy => strategy.match(config));
  }
}
