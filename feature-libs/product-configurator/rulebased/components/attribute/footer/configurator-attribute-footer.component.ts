/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
} from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';

@Component({
  selector: 'cx-configurator-attribute-footer',
  templateUrl: './configurator-attribute-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeFooterComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  attribute: Configurator.Attribute;
  owner: CommonConfigurator.Owner;
  groupId: string;

  constructor(
    configUtils: ConfiguratorStorefrontUtilsService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfigService?: FeatureConfigService
  );

  /**
   * @deprecated since 6.2
   */
  constructor(
    configUtils: ConfiguratorStorefrontUtilsService,
    attributeComponentContext: ConfiguratorAttributeCompositionContext
  );

  constructor(
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext,
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {
    super();
    this.attribute = attributeComponentContext.attribute;
    this.owner = attributeComponentContext.owner;
    this.groupId = attributeComponentContext.group.id;
  }

  iconType = ICON_TYPE;
  showRequiredMessageForUserInput$: Observable<boolean>;

  ngOnInit(): void {
    /**
     * Show message that indicates that attribute is required in case attribute is a
     * free input field or a drop-dow list
     */
    this.showRequiredMessageForUserInput$ = this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(
        map((result) =>
          result ? this.needsRequiredAttributeErrorMsg() : false
        )
      );
  }

  // TODO (CXSPA-3392): for next major release remove featureConfigService
  protected needsRequiredAttributeErrorMsg(): boolean {
    if (this.featureConfigService?.isLevel('6.2')) {
      // TODO: for next major release only these requirements should be proved
      return this.needsUserInputMsg() || this.needsDropDownMsg();
    } else {
      return this.needsUserInputMsg();
    }
  }

  protected needsDropDownMsg(): boolean {
    return (
      this.isRequiredErrorMsg(this.attribute) &&
      this.isDropDown(this.attribute) &&
      this.isNoValueSelected(this.attribute)
    );
  }

  /**
   * Checks if attribute is a user input typed attribute with empty value.
   * Method will return false for domain based attributes
   * @param {string} input - user input
   */
  isUserInputEmpty(input?: string): boolean {
    return input !== undefined && (!input.trim() || 0 === input.length);
  }

  protected needsUserInputMsg(): boolean {
    return (
      this.isRequiredErrorMsg(this.attribute) &&
      this.isUserInput(this.attribute) &&
      this.isUserInputEmpty(this.attribute.userInput)
    );
  }

  /**
   * @deprecated since 6.2
   *
   * `needsUserInputMsg` method will be called instead.
   */
  protected needsUserInputMessage(): boolean {
    const uiType = this.attribute.uiType;
    const needsMessage =
      this.attribute.required &&
      this.attribute.incomplete &&
      (uiType === Configurator.UiType.STRING ||
        uiType === Configurator.UiType.NUMERIC) &&
      this.isUserInputEmpty(this.attribute.userInput);
    return needsMessage ?? false;
  }
}
