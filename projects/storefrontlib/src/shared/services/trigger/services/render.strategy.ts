import { ViewContainerRef } from '@angular/core';
import {
  TriggerInlineMapping,
  TriggerOutletMapping,
  TriggerRenderMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config';

export abstract class RenderStrategy {
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
    config: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping,
    caller: TRIGGER_CALLER,
    vcr?: ViewContainerRef
  ): void;

  /**
   * Determines if the strategy is the right one for the provided configuration
   *
   * @param config
   */
  abstract isStrategyForConfiguration(
    config: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping
  ): boolean;

  /**
   * Determines if element should render
   *
   * @param caller
   * @param config
   */
  protected shouldRender(
    caller: TRIGGER_CALLER,
    config: TriggerRenderMapping
  ): boolean {
    return this.renderedCallers.some(el => el.caller === caller)
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
  public removeRendered(
    caller: TRIGGER_CALLER,
    _config?: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping
  ): void {
    this.renderedCallers = this.renderedCallers.filter(
      el => el.caller === caller
    );
  }
}
