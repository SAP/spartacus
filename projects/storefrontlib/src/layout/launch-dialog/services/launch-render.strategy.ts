import {
  ComponentRef,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  DIALOG_TYPE,
  LaunchDialog,
  LaunchOptions,
  LAUNCH_CALLER,
} from '../config';

export abstract class LaunchRenderStrategy {
  // List of called references; only used for rendered elements
  protected renderedCallers: Array<{
    caller: LAUNCH_CALLER;
    element?: any;
    component?: ComponentRef<any>;
  }> = [];
  protected renderer: Renderer2;

  constructor(protected rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Render method to implement based on the strategy
   *
   * @param config Launch configuration
   */
  abstract render(
    config: LaunchOptions,
    caller: LAUNCH_CALLER,
    vcr?: ViewContainerRef
  ): void | Observable<ComponentRef<any>>;

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
  protected shouldRender(caller: LAUNCH_CALLER, config: LaunchDialog): boolean {
    return this.renderedCallers.some((el) => el.caller === caller)
      ? !!config.multi
      : true;
  }

  protected applyClasses(
    component: ComponentRef<any>,
    dialogType: DIALOG_TYPE
  ): void {
    let classes = [];

    // TODO: make classes configurable
    switch (dialogType) {
      case DIALOG_TYPE.DIALOG:
        classes = ['d-block', 'fade', 'modal', 'show'];
        break;
      case DIALOG_TYPE.POPOVER:
        classes = [];
        break;
      case DIALOG_TYPE.SIDEBAR_END:
        classes = [];
        break;
      case DIALOG_TYPE.SIDEBAR_START:
        classes = [];
        break;
    }

    for (const newClass of classes) {
      this.renderer.addClass(component.location.nativeElement, newClass);
    }
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
      (el) => el.caller !== caller
    );
  }
}
