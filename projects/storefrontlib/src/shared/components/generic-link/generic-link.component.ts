import { Component, Input } from '@angular/core';

/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
@Component({
  selector: 'cx-generic-link',
  templateUrl: './generic-link.component.html',
})
export class GenericLinkComponent {
  private readonly protocolRegex: RegExp = /^https?:\/\//i;

  @Input() url: string | any[];
  @Input() target: string;
  @Input() class: string;
  @Input() id: string;
  @Input() style: string;
  @Input() title: string;

  get rel() {
    return this.target === '_blank' ? 'noopener' : null;
  }

  get routerUrl(): any[] {
    if (typeof this.url === 'string') {
      return [this.getAbsoluteUrl(this.url)];
    }
    return this.url;
  }

  isExternalUrl(): boolean {
    return typeof this.url === 'string' && this.protocolRegex.test(this.url);
  }

  private getAbsoluteUrl(url: string) {
    return url.startsWith('/') ? this.url : '/' + this.url;
  }
}
