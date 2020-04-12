import {
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import {
  CmsComponentMapping,
  CmsService,
  ContentSlotComponentData,
  DynamicAttributeService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CmsMappingService } from '../../services/cms-mapping.service';
import { ComponentHandler } from './handlers/component-handler';

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

  launcherResource: Subscription;

  constructor(
    protected injector: Injector,
    protected cmsMappingService: CmsMappingService,
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    @Optional()
    @Inject(ComponentHandler)
    protected handlers: ComponentHandler[]
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

    const componentHandler = this.resolveHandler(componentMapping);

    this.launcherResource = componentHandler
      .launch(
        this.cxComponentWrapper.flexType,
        this.cxComponentWrapper.uid,
        this.injector
      )
      .subscribe(
        ([elementRef, componentRef]: [ElementRef, ComponentRef<any>]) => {
          this.cmpRef = componentRef;
          this.decorate(elementRef);
        }
      );
  }

  private resolveHandler(
    componentMapping: CmsComponentMapping
  ): ComponentHandler {
    const matchedHandlers = this.handlers.filter((handler) =>
      handler.hasMatch(componentMapping)
    );
    if (matchedHandlers.length > 1) {
      matchedHandlers.sort((a, b) => a.getPriority() - b.getPriority());
    }
    return matchedHandlers[matchedHandlers.length - 1];
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
