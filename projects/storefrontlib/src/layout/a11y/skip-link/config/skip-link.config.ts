import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class SkipLinkConfig {
  skipLinks?: SkipLink[];
}

export abstract class SkipLink {
  key: string;
  i18nKey: string;
  target?: HTMLElement;
  position?: SkipLinkScrollPosition;
}

export enum SkipLinkScrollPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

declare module '@spartacus/core' {
  interface Config extends SkipLinkConfig {}
}
