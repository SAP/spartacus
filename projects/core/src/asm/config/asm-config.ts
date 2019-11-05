import { OccConfig } from '../../occ/config/occ-config';

export abstract class AsmConfig extends OccConfig {
  asm?: {
    customeSearch?: {
      maxResults?: number;
    };
  };
}
