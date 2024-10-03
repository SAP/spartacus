/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Images {
  [imageType: string]: ImageGroup | ImageGroup[];
}

export interface Image {
  altText?: string;
  role?: string;
  format?: string;
  galleryIndex?: number;
  imageType?: ImageType;
  url?: string;
}

export enum ImageType {
  PRIMARY = 'PRIMARY',
  GALLERY = 'GALLERY',
}

export interface ImageGroup {
  [format: string]: Image;
}
