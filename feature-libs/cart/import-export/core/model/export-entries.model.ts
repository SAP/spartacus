import { Translatable } from '@spartacus/core';

export interface ExportColumn {
  name: Translatable;
  value: string;
}

export interface ExportConfig {
  additionalColumns?: ExportColumn[];
  messageEnabled?: boolean;
  messageTimeout?: number;
  downloadDelay?: number;
  fileName?: string;
}
