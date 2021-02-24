import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';
import { B2BUnit } from '@spartacus/core';

@Component({
  selector: 'cx-org-explain-disable-info',
  templateUrl: './explain-disable-info.component.html',
  host: { class: 'content-wrapper' },
})
export class ExplainDisableInfoComponent<T extends BaseItem> implements OnInit {
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

  displayDisabledCreate(item: T) {
    return (
      this.displayMessageConfig?.disabledCreate && this.isItemDisabled(item)
    );
  }

  displayDisabledEdit(item: T) {
    return this.displayMessageConfig?.disabledEdit && this.isItemDisabled(item);
  }

  displayDisabledEnable(item: T) {
    return (
      this.displayMessageConfig?.disabledEnable && this.isParentDisabled(item)
    );
  }

  displayDisabledDisable(item: T) {
    return this.displayMessageConfig?.disabledDisable && this.isRootUnit(item);
  }

  protected isItemDisabled(item: T): boolean {
    return !item?.active;
  }

  protected isParentDisabled(item: T): boolean {
    return (
      !(item.orgUnit || (item as any).unit || (item as any).parentOrgUnit)
        ?.active && !this.isRootUnit(item)
    );
  }

  protected isRootUnit(item: B2BUnit): boolean {
    return (
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
