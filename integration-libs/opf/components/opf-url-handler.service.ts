import { Injectable } from '@angular/core';
import { Params, UrlSegment } from '@angular/router';
import { WindowRef } from '@spartacus/core';
import { KeyValuePair } from '../root/model';

@Injectable({
  providedIn: 'root',
})
export class OpfUrlHandlerService {
  constructor(protected winRef: WindowRef) {}

  convertParamsToKeyValuePairs(params: Params): KeyValuePair[] {
    if (!params) return [];
    return Object.entries(params).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
  }

  getFullUrl(): string {
    return (
      this.winRef.document.location.origin +
      this.winRef.document.location.pathname
    );
  }

  FindFromKeyValuePairs(key: string, list: KeyValuePair[]): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }

  isIncludedInPath(segments: UrlSegment[], targetPath: string): boolean {
    return segments?.join('/').includes(targetPath);
  }

  getDomainUrl() {
    return this.winRef.document.location.origin;
  }
}
