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
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ConfiguratorAttributeCompositionConfig } from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';

@Directive({
  selector: '[cxConfiguratorAttributeComponent]',
})
export class ConfiguratorAttributeCompositionDirective implements OnInit {
  @Input('cxConfiguratorAttributeComponent')
  context: ConfiguratorAttributeCompositionContext;

  protected logger = inject(LoggerService);

  constructor(
    protected vcr: ViewContainerRef,
    protected configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig
  ) {}

  ngOnInit(): void {
    const componentKey = this.context.componentKey;

    const composition =
      this.configuratorAttributeCompositionConfig.productConfigurator
        ?.assignment;
    if (composition) {
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
