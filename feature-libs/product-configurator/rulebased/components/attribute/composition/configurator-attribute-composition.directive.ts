/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  FeatureConfigService,
  LoggerService,
  ObjectComparisonUtils,
} from '@spartacus/core';
import {
  AttributeComponentAssignment,
  ConfiguratorAttributeCompositionConfig,
} from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';
import { Configurator } from '../../../core/model/configurator.model';

@Directive({
  selector: '[cxConfiguratorAttributeComponent]',
  standalone: false,
})
export class ConfiguratorAttributeCompositionDirective
  implements OnInit, OnChanges
{
  @Input('cxConfiguratorAttributeComponent')
  context: ConfiguratorAttributeCompositionContext;

  protected lastRenderedAttribute: Configurator.Attribute;
  protected lastRenderedGroupId: string;

  protected logger = inject(LoggerService);
  private featureConfigService = inject(FeatureConfigService);

  protected readonly attrComponentAssignment: AttributeComponentAssignment =
    this.configuratorAttributeCompositionConfig.productConfigurator
      ?.assignment ?? [];

  constructor(
    protected vcr: ViewContainerRef,
    protected configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig
  ) {}

  ngOnInit(): void {
    if (
      !this.featureConfigService.isEnabled('productConfiguratorDeltaRendering')
    ) {
      const key = this.context.componentKey;
      this.renderComponent(this.attrComponentAssignment[key], key);
    }
  }

  /*
   * Each time we update the configuration a completely new configuration state is emitted, including new attribute objects,
   * regardless of whether an attribute actually changed or not. Hence, we compare the last rendered attribute with the current state
   * and only destroy and re-create the attribute component, if there are actual changes to its data. This improves performance significantly.
   */
  ngOnChanges(): void {
    if (
      this.featureConfigService.isEnabled('productConfiguratorDeltaRendering')
    ) {
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
