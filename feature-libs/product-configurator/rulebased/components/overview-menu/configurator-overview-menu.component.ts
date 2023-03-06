/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
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
export class ConfiguratorOverviewMenuComponent implements AfterViewInit {
  @HostBinding('style.height') height = this.getHeight();

  @Input() config: Configurator.ConfigurationWithOverview;

  protected readonly CX_CONFIGURATOR_OVERVIEW_MENU =
    'cx-configurator-overview-menu';
  protected readonly CX_MENU_ITEM_BUTTONS = 'button.cx-menu-item';
  protected readonly CX_GROUPS = 'div.cx-group';
  protected readonly CX_MENU_GROUP = 'cx-menu-group';
  protected readonly OV_MENU_ITEM = '-ovMenuItem';
  protected readonly OV_GROUP = '-ovGroup';
  protected readonly ACTIVE_CLASS = 'active';
  /**
   * Height of a CSS box model of a menu item
   * See _configurator-overview-menu.scss
   */
  protected readonly MENU_ITEM_HEIGHT = 39.5;

  iconTypes = ICON_TYPE;
  menuItem: HTMLElement | undefined;

  constructor(
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  ngAfterViewInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.menuItem = this.getMenuItemToHighlight();
    this.highlight(this.menuItem);
    this.height = this.getHeight();
    this.ensureElementVisible(this.menuItem);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = this.getHeight();
    this.ensureElementVisible(this.menuItem);
  }

  /**
   * Retrieves the height of the menu in pixels.
   *
   * If the menu items are rendered, it will be checked whether
   * the height of all menu items equals zero or is larger than the actual height of the spare viewport.
   * If it is a case then the actual height of the spare viewport will be returned, otherwise no height will be returned.
   *
   * @returns {string} - Menu height in pixels
   * @protected
   */
  protected getHeight(): string {
    const menuItems = this.configuratorStorefrontUtilsService.getElements(
      this.CX_MENU_ITEM_BUTTONS
    );
    const menuItemsHeight =
      menuItems && menuItems.length >= 1
        ? menuItems.length * this.MENU_ITEM_HEIGHT
        : 0;
    const spareViewportHeight =
      this.configuratorStorefrontUtilsService.getSpareViewportHeight();
    if (menuItemsHeight === 0 || menuItemsHeight > spareViewportHeight) {
      return spareViewportHeight + 'px';
    }
    return '';
  }

  protected getMenuItemToHighlight(): HTMLElement | undefined {
    let menuItem: HTMLElement | undefined;
    const groups = this.configuratorStorefrontUtilsService.getElements(
      this.CX_GROUPS
    );
    const verticallyScrolledPixels =
      this.configuratorStorefrontUtilsService.getVerticallyScrolledPixels();

    groups?.forEach((group) => {
      if (
        verticallyScrolledPixels &&
        verticallyScrolledPixels >= group.offsetTop
      ) {
        const id = group.id.replace(this.OV_GROUP, this.OV_MENU_ITEM);
        if (id) {
          const querySelector = '#' + id;
          menuItem =
            this.configuratorStorefrontUtilsService.getElement(querySelector);
        }
      }
    });
    return menuItem;
  }

  protected highlight(elementToHighlight: HTMLElement | undefined): void {
    if (elementToHighlight) {
      const menuItems = this.configuratorStorefrontUtilsService.getElements(
        this.CX_MENU_ITEM_BUTTONS
      );
      menuItems?.forEach((menuItem) => {
        menuItem.classList.remove(this.ACTIVE_CLASS);
        if (menuItem.id === elementToHighlight.id) {
          elementToHighlight.classList.add(this.ACTIVE_CLASS);
        }
      });
    }
  }

  protected ensureElementVisible(element: HTMLElement | undefined): void {
    if (
      element &&
      this.configuratorStorefrontUtilsService.hasScrollbar(
        this.CX_CONFIGURATOR_OVERVIEW_MENU
      )
    ) {
      this.configuratorStorefrontUtilsService.ensureElementVisible(
        this.CX_CONFIGURATOR_OVERVIEW_MENU,
        element
      );
    }
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
   * Retrieves a unique prefix ID.
   *
   * @param {string | undefined} prefix - prefix that we need to make the ID unique
   * @param {string} groupId - group ID
   * @returns {string} - prefix ID
   */
  getPrefixId(idPrefix: string | undefined, groupId: string): string {
    return this.configuratorStorefrontUtilsService.getPrefixId(
      idPrefix,
      groupId
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
