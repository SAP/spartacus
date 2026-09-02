/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  ContentSlotComponentData,
  DynamicAttributeService,
  EventService,
  isNotUndefined,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, finalize, tap } from 'rxjs/operators';
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
@Directive({ selector: '[cxComponentWrapper]' })
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  @Input() cxComponentWrapper: ContentSlotComponentData;
  @Output() cxComponentRef = new EventEmitter<ComponentRef<any>>();

  /**
   * Marks this component as NOT being a direct child of a content slot, i.e. a
   * component nested inside a container component's attribute (e.g. a tab inside
   * `CMSTabParagraphContainer`, a slide inside a carousel, or an inner component).
   *
   * When set to `true`, the SmartEdit component HTML markup contract is not applied,
   * so SmartEdit does not offer a "Remove" action for the nested component (which
   * would fail with 404 because it is not a direct child of the slot).
   *
   * Containers that render nested children bind this to the `FeatureToggles` flag
   * `enableSmartEditContractForDirectSlotChildrenOnly` so that the behavior is opt-in.
   */
  @Input() cxComponentWrapperNested = false;

  /**
   * This property in unsafe, i.e.
   * - cmpRef can be set later because of lazy loading or deferred loading
   * - cmpRef can be not set at all if for example, web components are used as cms components
   */
  protected cmpRef?: ComponentRef<any>;

  private launcherResource?: Subscription;

  constructor(
    protected vcr: ViewContainerRef,
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected componentHandler: ComponentHandlerService,
    protected cmsInjector: CmsInjectorService,
    protected eventService: EventService
  ) {}

  ngOnInit() {
    this.cmsComponentsService
      .determineMappings([this.cxComponentWrapper.flexType ?? ''])
      .subscribe(() => {
        if (
          this.cmsComponentsService.shouldRender(
            this.cxComponentWrapper.flexType ?? ''
          )
        ) {
          this.launchComponent();
        }
      });
  }

  private launchComponent() {
    const componentMapping = this.cmsComponentsService.getMapping(
      this.cxComponentWrapper.flexType ?? ''
    );

    if (!componentMapping) {
      return;
    }

    this.launcherResource = this.componentHandler
      .getLauncher(
        componentMapping,
        this.vcr,
        this.cmsInjector.getInjector(
          this.cxComponentWrapper.flexType ?? '',
          this.cxComponentWrapper.uid ?? '',
          this.injector
        ),
        this.cmsComponentsService.getModule(
          this.cxComponentWrapper.flexType ?? ''
        )
      )
      ?.pipe(
        filter(isNotUndefined),
        tap(({ elementRef, componentRef }) => {
          this.cmpRef = componentRef;

          this.cxComponentRef.emit(componentRef);

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
    this.eventService.dispatch(payload, event);
  }

  private decorate(elementRef: ElementRef): void {
    // Nested components (not direct children of a content slot) must not receive the
    // SmartEdit component HTML markup contract, otherwise SmartEdit renders a "Remove"
    // action that fails with 404 (SLOT_COMPONENT_COMPONENT_NOT_IN_SLOT).
    if (this.cxComponentWrapperNested) {
      return;
    }
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
