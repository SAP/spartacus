/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { CmsComponent } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CmsComponentData } from '../model/cms-component-data';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@Directive({ selector: '[cxInnerComponentsHost]' })
export class InnerComponentsHostDirective implements OnInit, OnDestroy {
  protected data = inject<CmsComponentData<CmsComponent>>(CmsComponentData);
  protected injector = inject(Injector);

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
    const componentWrapper = runInInjectionContext(
      this.injector,
      () => new ComponentWrapperDirective()
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
