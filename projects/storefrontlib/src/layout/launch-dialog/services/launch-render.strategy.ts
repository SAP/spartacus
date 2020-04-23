import { ViewContainerRef } from '@angular/core';
import { LAUNCH_CALLER, LaunchDialog, LaunchOptions } from '../config';
import { Applicable } from '@spartacus/core';

export abstract class LaunchRenderStrategy implements Applicable {
  // List of called references; only used for rendered elements
  protected renderedCallers: Array<{
    caller: LAUNCH_CALLER;
    element?: any;
  }> = [];

  /**
   * Render method to implement based on the strategy
   *
   * @param config Launch configuration
   */
  abstract render(
    config: LaunchOptions,
    caller: LAUNCH_CALLER,
    vcr?: ViewContainerRef
  ): void;

  /**
   * Determines if the strategy is the right one for the provided configuration
   *
   * @param config
   */
  abstract hasMatch(config: LaunchOptions): boolean;

  /**
   * Determines if element should render
   *
   * @param caller
   * @param config
   */
  protected shouldRender(caller: LAUNCH_CALLER, config: LaunchDialog): boolean {
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
  public remove(caller: LAUNCH_CALLER, _config?: LaunchOptions): void {
    this.renderedCallers = this.renderedCallers.filter(
      (el) => el.caller === caller
    );
  }
}
