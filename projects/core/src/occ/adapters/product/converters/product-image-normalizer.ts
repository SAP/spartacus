/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ImageGroup, Images } from '../../../../model/image.model';
import { Product } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class ProductImageNormalizer implements Converter<Occ.Product, Product> {
  constructor(protected config: OccConfig) {}

  convert(source: Occ.Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) } as Product;
    }
    if (source.images) {
      target.images = this.normalize(source.images);
    }
    return target;
  }

  /**
   * @desc
   * Creates the image structure we'd like to have. Instead of
   * having a single list with all images despite type and format
   * we create a proper structure. With that we can do:
   * - images.primary.thumnail.url
   * - images.GALLERY[0].thumnail.url
   */
  normalize(source: Occ.Image[]): Images {
    const images: Images = {};
    if (source) {
      for (const image of source) {
        const isList = image.hasOwnProperty('galleryIndex');
        if (image.imageType) {
          if (!images.hasOwnProperty(image.imageType)) {
            images[image.imageType] = isList ? [] : {};
          }

          let imageContainer: ImageGroup;
          if (isList) {
            const imageGroups = images[image.imageType] as ImageGroup[];
            if (!imageGroups[image.galleryIndex as number]) {
              imageGroups[image.galleryIndex as number] = {};
            }
            imageContainer = imageGroups[image.galleryIndex as number];
          } else {
            imageContainer = images[image.imageType] as ImageGroup;
          }

          const targetImage = { ...image };
          targetImage.url = this.normalizeImageUrl(targetImage.url ?? '');
          if (image.format) {
            imageContainer[image.format] = targetImage;
          }
        }
      }
    }
    return images;
  }
  /**
   * Traditionally, in an on-prem world, medias and other backend related calls
   * are hosted at the same platform, but in a cloud setup, applications are are
   * typically distributed cross different environments. For media, we use the
   * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
   * if none provided.
   */
  private normalizeImageUrl(url: string): string {
    if (new RegExp(/^(http|data:image|\/\/)/i).test(url)) {
      return url;
    }
    return (
      (this.config.backend?.media?.baseUrl ||
        this.config.backend?.occ?.baseUrl ||
        '') + url
    );
  }
}
