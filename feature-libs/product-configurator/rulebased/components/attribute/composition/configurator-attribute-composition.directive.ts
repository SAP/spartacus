/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  inject,
  Injector,
  Input,
  isDevMode,
  OnChanges,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService, ObjectComparisonUtils } from '@spartacus/core';
import { Configurator } from '../../../core/model/configurator.model';
import {
  AttributeComponentAssignment,
  ConfiguratorAttributeCompositionConfig,
} from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';

@Directive({ selector: '[cxConfiguratorAttributeComponent]' })
export class ConfiguratorAttributeCompositionDirective
  implements OnInit, OnChanges
{
  @Input('cxConfiguratorAttributeComponent')
  context: ConfiguratorAttributeCompositionContext;

  protected lastRenderedAttribute: Configurator.Attribute;
  protected lastRenderedGroupId: string;

  protected logger = inject(LoggerService);

  protected readonly attrComponentAssignment: AttributeComponentAssignment =
    this.configuratorAttributeCompositionConfig.productConfigurator
      ?.assignment ?? [];

  constructor(
    protected vcr: ViewContainerRef,
    protected configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig
  ) {}

  ngOnInit(): void {
    //We don't need this method but cannot remove it due to backward compatibility.
    //on the other hand we must nothave an empty method for a lifecycle hook
    if (isDevMode()) {
      this.logger.debug('On init called');
    }
  }

  /*
   * Each time we update the configuration a completely new configuration state is emitted, including new attribute objects,
   * regardless of whether an attribute actually changed or not. Hence, we compare the last rendered attribute with the current state
   * and only destroy and re-create the attribute component, if there are actual changes to its data. This improves performance significantly.
   */
  ngOnChanges(): void {
    const attributeChanged = !ObjectComparisonUtils.deepEqualObjects(
      this.lastRenderedAttribute,
      this.context.attribute
    );
    const groupChanged = this.lastRenderedGroupId !== this.context.group.id;
    // attribute can occur with same content twice in different groups
    // for example this happens for conflicts. An attribute is rendered differently (link from/to conflict) based on
    // if it is part of conflict group or of ordinary group
    if (attributeChanged || groupChanged) {
      const key = this.context.componentKey;
      this.renderComponent(this.attrComponentAssignment[key], key);
    }
  }

  protected renderComponent(component: any, componentKey: string) {
    if (component) {
      this.lastRenderedAttribute = this.context.attribute;
      this.lastRenderedGroupId = this.context.group.id;
      this.vcr.clear();
      this.vcr.createComponent(component, {
        injector: this.getComponentInjector(),
      });
    } else {
      if (isDevMode()) {
        this.logger.warn(
          'No attribute type component available for: ' + componentKey
        );
      }
    }
  }

  protected getComponentInjector(): Injector {
    return Injector.create({
      providers: [
        {
          provide: ConfiguratorAttributeCompositionContext,
          useValue: this.context,
        },
      ],
      parent: this.vcr.injector,
    });
  }
}
