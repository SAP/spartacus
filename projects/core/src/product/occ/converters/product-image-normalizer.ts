import { Injectable } from '@angular/core';

import { OccConfig } from '../../../occ';
import { Product } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

@Injectable({
  providedIn: 'root',
})
export class ProductImageNormalizer implements Converter<Product, Product> {
  constructor(protected config: OccConfig) {}

  convert(source: Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...source };
    }
    if (source.images) {
      target.images = this.normalize(source.images);
    }
    return target;
  }

  convertList(list: Array<Product>): void {
    if (!list) {
      return;
    }
    for (const product of list) {
      this.convertProduct(product);
    }
  }

  convertProduct(product: Product): void {
    if (product.images) {
      product.images = this.normalize(product.images);
    }
  }

  /**
   * @desc
   * Creates the image structure we'd like to have. Instead of
   * having a single list with all images despite type and format
   * we create a proper structure. With that we can do:
   * - images.primary.thumnail.url
   * - images.GALLERY[0].thumnail.url
   */
  normalize(source: Array<any>): any {
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
        image.url = (this.config.backend.occ.baseUrl || '') + image.url;

        imageContainer[image.format] = image;
      }
    }
    return images;
  }
}
