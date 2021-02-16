import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';
import { B2BUnit } from '@spartacus/core';

@Component({
  selector: 'cx-explain-disable-messages',
  templateUrl: './explain-disable-messages.component.html',
  host: { class: 'content-wrapper' },
})
export class ExplainDisableMessagesComponent<T extends BaseItem>
  implements OnInit {
  /**
   * The localization of messages is based on the i18n root. Messages are
   * concatenated to the root, such as:
   *
   * `[i18nRoot].messages.disabledEdit`
   */
  @Input() i18nRoot: string;

  /**
   * To configure the messages to display and override defaultMessageConfig
   */
  @Input() displayMessageConfig: {
    disabledCreate?: boolean;
    disabledEdit?: boolean;
    disabledEnable?: boolean;
    disabledDisable?: boolean;
  };

  /**
   * Flag to enable display custom message(s) even if no condition has been met
   */
  @Input() forceDisplay = false;

  /**
   * resolves the current item.
   */
  current$: Observable<T> = this.itemService.current$;

  constructor(protected itemService: ItemService<T>) {}
  iconTypes = ICON_TYPE;

  ngOnInit() {
    this.displayMessageConfig = {
      ...this.defaultMessageConfig,
      ...this.displayMessageConfig,
    };
  }

  isItemDisabled(item: T): boolean {
    return !item?.active;
  }

  isParentDisabled(item: T): boolean {
    return (
      this.displayMessageConfig.disabledEnable &&
      !(item.orgUnit || (item as any).unit || (item as any).parentOrgUnit)
        ?.active &&
      !this.isRootUnit(item)
    );
  }

  isRootUnit(item: B2BUnit): boolean {
    return (
      this.displayMessageConfig.disabledDisable &&
      item?.uid &&
      item?.name &&
      !(item as any)?.orgUnit &&
      !(item as any)?.unit &&
      (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit)
    );
  }

  protected get defaultMessageConfig() {
    return {
      disabledCreate: false,
      disabledEdit: true,
      disabledEnable: true,
      disabledDisable: true,
    };
  }
}
