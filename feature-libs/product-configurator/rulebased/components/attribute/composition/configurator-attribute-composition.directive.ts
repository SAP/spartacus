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
  ViewContainerRef,
} from '@angular/core';
import { LoggerService, ObjectComparisonUtils } from '@spartacus/core';
import { ConfiguratorAttributeCompositionConfig } from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';
import { Configurator } from '@spartacus/product-configurator/rulebased';

@Directive({
  selector: '[cxConfiguratorAttributeComponent]',
})
export class ConfiguratorAttributeCompositionDirective implements OnChanges {
  @Input('cxConfiguratorAttributeComponent')
  context: ConfiguratorAttributeCompositionContext;

  protected logger = inject(LoggerService);
  protected attribute: Configurator.Attribute;

  constructor(
    protected vcr: ViewContainerRef,
    protected configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig
  ) {}

  ngOnChanges(): void {
    // Each time we update the configuration a complete new configuration state is emitted, including new attributes objects, regardless of if an attribute actually changed.
    // Hence we compare the last rendered attribute with the the current state and only re-render the attribute if there are actual changes. This improves performance significantly.
    const attributeDeepEqualsPreviousVersion =
      this.attribute &&
      ObjectComparisonUtils.deepEqualObjects(
        this.attribute,
        this.context.attribute
      );
    if (attributeDeepEqualsPreviousVersion) {
      return;
    }
    this.attribute = this.context.attribute;

    const componentKey = this.context.componentKey;
    const composition =
      this.configuratorAttributeCompositionConfig.productConfigurator
        ?.assignment;
    if (composition) {
      this.vcr.clear();
      this.renderComponent(composition[componentKey], componentKey);
    }
  }

  protected renderComponent(component: any, componentKey: string) {
    if (component) {
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
