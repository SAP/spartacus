/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, Renderer2, Type, ViewContainerRef, inject } from '@angular/core';
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
@Directive({
  selector: '[cxComponentWrapper]',
  standalone: false,
})
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  protected vcr = inject(ViewContainerRef);
  protected cmsComponentsService = inject(CmsComponentsService);
  protected injector = inject(Injector);
  protected dynamicAttributeService = inject(DynamicAttributeService);
  protected renderer = inject(Renderer2);
  protected componentHandler = inject(ComponentHandlerService);
  protected cmsInjector = inject(CmsInjectorService);
  protected eventService = inject(EventService);

  @Input() cxComponentWrapper: ContentSlotComponentData;
  @Output() cxComponentRef = new EventEmitter<ComponentRef<any>>();

  /**
   * This property in unsafe, i.e.
   * - cmpRef can be set later because of lazy loading or deferred loading
   * - cmpRef can be not set at all if for example, web components are used as cms components
   */
  protected cmpRef?: ComponentRef<any>;

  private launcherResource?: Subscription;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
