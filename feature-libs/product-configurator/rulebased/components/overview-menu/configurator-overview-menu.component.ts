/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import {
  ICON_TYPE,
  IntersectionOptions,
  IntersectionService,
} from '@spartacus/storefront';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-menu',
  templateUrl: './configurator-overview-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewMenuComponent {
  @Input() config: Configurator.ConfigurationWithOverview;

  protected readonly CX_MENU_GROUP = 'cx-menu-group';
  protected readonly OV_MENU_ITEM = '-ovMenuItem';
  protected readonly OV_GROUP = '-ovGroup';
  protected readonly ACTIVE_CLASS = 'active';
  protected readonly TOP = 25;

  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
    protected intersectionService: IntersectionService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const options: IntersectionOptions = { rootMargin: '0px 0px -500px 0px' };
    const intersectingCondition = (entry: IntersectionObserverEntry) => {
      return (
        entry.intersectionRatio > 0 &&
        entry.target.getBoundingClientRect().top <= this.TOP
      );
    };
    const groups =
      this.configuratorStorefrontUtilsService.getElements('div.cx-group');
    groups?.forEach((group) => {
      this.intersectionService
        .isIntersecting(group, options, intersectingCondition)
        .subscribe((isIntersecting) => {
          const id = group?.id.replace(this.OV_GROUP, this.OV_MENU_ITEM);
          if (id) {
            const querySelector = '#' + id;
            const groupItem =
              this.configuratorStorefrontUtilsService.getElement(querySelector);
            if (isIntersecting) {
              this.makeMenuItemsActive(groupItem);
            } else {
              groupItem?.classList.remove(this.ACTIVE_CLASS);
            }
          }
        });
    });
  }

  protected addMenuItem(
    menuItems: Element[],
    parent: HTMLElement | undefined
  ): void {
    const child = parent?.querySelector('.cx-menu-item');
    if (child && menuItems.indexOf(child) === -1) {
      menuItems.push(child);
    }
  }

  protected collectMenuItems(element: HTMLElement | undefined): Element[] {
    const menuItems: Element[] = [];
    while (element) {
      if (element?.parentElement?.classList?.contains(this.CX_MENU_GROUP)) {
        this.addMenuItem(menuItems, element?.parentElement);
        element = element?.parentElement;
      } else if (
        element?.parentElement?.parentElement?.classList?.contains(
          this.CX_MENU_GROUP
        )
      ) {
        this.addMenuItem(menuItems, element?.parentElement?.parentElement);
        element = element?.parentElement?.parentElement;
      } else {
        element = undefined;
      }
    }
    return menuItems;
  }

  protected makeMenuItemsActive(element: HTMLElement | undefined) {
    if (element) {
      this.collectMenuItems(element).forEach((node) => {
        if (!node?.classList.contains(this.ACTIVE_CLASS)) {
          node?.classList.add(this.ACTIVE_CLASS);
        }
      });
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

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
