import { ComponentRef, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { Applicable, Priority } from '@spartacus/core';
import { Observable } from 'rxjs';
import { DIALOG_TYPE, LaunchDialog, LaunchOptions, LAUNCH_CALLER } from '../config';
export declare abstract class LaunchRenderStrategy implements Applicable {
    protected document: any;
    protected rendererFactory: RendererFactory2;
    protected renderedCallers: Array<{
        caller: LAUNCH_CALLER | string;
        element?: any;
        component?: ComponentRef<any>;
    }>;
    /**
     * Classes to apply to the component when the dialog is a DIALOG
     */
    protected readonly dialogClasses: string[];
    /**
     * Classes to apply to the component when the dialog is a POPOVER
     */
    protected readonly popoverClasses: string[];
    /**
     * Classes to apply to the component when the dialog is a POPOVER_CENTER
     */
    protected readonly popoverCenterClasses: string[];
    /**
     * Classes to apply to the component when the dialog is a POPOVER_CENTER with a backdrop
     */
    protected readonly popoverCenterBackdropClasses: string[];
    /**
     * Classes to apply to the component when the dialog is a SIDEBAR_END
     */
    protected readonly sidebarEndClasses: string[];
    /**
     * Classes to apply to the component when the dialog is a SIDEBAR_START
     */
    protected readonly sidebarStartClasses: string[];
    protected renderer: Renderer2;
    constructor(document: any, rendererFactory: RendererFactory2);
    /**
     * Render method to implement based on the strategy
     *
     * @param config Launch configuration
     */
    abstract render(config: LaunchOptions, caller: LAUNCH_CALLER | string, vcr?: ViewContainerRef): Observable<ComponentRef<any> | undefined> | void;
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
    protected shouldRender(caller: LAUNCH_CALLER | string, config: LaunchDialog): boolean;
    protected applyClasses(component: ComponentRef<any>, dialogType: DIALOG_TYPE): void;
    /**
     * Method to call when rendered element is destroyed
     * The element will be removed from the list of rendered elements
     *
     * @param caller
     * @param _config optional parameters used in children strategies
     */
    remove(caller: LAUNCH_CALLER | string, config: LaunchOptions): void;
    getPriority(): Priority;
}
