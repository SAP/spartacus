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
 * This is a workaround to extract dimensions from a URL of a banner image, based on a filenames convention in our sample data
 * (yes it's a workaround! ideally dimensions should be defined in CMS!)
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

    // Iterate through all components
    (result.components || []).forEach((component) => {
      // ignore components that are not banners
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
          // Add dimensions to media object if found
          if (dimensions.width) {
            (media as any).width = dimensions.width; // although width is not defined in CMS, we add it here
          }
          if (dimensions.height) {
            (media as any).height = dimensions.height; // although height is not defined in CMS, we add it here
          }
        }
      };

      const bannerComponent = component as CmsBannerComponent;
      // Note: - SimpleBannerComponent has "media" property with a single image
      //       - SimpleResponsiveBannerComponent has "media" property with a object containing images
      //          for different media formats (in separate properties)

      if (!bannerComponent.media) {
        return;
      }
      if (bannerComponent.typeCode === 'SimpleBannerComponent') {
        copyDimensionsFromUrlToSeparateProperties(
          bannerComponent.media as CmsBannerComponentMedia
        );
      }
      if (bannerComponent.typeCode === 'SimpleResponsiveBannerComponent') {
        // Process each media format (mobile, tablet, desktop, widescreen)
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
   * Extracts dimensions from a URL of a banner image, based on a filenames convention in our sample data
   * (yes it's a workaround! ideally dimensions should be defined in CMS!)
   */
  protected extractDimensionsFromUrl(url: string): {
    width?: number;
    height?: number;
  } {
    // Banner images in our sample data happen to follow the pattern `somename-WIDTHxHEIGHT-somename...`
    // so we can leverage it to extract the dimensions
    const pattern = /\/medias\/[^-]+-(\d+)x(\d+)-[^-]+/;
    const match = url.match(pattern);
    if (match) {
      const width = parseInt(match[1], 10);
      const height = parseInt(match[2], 10);
      return { width, height };
    } else {
      return {};
    }
  }
}

export const workaroundExtractBannerDimensionsFromUrl: Provider = {
  provide: OccCmsPageNormalizer,
  useExisting: CustomOccCmsPageNormalizer,
};
