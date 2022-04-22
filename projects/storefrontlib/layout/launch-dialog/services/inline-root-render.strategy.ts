import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  RendererFactory2,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { LaunchInlineRootDialog, LAUNCH_CALLER } from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class InlineRootRenderStrategy extends LaunchRenderStrategy {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected rendererFactory: RendererFactory2,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector
  ) {
    super(document, rendererFactory);
  }

  get hostComponent() {
    return this.injector.get(ApplicationRef)?.components?.[0];
  }

  render(
    config: LaunchInlineRootDialog,
    caller: LAUNCH_CALLER | string
  ): Observable<ComponentRef<any>> | void {
    if (this.shouldRender(caller, config)) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(config.component);

      const contentInjector = Injector.create({
        providers: [],
      });

      const componentRef = componentFactory.create(contentInjector);

      this.injector.get(ApplicationRef)?.attachView(componentRef.hostView);

      this.renderer.appendChild(
        this.hostComponent?.location.nativeElement,
        componentRef.location.nativeElement
      );

      if (config?.dialogType) {
        this.applyClasses(componentRef, config?.dialogType);
      }

      this.renderedCallers.push({ caller, component: componentRef });

      return of(componentRef);
    }
  }

  hasMatch(config: LaunchInlineRootDialog) {
    return Boolean(config.inlineRoot);
  }
}
