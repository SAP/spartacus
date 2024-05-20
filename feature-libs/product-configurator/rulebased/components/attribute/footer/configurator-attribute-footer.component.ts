/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';
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
    protected configUtils: ConfiguratorStorefrontUtilsService,
    protected attributeComponentContext: ConfiguratorAttributeCompositionContext
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

  protected needsRequiredAttributeErrorMsg(): boolean {
    return this.needsUserInputMsg() || this.needsDropDownMsg();
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
}
