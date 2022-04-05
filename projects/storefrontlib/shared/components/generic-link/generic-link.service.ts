import { Injectable } from '@angular/core';
import { GenericLinkConfig } from './generic-link.config';

@Injectable({
  providedIn: 'root',
})
export class GenericLinkService {
  constructor(protected config: GenericLinkConfig) {}

  isExternalLink(url: string | any[]): boolean {
    console.log(
      url,
      this.config.genericLinks?.externalLinkRegexes,
      typeof url === 'string' &&
        !!this.config.genericLinks?.externalLinkRegexes?.filter(
          (regex: RegExp) => regex.test(url)
        )?.length
    );
    return (
      typeof url === 'string' &&
      !!this.config.genericLinks?.externalLinkRegexes?.filter((regex: RegExp) =>
        regex.test(url)
      )?.length
    );
  }
}
