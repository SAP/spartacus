/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Provider } from '@angular/core';
import {
  CmsBannerComponent,
  CmsBannerComponentMedia,
  CmsResponsiveBannerComponentMedia,
  CmsStructureModel,
  Occ,
  OccCmsPageNormalizer,
} from '@spartacus/core';

/**
 * Extracts image dimensions from banner media URLs based on the filename convention
 * used in Spartacus sample data (e.g. `somename-800x600-somename...`), and populates
 * the `width`/`height` properties on each media object. This allows `<cx-media>` to
 * emit `<img width="..." height="...">` attributes, letting the browser reserve the
 * correct space before the image loads — improving the CLS metric.
 *
 * This is a workaround: ideally dimensions would be returned by the CMS backend.
 */
@Injectable({ providedIn: 'root' })
export class CustomOccCmsPageNormalizer extends OccCmsPageNormalizer {
  override convert(
    source: Occ.CMSPage,
    target: CmsStructureModel = {}
  ): CmsStructureModel {
    let result = super.convert(source, target);
    result = this.populateBannerImagesDimensions(result);
    return result;
  }

  protected populateBannerImagesDimensions(
    result: CmsStructureModel
  ): CmsStructureModel {
    if (!result.components) {
      return result;
    }

    (result.components || []).forEach((component) => {
      if (
        !component.typeCode ||
        !['SimpleResponsiveBannerComponent', 'SimpleBannerComponent'].includes(
          component.typeCode
        )
      ) {
        return;
      }

      const copyDimensionsFromUrlToSeparateProperties = (
        media: CmsBannerComponentMedia
      ) => {
        if (media?.url) {
          const dimensions = this.extractDimensionsFromUrl(media.url);
          if (dimensions.width) {
            (media as any).width = dimensions.width;
          }
          if (dimensions.height) {
            (media as any).height = dimensions.height;
          }
        }
      };

      const bannerComponent = component as CmsBannerComponent;

      if (!bannerComponent.media) {
        return;
      }
      if (bannerComponent.typeCode === 'SimpleBannerComponent') {
        copyDimensionsFromUrlToSeparateProperties(
          bannerComponent.media as CmsBannerComponentMedia
        );
      }
      if (bannerComponent.typeCode === 'SimpleResponsiveBannerComponent') {
        Object.values(
          bannerComponent.media as CmsResponsiveBannerComponentMedia
        ).forEach((media) => {
          copyDimensionsFromUrlToSeparateProperties(media);
        });
      }
    });

    return result;
  }

  /**
   * Parses dimensions from the `/medias/<name>-WIDTHxHEIGHT-<name>` URL pattern
   * present in Spartacus sample data.
   */
  protected extractDimensionsFromUrl(url: string): {
    width?: number;
    height?: number;
  } {
    const pattern = /\/medias\/[^-]+-(\d+)x(\d+)-[^-]+/;
    const match = url.match(pattern);
    if (match) {
      return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
    }
    return {};
  }
}

export const workaroundExtractBannerDimensionsFromUrl: Provider = {
  provide: OccCmsPageNormalizer,
  useExisting: CustomOccCmsPageNormalizer,
};
