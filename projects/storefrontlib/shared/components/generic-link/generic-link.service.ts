import { Injectable } from '@angular/core';
import { GenericLinkConfig } from './generic-link.config';

@Injectable({
  providedIn: 'root',
})
export class GenericLinkService {
  constructor(protected config: GenericLinkConfig) {}

  isExternalUrl(url: string | any[]): boolean {
    return (
      typeof url === 'string' &&
      !!this.config.genericLinks?.externalLinkRegexes?.filter((regex: RegExp) =>
        regex.test(url)
      )?.length
    );
  }
}
