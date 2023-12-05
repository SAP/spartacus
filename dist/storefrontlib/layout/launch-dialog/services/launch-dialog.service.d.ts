import { ComponentRef, ElementRef, ViewContainerRef } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LayoutConfig } from '../../config/layout-config';
import { LAUNCH_CALLER, LaunchOptions } from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export declare class LaunchDialogService {
    protected renderStrategies: LaunchRenderStrategy[];
    protected layoutConfig: LayoutConfig;
    private _dialogClose;
    private _dataSubject;
    protected logger: LoggerService;
    get data$(): Observable<any>;
    constructor(renderStrategies: LaunchRenderStrategy[], layoutConfig: LayoutConfig);
    /**
     * Open the dialog
     *
     * @param caller LAUNCH_CALLER
     * @param openElement button's Element ref
     * @param vcr View Container Ref of the container for inline rendering
     * @param data optional data which could be passed to dialog
     */
    openDialog(caller: LAUNCH_CALLER | string, openElement?: ElementRef, vcr?: ViewContainerRef, data?: any): Observable<any> | undefined;
    /**
     * Render the element based on the strategy from the launch configuration
     *
     * @param caller LAUNCH_CALLER
     * @param vcr View Container Ref of the container for inline rendering
     */
    launch(caller: LAUNCH_CALLER | string, vcr?: ViewContainerRef, data?: any): void | Observable<ComponentRef<any> | undefined>;
    /**
     * Opens dialog and subscribe in the service. Should be used if the trigger component might get destroyed while the component is open.
     *
     * @param caller Launch Caller
     * @param openElement Element to open
     * @param data Data to provide to the rendered element
     */
    openDialogAndSubscribe(caller: LAUNCH_CALLER | string, openElement?: ElementRef, data?: any): void;
    /**
     * Util method to remove element from rendered elements list
     *
     * @param caller LAUNCH_CALLER
     */
    clear(caller: LAUNCH_CALLER | string): void;
    get dialogClose(): Observable<any | undefined>;
    closeDialog(reason: any): void;
    /**
     * Returns the configuration for the caller
     *
     * @param caller LAUNCH_CALLER
     */
    protected findConfiguration(caller: LAUNCH_CALLER | string): LaunchOptions | undefined;
    /**
     * Returns the render strategy based on the configuration
     *
     * @param config Configuration for launch
     */
    protected getStrategy(config: LaunchOptions): LaunchRenderStrategy | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<LaunchDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LaunchDialogService>;
}
