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
