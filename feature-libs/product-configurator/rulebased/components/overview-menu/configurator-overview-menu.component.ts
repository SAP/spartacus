/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
        entry.target.getBoundingClientRect().top <= 25
      );
    };
    const groups =
      this.configuratorStorefrontUtilsService.getElements('div.cx-group');
    if (groups) {
      for (let index = 0; index < groups.length; index++) {
        this.intersectionService
          .isIntersecting(groups[index], options, intersectingCondition)
          .subscribe((isIntersecting) => {
            const id = groups[index]?.id.replace('-ovGroup', '-ovMenuItem');
            if (id) {
              const querySelector = '#' + id;
              let groupItem =
                this.configuratorStorefrontUtilsService.getElement(
                  querySelector
                );
              if (isIntersecting) {
                this.makeAllMenuItemsActive(groupItem);
              } else {
                groupItem?.classList.remove('active');
              }
            }
          });
      }
    }
  }

  protected collectAllMenuItems(element: HTMLElement | undefined): Element[] {
    let menuItems: Element[] = [];
    if (element) {
      while (element?.parentElement?.classList?.contains('cx-menu-group')) {
        const child = element?.parentElement?.querySelector('.cx-menu-item');
        if (child) {
          if (menuItems.indexOf(child) === -1) {
            menuItems.unshift(child);
          }
        }
        element = element?.parentElement;
      }
    }
    return menuItems;
  }

  protected makeAllMenuItemsActive(element: HTMLElement | undefined) {
    if (element) {
      this.collectAllMenuItems(element).forEach((node) => {
        if (!node?.classList.contains('active')) {
          node?.classList.add('active');
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
    return 'cx-menu-group' + ' groupLevel' + level;
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
    return this.configuratorStorefrontUtilsService
      ? this.configuratorStorefrontUtilsService.createOvGroupId(
          idPrefix,
          groupId
        )
      : idPrefix
      ? idPrefix + '--' + groupId + '-ovGroup'
      : groupId + '-ovGroup';
  }

  /**
   * Retrieves the ids for the overview menu group items
   *
   * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
   * @param {string} groupId - local group id
   * @return {string} - unique group id
   */
  getMenuItemId(idPrefix: string, groupId: string): string {
    return this.configuratorStorefrontUtilsService
      ? this.configuratorStorefrontUtilsService.createOvMenuItemId(
          idPrefix,
          groupId
        )
      : idPrefix
      ? idPrefix + '--' + groupId + '-ovMenuItem'
      : groupId + '-ovMenuItem';
  }
}
