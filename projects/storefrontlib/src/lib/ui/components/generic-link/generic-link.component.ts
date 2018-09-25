import { Component, Input } from '@angular/core';

/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
@Component({
  selector: 'y-generic-link',
  templateUrl: './generic-link.component.html',
  styleUrls: ['./generic-link.component.scss']
})
export class GenericLinkComponent {
  static readonly isAbsoluteUrlRegex: RegExp = /^https?:\/\//i;

  @Input() url;

  @Input() target;
  @Input() class;
  @Input() id;
  @Input() style;
  @Input() title;

  getUrlWithLeadingSlash(url: string): string {
    if (url !== undefined) {
      return url.startsWith('/') ? url : '/' + url;
    }
    return url;
  }

  isAbsoluteUrl(url: string): boolean {
    return GenericLinkComponent.isAbsoluteUrlRegex.test(url);
  }
}
