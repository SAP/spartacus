import { Component, Input } from '@angular/core';

/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
@Component({
  selector: 'cx-generic-link',
  templateUrl: './generic-link.component.html',
  styleUrls: ['./generic-link.component.scss']
})
export class GenericLinkComponent {
  private readonly absoluteUrlRegex: RegExp = /^https?:\/\//i;

  @Input()
  url: string;

  @Input()
  target: string;
  @Input()
  class: string;
  @Input()
  id: string;
  @Input()
  style: string;
  @Input()
  title: string;

  get routerUrl(): string {
    if (this.url !== undefined) {
      return this.url.startsWith('/') ? this.url : '/' + this.url;
    }
    return this.url;
  }

  isAbsoluteUrl(url: string): boolean {
    return this.absoluteUrlRegex.test(url);
  }
}
