import { ViewContainerRef } from '@angular/core';
import { LaunchDialog, LaunchOptions, TRIGGER_CALLER } from '../config';

export abstract class LaunchRenderStrategy {
  // List of called references; only used for rendered elements
  protected renderedCallers: Array<{
    caller: TRIGGER_CALLER;
    element?: any;
  }> = [];

  /**
   * Render method to implement based on the strategy
   *
   * @param config Trigger configuration
   */
  abstract render(
    config: LaunchOptions,
    caller: TRIGGER_CALLER,
    vcr?: ViewContainerRef
  ): void;

  /**
   * Determines if the strategy is the right one for the provided configuration
   *
   * @param config
   */
  abstract match(config: LaunchOptions): boolean;

  /**
   * Determines if element should render
   *
   * @param caller
   * @param config
   */
  protected shouldRender(
    caller: TRIGGER_CALLER,
    config: LaunchDialog
  ): boolean {
    return this.renderedCallers.some((el) => el.caller === caller)
      ? !!config.multi
      : true;
  }

  /**
   * Method to call when rendered element is destroyed
   * The element will be removed from the list of rendered elements
   *
   * @param caller
   * @param _config optional parameters used in children strategies
   */
  public remove(caller: TRIGGER_CALLER, _config?: LaunchOptions): void {
    this.renderedCallers = this.renderedCallers.filter(
      (el) => el.caller === caller
    );
  }
}
