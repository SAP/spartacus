import { LayoutConfig } from '../../layout/config/layout-config';

export const b2cLayoutConfig: LayoutConfig = {
  // deferredLoading: {
  //   strategy: DeferLoadingStrategy.DEFER,
  //   intersectionMargin: '50px',
  // },
  layoutSlots: {
    header: {
      lg: {
        slots: [
          'SiteContext',
          'SiteLinks',
          'SiteLogo',
          'SearchBox',
          'SiteLogin',
          'MiniCart',
          'NavigationBar',
        ],
      },
      slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
    },
    navigation: {
      lg: { slots: [] },
      slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
    },
    footer: {
      slots: ['Footer'],
    },
    LandingPage2Template: {
      pageFold: 'Section2B',
      slots: [
        'Section1',
        'Section2A',
        'Section2B',
        'Section2C',
        'Section3',
        'Section4',
        'Section5',
      ],
    },

    ContentPage1Template: {
      slots: ['Section2A', 'Section2B'],
    },
    CategoryPageTemplate: {
      pageFold: 'Section2',
      slots: ['Section1', 'Section2', 'Section3'],
    },
    ProductListPageTemplate: {
      slots: ['ProductLeftRefinements', 'ProductListSlot'],
    },
    ProductGridPageTemplate: {
      slots: ['ProductLeftRefinements', 'ProductGridSlot'],
    },
    SearchResultsListPageTemplate: {
      slots: [
        'Section2',
        'ProductLeftRefinements',
        'SearchResultsListSlot',
        'Section4',
      ],
    },
    SearchResultsGridPageTemplate: {
      slots: [
        'Section2',
        'ProductLeftRefinements',
        'SearchResultsGridSlot',
        'Section4',
      ],
    },
    ProductDetailsPageTemplate: {
      lg: {
        pageFold: 'UpSelling',
      },

      pageFold: 'Summary',

      slots: [
        'Summary',
        'UpSelling',
        'CrossSelling',
        'Tabs',
        'PlaceholderContentSlot',
      ],
    },
    CartPageTemplate: {
      slots: ['TopContent', 'CenterRightContentSlot', 'EmptyCartMiddleContent'],
    },
    AccountPageTemplate: {
      slots: ['BodyContent', 'SideContent'],
    },
    LoginPageTemplate: {
      slots: ['LeftContentSlot', 'RightContentSlot'],
    },
    ErrorPageTemplate: {
      slots: ['TopContent', 'MiddleContent', 'BottomContent'],
    },
    OrderConfirmationPageTemplate: {
      slots: ['BodyContent', 'SideContent'],
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['TopContent', 'BodyContent', 'SideContent', 'BottomContent'],
    },
    CheckoutLoginPageTemplate: {
      slots: ['RightContentSlot'],
    },
  },

  // // consider moving to new MediaConfig
  // mediaFormats: [
  //   // banner formats

  //   {
  //     code: 'mobile',
  //     threshold: 480,
  //   },
  //   {
  //     code: 'tablet',
  //     threshold: 770,
  //   },
  //   {
  //     code: 'desktop',
  //     threshold: 1140,
  //   },
  //   {
  //     code: 'widescreen',
  //     threshold: 1400,
  //   },
  //   // product related media

  //   {
  //     code: 'cartIcon',
  //     threshold: 65,
  //   },
  //   {
  //     code: 'thumbnail',
  //     threshold: 96,
  //   },
  //   {
  //     code: 'product',
  //     threshold: 284,
  //   },
  //   {
  //     code: 'zoom',
  //     threshold: 515,
  //   },
  // ],
};
