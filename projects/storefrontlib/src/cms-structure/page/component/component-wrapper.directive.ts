import {
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  CmsService,
  ContentSlotComponentData,
  DynamicAttributeService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CmsMappingService } from '../../services/cms-mapping.service';
import { ComponentHandlerService } from './services/component-handler.service';

@Directive({
  selector: '[cxComponentWrapper]',
})
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  @Input() cxComponentWrapper: ContentSlotComponentData;

  /**
   * @deprecated since 2.0
   *
   * This property in unsafe, i.e.
   * - cmpRef can be set later because of lazy loading or deferred loading
   * - cmpRef can be not set at all if for example, web components are used as cms components
   */
  cmpRef?: ComponentRef<any>;

  private launcherResource?: Subscription;

  constructor(
    protected injector: Injector,
    protected cmsMappingService: CmsMappingService,
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected componentHandler: ComponentHandlerService
  ) {}

  ngOnInit() {
    if (
      this.cmsMappingService.isComponentEnabled(
        this.cxComponentWrapper.flexType
      )
    ) {
      this.launchComponent();
    }
  }

  private launchComponent() {
    const componentMapping = this.cmsMappingService.getComponentMapping(
      this.cxComponentWrapper.flexType
    );

    this.launcherResource = this.componentHandler
      .resolve(componentMapping)
      ?.launcher(
        this.cxComponentWrapper.flexType,
        this.cxComponentWrapper.uid,
        this.injector
      )
      ?.subscribe(
        ([elementRef, componentRef]: [ElementRef, ComponentRef<any>]) => {
          this.cmpRef = componentRef;
          this.decorate(elementRef);
        }
      );
  }

  private decorate(elementRef: ElementRef) {
    if (this.cmsService.isLaunchInSmartEdit()) {
      this.dynamicAttributeService.addDynamicAttributes(
        this.cxComponentWrapper.properties,
        elementRef.nativeElement,
        this.renderer
      );
    }
  }

  ngOnDestroy() {
    if (this.launcherResource) {
      this.launcherResource.unsubscribe();
    }
  }
}
