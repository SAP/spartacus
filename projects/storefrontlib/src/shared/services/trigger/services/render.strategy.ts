import {
  TriggerInlineMapping,
  TriggerMapping,
  TriggerOutletMapping,
  TriggerUrlMapping,
  TRIGGER_CALLER,
} from '../config';

export abstract class RenderStrategy {
  // List of called references; only used for rendered elements
  protected renderedCallers: TRIGGER_CALLER[] = [];

  /**
   * Render method to implement based on the strategy
   *
   * @param config Trigger configuration
   */
  abstract render(
    config: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping,
    caller: TRIGGER_CALLER
  ): void;

  /**
   * Determines if the strategy is the right one for the provided configuration
   *
   * @param config
   */
  abstract strategy(
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
    config: TriggerMapping
  ): boolean {
    return this.renderedCallers.includes(caller) ? !!config.multi : true;
  }

  /**
   * Method to call when rendered element is destroyed
   * The element will be removed from the list of rendered elements
   *
   * @param caller
   */
  public removeRendered(caller: TRIGGER_CALLER): void {
    this.renderedCallers = this.renderedCallers.filter(el => el === caller);
  }
}
