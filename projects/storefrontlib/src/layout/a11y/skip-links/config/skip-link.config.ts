export abstract class SkipLinkConfig {
  skipLinks?: SkipLink;
}

export abstract class SkipLink {
  [name: string]: {
    i18nKey: string;
    position?: SkipLinkScrollPosition;
  };
}

export enum SkipLinkScrollPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}
