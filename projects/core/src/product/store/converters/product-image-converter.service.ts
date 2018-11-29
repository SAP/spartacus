import { Injectable } from '@angular/core';
import { OccConfig } from '../../../occ';

@Injectable()
export class ProductImageConverterService {
  constructor(protected config: OccConfig) {}

  convertList(list: Array<any>) {
    if (!list) {
      return;
    }
    for (const product of list) {
      this.convertProduct(product);
    }
  }

  convertProduct(product) {
    if (product.images) {
      product.images = this.populate(product.images);
    }
  }

  /**
   * @desc
   * Creates the image structue we'd like to have. Instead of
   * having a singel list with all images despite type and format
   * we create a proper structure. With that we can do:
   * - images.primary.thumnail.url
   * - images.GALLERY[0].thumnail.url
   */
  populate(source: Array<any>): any {
    const images = {};
    if (source) {
      for (const image of source) {
        const isList = image.hasOwnProperty('galleryIndex');
        if (!images.hasOwnProperty(image.imageType)) {
          images[image.imageType] = isList ? [] : {};
        }

        let imageContainer;
        if (isList && !images[image.imageType][image.galleryIndex]) {
          images[image.imageType][image.galleryIndex] = {};
        }

        if (isList) {
          imageContainer = images[image.imageType][image.galleryIndex];
        } else {
          imageContainer = images[image.imageType];
        }

        // set full image URL path
        image.url = (this.config.server.baseUrl || '') + image.url;

        imageContainer[image.format] = image;
      }
    }
    return images;
  }
}
