/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Injector, OnDestroy, OnInit, Renderer2, ViewContainerRef, inject } from '@angular/core';
import {
  CmsComponent,
  DynamicAttributeService,
  EventService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CmsComponentsService } from '../../services/cms-components.service';
import { CmsComponentData } from '../model/cms-component-data';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { CmsInjectorService } from './services/cms-injector.service';
import { ComponentHandlerService } from './services/component-handler.service';

@Directive({
  selector: '[cxInnerComponentsHost]',
  standalone: false,
})
export class InnerComponentsHostDirective implements OnInit, OnDestroy {
  protected data = inject<CmsComponentData<CmsComponent>>(CmsComponentData);
  protected vcr = inject(ViewContainerRef);
  protected cmsComponentsService = inject(CmsComponentsService);
  protected injector = inject(Injector);
  protected dynamicAttributeService = inject(DynamicAttributeService);
  protected renderer = inject(Renderer2);
  protected componentHandler = inject(ComponentHandlerService);
  protected cmsInjector = inject(CmsInjectorService);
  protected eventService = inject(EventService);

  protected innerComponents$ = this.data.data$.pipe(
    map((data) => data?.composition?.inner ?? []),
    distinctUntilChanged()
  );

  protected componentWrappers: any[] = [];
  protected subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.innerComponents$.subscribe((x) => {
      this.renderComponents(x);
    });
  }

  protected renderComponents(components: string[]) {
    this.clearComponents();
    components.forEach((component) => this.renderComponent(component));
  }

  protected renderComponent(component: string) {
    const componentWrapper = new ComponentWrapperDirective(
      this.vcr,
      this.cmsComponentsService,
      this.injector,
      this.dynamicAttributeService,
      this.renderer,
      this.componentHandler,
      this.cmsInjector,
      this.eventService
    );
    componentWrapper.cxComponentWrapper = { flexType: component, uid: '' };
    componentWrapper.ngOnInit();
    this.componentWrappers.push(componentWrapper);
  }

  protected clearComponents() {
    this.componentWrappers.forEach((wrapper) => wrapper.ngOnDestroy());
    this.componentWrappers = [];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.clearComponents();
  }
}
