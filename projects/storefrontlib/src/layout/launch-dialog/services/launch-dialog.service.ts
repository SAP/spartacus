import {
  ComponentRef,
  Inject,
  Injectable,
  isDevMode,
  ViewContainerRef,
} from '@angular/core';
import { resolveApplicable } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutConfig } from '../../config/layout-config';
import { LaunchOptions, LAUNCH_CALLER } from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class LaunchDialogService {
  private _dialogClose = new BehaviorSubject<string>(undefined);
  private _dataSubject = new BehaviorSubject<any>(undefined);

  get data$(): Observable<any> {
    return this._dataSubject.asObservable();
  }

  constructor(
    @Inject(LaunchRenderStrategy)
    protected renderStrategies: LaunchRenderStrategy[],
    protected layoutConfig: LayoutConfig
  ) {
    this.renderStrategies = this.renderStrategies || [];
  }

  /**
   * Render the element based on the strategy from the launch configuration
   *
   * @param caller LAUNCH_CALLER
   * @param vcr View Container Ref of the container for inline rendering
   */
  launch(
    caller: LAUNCH_CALLER | string,
    vcr?: ViewContainerRef,
    data?: any
  ): void | Observable<ComponentRef<any>> {
    const config = this.findConfiguration(caller);
    if (config) {
      const renderer = this.getStrategy(config);

      // Render if the strategy exists
      if (renderer) {
        this._dialogClose.next(undefined);
        this._dataSubject.next(data);

        return renderer.render(config, caller, vcr);
      }
    } else if (isDevMode()) {
      console.warn('No configuration provided for caller ' + caller);
    }
  }

  /**
   * Util method to remove element from rendered elements list
   *
   * @param caller LAUNCH_CALLER
   */
  clear(caller: LAUNCH_CALLER | string): void {
    const config = this.findConfiguration(caller);
    const renderer = this.getStrategy(config);

    // Render if the strategy exists
    if (renderer) {
      renderer.remove(caller, config);
    }
  }

  get dialogClose(): Observable<string> {
    return this._dialogClose.asObservable();
  }

  closeDialog(reason: string) {
    this._dialogClose.next(reason);
  }

  /**
   * Returns the configuration for the caller
   *
   * @param caller LAUNCH_CALLER
   */
  protected findConfiguration(caller: LAUNCH_CALLER | string): LaunchOptions {
    if (this.layoutConfig?.launch) {
      return this.layoutConfig.launch[caller];
    }
    return undefined;
  }

  /**
   * Returns the render strategy based on the configuration
   *
   * @param config Configuration for launch
   */
  protected getStrategy(config: LaunchOptions): LaunchRenderStrategy {
    return resolveApplicable(this.renderStrategies, [config]);
  }
}
