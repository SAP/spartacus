import { Image } from '@spartacus/core';

export interface Media {
  src: string;
  srcset?: string;
  alt?: string;
}

export interface MediaFormats {
  code: string;
  threshold: number;
}

export interface MediaContainer {
  [format: string]: Image;
}
