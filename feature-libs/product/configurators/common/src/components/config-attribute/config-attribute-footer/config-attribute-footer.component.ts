import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigUtilsService } from '../../service/config-utils.service';

@Component({
  selector: 'cx-config-attribute-footer',
  templateUrl: './config-attribute-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeFooterComponent {
  @Input() attribute: Configurator.Attribute;
  @Input() owner: GenericConfigurator.Owner;
  @Input() groupId: string;

  constructor(protected configUtils: ConfigUtilsService) {}

  iconTypes = ICON_TYPE;

  /**
   * Show message that indicates that attribute is required in case attribute is a
   * free input field
   */
  showRequiredMessageForUserInput(): Observable<boolean> {
    return this.configUtils
      .isCartEntryOrGroupVisited(this.owner, this.groupId)
      .pipe(
        map((result) => {
          if (
            result &&
            this.attribute.required &&
            this.attribute.incomplete &&
            this.isUserInputEmpty(this.attribute.userInput)
          ) {
            return true;
          }
          return false;
        })
      );
  }

  /**
   * Get resource key for message indicating that attribute is required
   */
  getRequiredMessageKey(): string {
    return 'configurator.attribute.defaultRequiredMessage';
  }

  /**
   * Checks if attribute is a user input typed attribute with empty value.
   * Method will return false for domain based attributes
   * @param input
   */
  isUserInputEmpty(input: string): boolean {
    return input !== undefined && (!input.trim() || 0 === input.length);
  }
}
