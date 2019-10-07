import { OccConfig } from '../../occ/config/occ-config';

export abstract class AnonymousConsentsConfig extends OccConfig {
  anonymousConsents?: {
    footerLink?: boolean;
    showLegalDescriptionInDialog?: boolean;
  };
}
