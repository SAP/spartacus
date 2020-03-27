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
import { Observable, Subscription } from 'rxjs';
import { ComponentLauncherMap } from './component-launcher-mapping';
import { ComponentLauncherService } from './launchers/component-launcher.service';
import { ComponentMapperService } from './services/component-mapper.service';

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

  initializerSubscription: Subscription;

  constructor(
    private componentMapper: ComponentMapperService,
    private injector: Injector,
    private cmsService: CmsService,
    private dynamicAttributeService: DynamicAttributeService,
    private renderer: Renderer2,
    protected launcherMap: ComponentLauncherMap
  ) {}

  ngOnInit() {
    if (
      this.componentMapper.shouldRenderComponent(
        this.cxComponentWrapper.flexType
      )
    ) {
      this.launch();
    }
  }

  private launch() {
    this.initializerSubscription = this.getLauncher()?.subscribe(
      ([elementRef, componentRef]: [ElementRef, ComponentRef<any>]) => {
        this.cmpRef = componentRef;
        // decorate element
        if (this.cmsService.isLaunchInSmartEdit()) {
          this.addSmartEditContract(elementRef.nativeElement);
        }
      }
    );
  }

  private getLauncher():
    | Observable<[ElementRef, ComponentRef<any>?]>
    | undefined {
    const launcherServiceClass = this.launcherMap[
      this.componentMapper.getComponentType(this.cxComponentWrapper.flexType)
    ];

    if (launcherServiceClass) {
      return this.injector
        .get<ComponentLauncherService>(launcherServiceClass)
        ?.getLauncher(
          this.cxComponentWrapper.flexType,
          this.cxComponentWrapper.uid,
          this.injector
        );
    }
  }

  private addSmartEditContract(element: Element) {
    this.dynamicAttributeService.addDynamicAttributes(
      this.cxComponentWrapper.properties,
      element,
      this.renderer
    );
  }

  ngOnDestroy() {
    if (this.initializerSubscription) {
      this.initializerSubscription.unsubscribe();
    }
  }
}
