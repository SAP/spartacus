import { LayoutConfig } from '../../layout/config/layout-config';

export const b2bLayoutConfig: LayoutConfig = {
  layoutSlots: {
    header: {
      md: {
        slots: [
          'PreHeader',
          'SiteContext',
          'SiteLinks',
          'SiteLogo',
          'SearchBox',
          'SiteLogin',
          'MiniCart',
          'NavigationBar',
        ],
      },
      xs: {
        slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
      },
    },
    navigation: {
      md: { slots: [] },
      xs: {
        slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
      },
    },
    footer: {
      slots: ['Footer'],
    },
    LandingPage2Template: {
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
      slots: ['Section1', 'Section2', 'Section3'],
    },
    ProductListPageTemplate: {
      slots: ['ProductListSlot', 'ProductLeftRefinements'],
    },
    SearchResultsListPageTemplate: {
      slots: [
        'Section2',
        'SearchResultsListSlot',
        'ProductLeftRefinements',
        // 'Section4',
      ],
    },
    ProductDetailsPageTemplate: {
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
  },
};
