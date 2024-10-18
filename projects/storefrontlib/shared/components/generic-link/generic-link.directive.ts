/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { GenericLinkComponentService } from './generic-link-component.service';
import { RoutingService } from '@spartacus/core';

@Directive({
  selector: '[cxGenericLink]',
})
export class GenericLinkDirective implements OnChanges {
  @Input() href: string | any[];

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.href) {
      const target = event.target as HTMLElement;
      const linkTarget = target.getAttribute('target');
      if (!this.isExternalUrl() && linkTarget !== '_blank') {
        event.preventDefault();
        const url: string =
          typeof this.href === 'string'
            ? this.href
            : this.router.createUrlTree([this.href]).toString();
        this.router.navigateByUrl(url);
      }
    }
  }

  constructor(
    protected el: ElementRef,
    protected router: Router,
    protected service: GenericLinkComponentService,
    protected routingService: RoutingService
  ) {}

  ngOnChanges(changes?: SimpleChanges) {
    if (changes?.href) {
      this.updateHref();
    }
  }

  protected isExternalUrl(): boolean {
    return this.service.isExternalUrl(this.href);
  }

  protected updateHref(): void {
    if (this.href) {
      if (this.isExternalUrl()) {
        this.el.nativeElement.setAttribute('href', this.href);
      } else {
        // should we use this.routingService.getFullUrl(this.url);
        const newUrl = this.routingService.getUrl(this.href);
        this.el.nativeElement.setAttribute('href', newUrl);
      }
    }
  }
}
