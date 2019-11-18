export abstract class SkipLinkConfig {
  skipLinks?: SkipLink[];
}

export abstract class SkipLink {
  /** represents the i18n key */
  i18nKey: string;
  slot?: string;
  position?: SkipLinkScrollPosition;
  excludeOnTemplate?: string[];
}

export enum SkipLinkScrollPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}
