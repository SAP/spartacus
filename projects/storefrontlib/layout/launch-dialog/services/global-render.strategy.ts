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
import {
  LaunchGlobalDialog,
  LaunchInlineDialog,
  LAUNCH_CALLER,
} from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class GlobalRenderStrategy extends LaunchRenderStrategy {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    protected rendererFactory: RendererFactory2,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector
  ) {
    super(document, rendererFactory);
  }

  render(
    config: LaunchInlineDialog,
    caller: LAUNCH_CALLER | string
  ): Observable<ComponentRef<any> | undefined> | void {
    if (this.shouldRender(caller, config)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        config.component
      );

      const contentInjector = Injector.create({
        providers: [],
      });

      const componentRef = componentFactory.create(contentInjector);

      this.injector.get(ApplicationRef).attachView(componentRef.hostView);
      this.document.body.appendChild(componentRef.location.nativeElement);

      if (config?.dialogType) {
        this.applyClasses(componentRef, config?.dialogType);
      }

      this.renderedCallers.push({ caller, component: componentRef });

      return of(componentRef);
    }
  }

  hasMatch(config: LaunchGlobalDialog) {
    return Boolean(config.global);
  }
}
