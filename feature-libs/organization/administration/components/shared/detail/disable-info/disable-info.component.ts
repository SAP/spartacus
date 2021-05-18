import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';
import { DisableInfoService } from './disable-info.service';

@Component({
  selector: 'cx-org-disable-info',
  templateUrl: './disable-info.component.html',
  host: { class: 'content-wrapper' },
})
export class DisableInfoComponent<T extends BaseItem> implements OnInit {
  /**
   * The localization of messages is based on the i18n root. Messages are
   * concatenated to the root, such as:
   *
   * `[i18nRoot].info.disabledEdit`
   */
  @Input() i18nRoot: string;

  /**
   * To configure the messages to display and override defaultMessageConfig
   */
  @Input() displayInfoConfig: {
    disabledCreate?: boolean;
    disabledEdit?: boolean;
    disabledEnable?: boolean;
    disabledDisable?: boolean;
  };

  /**
   * Flag to enable display custom message(s) even if no condition has been met
   */
  @Input() displayCustomInfo = false;

  /**
   * resolves the current item.
   */
  current$: Observable<T> = this.itemService.current$;

  iconTypes = ICON_TYPE;

  constructor(
    protected itemService: ItemService<T>,
    protected disableInfoService: DisableInfoService<T>
  ) {}

  protected get defaultInfoConfig() {
    return {
      disabledCreate: false,
      disabledEdit: true,
      disabledEnable: true,
      disabledDisable: false,
    };
  }

  ngOnInit() {
    this.displayInfoConfig = {
      ...this.defaultInfoConfig,
      ...this.displayInfoConfig,
    };
  }

  displayDisabledCreate(item: T) {
    return (
      this.displayInfoConfig?.disabledCreate &&
      this.disableInfoService.isItemDisabled(item)
    );
  }

  displayDisabledEdit(item: T) {
    return (
      this.displayInfoConfig?.disabledEdit &&
      this.disableInfoService.isItemDisabled(item)
    );
  }

  displayDisabledEnable(item: T) {
    return (
      this.displayInfoConfig?.disabledEnable &&
      this.disableInfoService.isParentDisabled(item)
    );
  }

  displayDisabledDisable(item: T) {
    return (
      this.displayInfoConfig?.disabledDisable &&
      this.disableInfoService.isRootUnit(item)
    );
  }
}
