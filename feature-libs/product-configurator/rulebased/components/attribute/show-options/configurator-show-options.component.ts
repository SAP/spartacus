/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, Input } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { delay, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';

@Component({
  selector: 'cx-configurator-show-options',
  templateUrl: './configurator-show-options.component.html',
  imports: [TranslatePipe],
})
export class ConfiguratorShowOptionsComponent {
  protected configuratorCommonsService = inject(ConfiguratorCommonsService);

  @Input() attributeComponentContext: ConfiguratorAttributeCompositionContext;

  constructor(
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  /**
   * fires a request to read the attribute domain,
   * so that all options of the attribute become visible on the UI
   */
  showOptions() {
    this.configuratorCommonsService.readAttributeDomain(
      this.attributeComponentContext.owner,
      this.attributeComponentContext.group,
      this.attributeComponentContext.attribute
    );
    this.focusFirstValue();
  }

  protected focusFirstValue(): void {
    this.configuratorCommonsService
      .isConfigurationLoading(this.attributeComponentContext.owner)
      .pipe(
        distinctUntilChanged(),
        filter((isLoading) => !isLoading),
        take(1),
        delay(0) // we need to consider the re-rendering of the page
      )
      .subscribe(() =>
        this.configuratorStorefrontUtilsService.focusFirstActiveElement(
          '#' +
            this.configuratorStorefrontUtilsService.createAttributeUiKey(
              'group-attribute',
              this.attributeComponentContext.attribute.name
            )
        )
      );
  }
}
