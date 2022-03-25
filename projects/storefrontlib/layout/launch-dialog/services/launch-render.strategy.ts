import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { Applicable, Priority } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  DIALOG_TYPE,
  LaunchDialog,
  LaunchOptions,
  LAUNCH_CALLER,
} from '../config';

export abstract class LaunchRenderStrategy implements Applicable {
  // List of called references; only used for rendered elements
  protected renderedCallers: Array<{
    caller: LAUNCH_CALLER | string;
    element?: any;
    component?: ComponentRef<any>;
  }> = [];

  /**
   * Classes to apply to the component when the dialog is a DIALOG
   */
  protected dialogClasses = ['d-block', 'fade', 'modal', 'show'];
  /**
   * Classes to apply to the component when the dialog is a POPOVER
   */
  protected popoverClasses = ['cx-dialog-popover'];
  /**
   * Classes to apply to the component when the dialog is a POPOVER_CENTER
   */
  protected popoverCenterClasses = ['cx-dialog-popover-center'];
  /**
   * Classes to apply to the component when the dialog is a POPOVER_CENTER with a backdrop
   */
  protected popoverCenterBackdropClasses = [
    'cx-dialog-popover-center-backdrop',
  ];
  /**
   * Classes to apply to the component when the dialog is a SIDEBAR_END
   */
  protected sidebarEndClasses = ['cx-sidebar-end'];
  /**
   * Classes to apply to the component when the dialog is a SIDEBAR_START
   */
  protected sidebarStartClasses = ['cx-sidebar-start'];

  protected renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Render method to implement based on the strategy
   *
   * @param config Launch configuration
   */
  abstract render(
    config: LaunchOptions,
    caller: LAUNCH_CALLER | string,
    vcr?: ViewContainerRef
  ): Observable<ComponentRef<any> | undefined> | void;

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
  protected shouldRender(
    caller: LAUNCH_CALLER | string,
    config: LaunchDialog
  ): boolean {
    return (
      Boolean(config.component) &&
      (this.renderedCallers.some((el) => el.caller === caller)
        ? !!config.multi
        : true)
    );
  }

  protected applyClasses(
    component: ComponentRef<any>,
    dialogType: DIALOG_TYPE
  ): void {
    let classes = [];

    // TODO: make classes configurable
    switch (dialogType) {
      case DIALOG_TYPE.DIALOG:
        classes = this.dialogClasses;
        this.renderer.addClass(this.document.body, 'modal-open');
        break;
      case DIALOG_TYPE.POPOVER:
        classes = this.popoverClasses;
        break;
      case DIALOG_TYPE.POPOVER_CENTER:
        classes = this.popoverCenterClasses;
        break;
      case DIALOG_TYPE.POPOVER_CENTER_BACKDROP:
        classes = this.popoverCenterBackdropClasses;
        break;
      case DIALOG_TYPE.SIDEBAR_END:
        classes = this.sidebarEndClasses;
        break;
      case DIALOG_TYPE.SIDEBAR_START:
        classes = this.sidebarStartClasses;
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
  public remove(caller: LAUNCH_CALLER | string, config: LaunchOptions): void {
    this.renderedCallers = this.renderedCallers.filter(
      (el) => el.caller !== caller
    );

    if ((config as LaunchDialog)?.dialogType === DIALOG_TYPE.DIALOG) {
      this.renderer.removeClass(this.document.body, 'modal-open');
    }
  }

  getPriority(): Priority {
    return Priority.LOW; // low, as it's a default matcher
  }
}
