export interface UIImages {
  [imageType: string]: UIImage | UIImage[];
}

export interface Image {
  altText?: string;
  format?: string;
  galleryIndex?: number;
  imageType?: ImageType;
  url?: string;
}

export enum ImageType {
  PRIMARY = 'PRIMARY',
  GALLERY = 'GALLERY',
}

export interface UIImage {
  [format: string]: Image;
}
