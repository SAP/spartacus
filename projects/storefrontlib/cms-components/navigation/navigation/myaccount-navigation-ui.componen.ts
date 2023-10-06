/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICON_TYPE } from '../../misc/icon/index';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-myaccount-navigation-ui',
  templateUrl: './myaccount-navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyaccountNavigationUIComponent implements OnDestroy {
  /**
   * The navigation node to render.
   */
  @Input() node: NavigationNode | null;

  /**
   * The number of child nodes that must be wrapped.
   */
  @Input() wrapAfter: number;

  /**
   * Flag indicates whether to reset the state of menu navigation (ie. Collapse all submenus) when the menu is closed.
   */
  // @Input() resetMenuOnClose: boolean | undefined;

  @Input() navAriaLabel: string | null | undefined;
  /**
   * the icon type that will be used for navigation nodes
   * with children.
   */
  // iconType = ICON_TYPE;
  iconType = ICON_TYPE;

  /**
   * Indicates whether the navigation should support flyout.
   * If flyout is set to true, the
   * nested child navigation nodes will only appear on hover or focus.
   */
  @Input() @HostBinding('class.flyout') flyout = true;

  // @Input() @HostBinding('class.is-open') isOpen = false;

  // private openNodes: HTMLElement[] = [];
  private subscriptions = new Subscription();
  private resize = new EventEmitter();

  @HostListener('window:resize')
  onResize() {
    this.resize.next(undefined);
  }

  constructor(
  ) {}

  getIcon(title: string): string {
    switch (title) {
      case 'Orders And Returns': {
        return ICON_TYPE.CART;
        break;
      }

      case 'Saved Carts': {
        return ICON_TYPE.CART_PLUS;
        break;
      }

      case 'Wishlists': {
        return ICON_TYPE.STAR;
        break;
      }

      case 'Requests': {
        return ICON_TYPE.HEADSET;
        break;
      }

      case 'Registered Products': {
        return ICON_TYPE.CHECK;
        break;
      }

      case 'Personal Details': {
        return ICON_TYPE.USER;
        break;
      }

      case 'Email': {
        return ICON_TYPE.USER;
        break;
      }

      case 'Password And Security': {
        return ICON_TYPE.PASSWORD;
        break;
      }

      case 'Address Book': {
        return ICON_TYPE.ADDRESS_BOOK;
        break;
      }

      case 'Payment Details': {
        return ICON_TYPE.CREDIT_CARD;
        break;
      }

      case 'Communications': {
        return ICON_TYPE.COMMUNICATIONS;
        break;
      }

      case 'Privacy And Settings': {
        return ICON_TYPE.PRIVACY;
        break;
      }

      default: {
        return '';
      }
    }
  }
  getTotalDepth(node: NavigationNode, depth = 0): number {
    if (node.children && node.children.length > 0) {
      return Math.max(
        ...node.children.map((n) => this.getTotalDepth(n, depth + 1))
      );
    } else {
      return depth;
    }
  }

  getColumnCount(length: number): number {
    return Math.round(length / (this.wrapAfter || length));
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
