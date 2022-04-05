import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericLinkComponentService {
  /**
   * Pattern matching string starting with `http://` or `https://`.
   */
  protected HTTP_PROTOCOL_REGEX: RegExp = /^https?:\/\//i;

  /**
   * Pattern matching string starting with `mailto:`.
   */
  protected MAILTO_PROTOCOL_REGEX: RegExp = /^mailto:/i;

  /**
   * Pattern matching string starting with `tel:`.
   */
  protected TEL_PROTOCOL_REGEX: RegExp = /^tel:/i;

  /**
   * Returns true when the @Input `url` is a string starting with `http://`, `https://`, `mailto:`, `tel:`.
   */
  isExternalUrl(url: string | any[]): boolean {
    return (
      typeof url === 'string' &&
      (this.HTTP_PROTOCOL_REGEX.test(url) ||
        this.MAILTO_PROTOCOL_REGEX.test(url) ||
        this.TEL_PROTOCOL_REGEX.test(url))
    );
  }
}
