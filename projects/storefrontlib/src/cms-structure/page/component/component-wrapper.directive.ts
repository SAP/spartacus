import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  ContentSlotComponentData,
  DynamicAttributeService,
  EventService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CmsComponentsService } from '../../services/cms-components.service';
import {
  ComponentCreateEvent,
  ComponentDestroyEvent,
  ComponentEvent,
} from './events/component.event';
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

  /**
   * @deprecated since version 3.3
   * Use the following constructor instead:
   * ```
   * constructor( protected vcr: ViewContainerRef,
   * protected cmsComponentsService: CmsComponentsService,
   * protected injector: Injector,
   * protected dynamicAttributeService: DynamicAttributeService,
   * protected renderer: Renderer2,
   * protected componentHandler: ComponentHandlerService,
   * protected cmsInjector: CmsInjectorService,
   * protected eventService: EventService) {}
   * ```
   */
  constructor(
    vcr: ViewContainerRef,
    cmsComponentsService: CmsComponentsService,
    injector: Injector,
    dynamicAttributeService: DynamicAttributeService,
    renderer: Renderer2,
    componentHandler: ComponentHandlerService,
    cmsInjector: CmsInjectorService
  );
  constructor(
    protected vcr: ViewContainerRef,
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected componentHandler: ComponentHandlerService,
    protected cmsInjector: CmsInjectorService,
    @Optional() protected eventService?: EventService
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
      .pipe(
        tap(({ elementRef, componentRef }) => {
          this.cmpRef = componentRef;
          this.dispatchEvent(ComponentCreateEvent, elementRef);
          this.decorate(elementRef);
          this.injector.get(ChangeDetectorRef).markForCheck();
        }),
        finalize(() => this.dispatchEvent(ComponentDestroyEvent))
      )
      .subscribe();
  }

  /**
   * Dispatch the component event.
   *
   * The event is dispatched during creation and removal of the component.
   */
  protected dispatchEvent(
    event: Type<ComponentEvent>,
    elementRef?: ElementRef
  ) {
    const payload = {
      typeCode: this.cxComponentWrapper.typeCode,
      id: this.cxComponentWrapper.uid,
    } as ComponentEvent;
    if (event === ComponentCreateEvent) {
      (payload as ComponentCreateEvent).host = elementRef?.nativeElement;
    }
    this.eventService?.dispatch(payload, event);
  }

  private decorate(elementRef: ElementRef): void {
    this.dynamicAttributeService.addAttributesToComponent(
      elementRef.nativeElement,
      this.renderer,
      this.cxComponentWrapper
    );
  }

  ngOnDestroy() {
    if (this.launcherResource) {
      this.launcherResource.unsubscribe();
    }
  }
}
