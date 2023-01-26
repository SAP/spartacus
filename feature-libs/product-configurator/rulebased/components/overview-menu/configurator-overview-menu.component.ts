/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-menu',
  templateUrl: './configurator-overview-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewMenuComponent {
  @HostBinding('style.height') height = this.getHeight();

  @Input() config: Configurator.ConfigurationWithOverview;

  protected readonly CX_MENU_GROUP = 'cx-menu-group';
  protected readonly OV_MENU_ITEM = '-ovMenuItem';
  protected readonly OV_GROUP = '-ovGroup';
  protected readonly ACTIVE_CLASS = 'active';

  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.highlightMenuItem();
    this.syncScroll();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = this.getHeight();
  }

  protected highlightMenuItem(): void {
    this.highlight(this.getMenuItemToHighlight());
  }

  protected getMenuItemToHighlight(): HTMLElement | undefined {
    let menuItem: HTMLElement | undefined;
    const groups =
      this.configuratorStorefrontUtilsService.getElements('div.cx-group');
    groups?.forEach((group) => {
      const groupTop = group.offsetTop;
      if (scrollY >= groupTop) {
        const id = group?.id.replace(this.OV_GROUP, this.OV_MENU_ITEM);
        if (id) {
          const querySelector = '#' + id;
          menuItem =
            this.configuratorStorefrontUtilsService.getElement(querySelector);
        }
      }
    });
    return menuItem;
  }

  protected highlight(menuItemToHighlight: HTMLElement | undefined) {
    if (menuItemToHighlight) {
      const menuItems = this.configuratorStorefrontUtilsService.getElements(
        'button.cx-menu-item'
      );
      menuItems?.forEach((menuItem) => {
        menuItem.classList.remove(this.ACTIVE_CLASS);
        if (menuItem.id === menuItemToHighlight?.id) {
          menuItemToHighlight.classList.add(this.ACTIVE_CLASS);
        }
      });
    }
  }

  protected syncScroll(): void {
    const ovMenu = this.configuratorStorefrontUtilsService.getElement(
      'cx-configurator-overview-menu'
    );
    this.configuratorStorefrontUtilsService.syncScroll(ovMenu);
  }

  protected getHeight(): string {
    const menu = this.configuratorStorefrontUtilsService.getElement(
      'cx-configurator-overview-menu'
    );

    if (menu) {
      const viewPortHeight =
        this.configuratorStorefrontUtilsService.getViewPortHeight(true);
      if (menu.offsetHeight < viewPortHeight) {
        return '';
      } else {
        return viewPortHeight + 'px';
      }
    }

    return this.configuratorStorefrontUtilsService.getViewPortHeight() + 'px';
  }

  /**
   * Retrieves the styling for the group levels.
   *
   * @param {number} level - Group level. 1 is top level.
   * @return {string} - corresponding style classes
   */
  getGroupLevelStyleClasses(level: number): string {
    return this.CX_MENU_GROUP + ' groupLevel' + level;
  }

  /**
   * Navigates to group in OV form
   *
   * @param {string} prefix - Prefix (reflects the parent groups in the hierarchy)
   * @param {string} id - Group id
   */
  navigateToGroup(prefix: string, id: string): void {
    const ovGroupId = this.configuratorStorefrontUtilsService.createOvGroupId(
      prefix,
      id
    );

    this.configuratorStorefrontUtilsService.scrollToConfigurationElement(
      '#' + ovGroupId + ' h2'
    );
  }

  /**
   * Retrieves the ids for the overview group headers
   *
   * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
   * @param {string} groupId - local group id
   * @return {string} - unique group id
   */
  getGroupId(idPrefix: string, groupId: string): string {
    return this.configuratorStorefrontUtilsService.createOvGroupId(
      idPrefix,
      groupId
    );
  }

  /**
   * Retrieves the ids for the overview menu group items
   *
   * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
   * @param {string} groupId - local group id
   * @return {string} - unique group id
   */
  getMenuItemId(idPrefix: string, groupId: string): string {
    return this.configuratorStorefrontUtilsService.createOvMenuItemId(
      idPrefix,
      groupId
    );
  }
}
