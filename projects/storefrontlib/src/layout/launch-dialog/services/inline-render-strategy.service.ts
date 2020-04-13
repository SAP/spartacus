import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  isDevMode,
  RendererFactory2,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { BackdropComponent } from '../../../shared/components/backdrop/index';
import { LaunchInlineDialog, LAUNCH_CALLER } from '../config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRenderStrategy extends LaunchRenderStrategy {
  constructor(
    protected rendererFactory: RendererFactory2,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(rendererFactory);
  }

  /**
   * Renders the component from the configuration in the view container ref
   *
   * @param config
   * @param caller
   * @param vcr
   */
  render(
    config: LaunchInlineDialog,
    caller: LAUNCH_CALLER,
    vcr: ViewContainerRef
  ): Observable<ComponentRef<any>> {
    // Only render if a ViewContainerRef is provided
    if (vcr && this.shouldRender(caller, config)) {
      let component: ComponentRef<any>;

      const template = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );

      if (config.options?.dialogType) {
        if (config.options?.backdrop) {
          this.renderBackdrop(vcr);
        }

        component = vcr.createComponent(template);
        this.applyClasses(component, config.options?.dialogType);
      } else {
        component = vcr.createComponent(template);
      }
      this.renderedCallers.push({ caller, element: vcr.element, component });

      return of(component);
    } else if (isDevMode()) {
      if (!vcr) {
        console.warn(`No view container ref provided for ${caller}`);
      } else {
        console.warn(
          `Element for ${caller} already rendered. To allow multi rendering add property multi: true.`
        );
      }
    }
  }

  match(config: LaunchInlineDialog) {
    return Boolean(config.inline);
  }

  protected renderBackdrop(
    vcr: ViewContainerRef
  ): ComponentRef<BackdropComponent> {
    const backdropTemplate = this.componentFactoryResolver.resolveComponentFactory(
      BackdropComponent
    );
    const backdrop = vcr.createComponent(backdropTemplate);
    return backdrop;
  }
}
