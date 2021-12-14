import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
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
  @Input() attribute: Configurator.Attribute;
  @Input() owner: CommonConfigurator.Owner;
  @Input() groupId: string;

  constructor(protected configUtils: ConfiguratorStorefrontUtilsService) {
    super();
  }

  iconType = ICON_TYPE;
  showRequiredMessageForUserInput$: Observable<boolean>;

  ngOnInit(): void {
    /**
     * Show message that indicates that attribute is required in case attribute is a
     * free input field
     */
    this.showRequiredMessageForUserInput$ = this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(map((result) => (result ? this.needsUserInputMessage() : false)));
  }

  /**
   * Checks if attribute is a user input typed attribute with empty value.
   * Method will return false for domain based attributes
   * @param {string} input - user input
   */
  isUserInputEmpty(input?: string): boolean {
    return input !== undefined && (!input.trim() || 0 === input.length);
  }

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
