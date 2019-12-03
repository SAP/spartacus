export abstract class SkipLinkConfig {
  skipLinks?: SkipLink[];
}

export abstract class SkipLink {
  key: string;
  i18nKey: string;
  position?: SkipLinkScrollPosition;
}

export enum SkipLinkScrollPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}
