import { Inject, Injectable, ViewContainerRef } from '@angular/core';
import {
  LaunchConfig,
  LaunchOptions,
  LAUNCH_CALLER,
} from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class LaunchDialogService {
  // Keep a list of rendered elements
  protected renderedCallers: LAUNCH_CALLER[] = [];

  constructor(
    @Inject(LaunchRenderStrategy)
    protected renderStrategies: LaunchRenderStrategy[],
    protected launchConfig: LaunchConfig
  ) {
    this.renderStrategies = this.renderStrategies || [];
  }

  /**
   * Render the element based on the strategy from the trigger configuration
   *
   * @param caller LAUNCH_CALLER
   * @param vcr View Container Ref of the container for inline rendering
   */
  launch(caller: LAUNCH_CALLER, vcr?: ViewContainerRef): void {
    const config = this.findConfiguration(caller);
    const renderer = this.getStrategy(config);

    // Render if the strategy exists
    if (renderer) {
      renderer.render(config, caller, vcr);
    }
  }

  /**
   * Util method to remove element from rendered elements list
   *
   * @param caller LAUNCH_CALLER
   */
  clear(caller: LAUNCH_CALLER): void {
    const config = this.findConfiguration(caller);
    const renderer = this.getStrategy(config);

    // Render if the strategy exists
    if (renderer) {
      renderer.remove(caller, config);
    }
  }

  /**
   * Returns the configuration for the caller
   *
   * @param caller LAUNCH_CALLER
   */
  protected findConfiguration(caller: LAUNCH_CALLER): LaunchOptions {
    return this.launchConfig?.launch[caller];
  }

  /**
   * Returns the render strategy based on the configuration
   *
   * @param config Configuration for trigger
   */
  protected getStrategy(config: LaunchOptions): LaunchRenderStrategy {
    return this.renderStrategies.find((strategy) => strategy.match(config));
  }
}
