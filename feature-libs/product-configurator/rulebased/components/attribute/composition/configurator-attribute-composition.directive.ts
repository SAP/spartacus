/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { Configurator } from '@spartacus/product-configurator/rulebased';

const FEATURE_TOGGLE_PERF = 'productConfiguratorDeltaRendering';

@Directive({
  selector: '[cxConfiguratorAttributeComponent]',
})
export class ConfiguratorAttributeCompositionDirective
  implements OnInit, OnChanges
{
  @Input('cxConfiguratorAttributeComponent')
  context: ConfiguratorAttributeCompositionContext;

  protected lastRenderedAttribute: Configurator.Attribute;

  protected logger = inject(LoggerService);
  protected featureConfig = inject(FeatureConfigService);

  private readonly attrCompAssignment: AttributeComponentAssignment =
    this.configuratorAttributeCompositionConfig.productConfigurator
      ?.assignment ?? [];

  constructor(
    protected vcr: ViewContainerRef,
    protected configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig
  ) {}

  ngOnInit(): void {
    if (!this.featureConfig.isEnabled('productConfiguratorDeltaRendering')) {
      const componentKey = this.context.componentKey;
      this.renderComponent(this.attrCompAssignment[componentKey], componentKey);
    }
  }

  /*
   * Each time we update the configuration a completely new configuration state is emitted, including new attribute objects,
   * regardless of whether an attribute actually changed or not. Hence, we compare the last rendered attribute with the current state
   * and only destroy and re-create the attribute component, if there are actual changes to its data. This improves performance significantly.
   */
  ngOnChanges(): void {
    if (
      this.featureConfig.isEnabled(FEATURE_TOGGLE_PERF) &&
      !ObjectComparisonUtils.deepEqualObjects(
        this.lastRenderedAttribute,
        this.context.attribute
      )
    ) {
      const componentKey = this.context.componentKey;
      this.renderComponent(this.attrCompAssignment[componentKey], componentKey);
    }
  }

  protected renderComponent(component: any, componentKey: string) {
    if (component) {
      this.lastRenderedAttribute = this.context.attribute;
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
