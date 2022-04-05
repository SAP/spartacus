import { Injectable } from '@angular/core';
import {
  HTTP_PROTOCOL_REGEX,
  MAILTO_PROTOCOL_REGEX,
  TEL_PROTOCOL_REGEX,
} from './generic-link.models';

@Injectable({
  providedIn: 'root',
})
export class GenericLinkService {
  /**
   * Returns true when the given `url` is a string starting with `http://`, `https://`, `mailto:`, `tel:`.
   */
  isExternalUrl(url: string | any[]): boolean {
    return (
      typeof url === 'string' && 
      (
        HTTP_PROTOCOL_REGEX.test(url) ||
        MAILTO_PROTOCOL_REGEX.test(url) ||
        TEL_PROTOCOL_REGEX.test(url)
      )
    );
  }
}
