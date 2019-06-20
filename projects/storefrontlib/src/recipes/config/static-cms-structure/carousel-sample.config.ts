import {
  CmsBannerCarouselComponent,
  CmsBannerCarouselEffect,
  CmsBannerComponent,
  CmsPageConfig,
  CmsParagraphComponent,
  CmsStructureConfig,
  ContentSlotComponentData,
} from '@spartacus/core';

export const staticComponents: {
  [key: string]: ContentSlotComponentData | any;
} = {
  zoom: {
    typeCode: 'BannerComponent',
    flexType: 'BannerComponent',
    uid: 'zoom',
    headline: 'Zoom in on the moment',
    media: {
      tablet: {
        url: '/assets/amateur-1239387.jpg',
      },
    },
  } as CmsBannerComponent,

  lens: {
    typeCode: 'BannerComponent',
    flexType: 'BannerComponent',
    uid: 'lens',
    headline: 'Use the right lens for the right moment',
    media: {
      tablet: {
        url: '/assets/lens-3046269.jpg',
      },
    },
  } as CmsBannerComponent,

  photographer: {
    typeCode: 'BannerComponent',
    flexType: 'BannerComponent',
    uid: 'photographer',
    headline:
      'The broadcast selection of products to help you get the perfect shot',
    media: {
      tablet: {
        url: '/assets/photographer-3672010.jpg',
      },
    },
  } as CmsBannerComponent,

  par: {
    typeCode: 'CMSParagraphComponent',
    flexType: 'CMSParagraphComponent',
    uid: 'par',
    title: 'title...',
    content: '<p>test</p>',
  } as CmsParagraphComponent,

  RotatingImagesComponent: {
    typeCode: 'RotatingImagesComponent',
    flexType: 'RotatingImagesComponent',
    uid: 'ElectronicsHomepageCarouselComponent',
    name: 'We can see you feel fancy TODAY!',
    urlLink: '/link',
    banners: 'lens zoom photographer ',
    effects: CmsBannerCarouselEffect.TURN_DOWN,
  } as CmsBannerCarouselComponent,

  rc2: {
    typeCode: 'RotatingImagesComponent',
    flexType: 'RotatingImagesComponent',
    uid: 'rc2',
    name: 'C B A',
    urlLink: '/link',
    banners: 'def abc',
    effects: CmsBannerCarouselEffect.FADE,
  } as CmsBannerCarouselComponent,
};

export const staticPages: CmsPageConfig[] = [
  {
    ignoreBackend: true,
    pageId: '/faq',
    template: 'LandingPage2Template',
    slots: {
      Section1: {
        componentIds: ['RotatingImagesComponent'],
      },
    },
  },
];

export const carouselStaticCmsonfig: CmsStructureConfig = {
  cmsStructure: {
    components: {
      // ...staticComponents,
    },
    slots: {},
    // pages: staticPages,
  },
};
