import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {
  ContentSlotComponentData,
  DynamicAttributeService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CmsComponentsService } from '../../services/cms-components.service';
import { CmsInjectorService } from './services/cms-injector.service';
import { ComponentHandlerService } from './services/component-handler.service';

/**
 * Directive used to facilitate instantiation of CMS driven dynamic components
 */
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
    protected vcr: ViewContainerRef,
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected componentHandler: ComponentHandlerService,
    protected cmsInjector: CmsInjectorService
  ) {}

  ngOnInit() {
    this.cmsComponentsService
      .determineMappings([this.cxComponentWrapper.flexType])
      .subscribe(() => {
        if (
          this.cmsComponentsService.shouldRender(
            this.cxComponentWrapper.flexType
          )
        ) {
          this.launchComponent();
        }
      });
  }

  private launchComponent() {
    const componentMapping = this.cmsComponentsService.getMapping(
      this.cxComponentWrapper.flexType
    );

    if (!componentMapping) {
      return;
    }

    this.launcherResource = this.componentHandler
      .getLauncher(
        componentMapping,
        this.vcr,
        this.cmsInjector.getInjector(
          this.cxComponentWrapper.flexType,
          this.cxComponentWrapper.uid,
          this.injector
        ),
        this.cmsComponentsService.getModule(this.cxComponentWrapper.flexType)
      )
      ?.subscribe(({ elementRef, componentRef }) => {
        this.cmpRef = componentRef;
        this.decorate(elementRef);
        this.injector.get(ChangeDetectorRef).markForCheck();
      });
  }

  private decorate(elementRef: ElementRef): void {
    this.dynamicAttributeService.addDynamicAttributes(
      elementRef.nativeElement,
      this.renderer,
      { componentData: this.cxComponentWrapper }
    );
  }

  ngOnDestroy() {
    if (this.launcherResource) {
      this.launcherResource.unsubscribe();
    }
  }
}
