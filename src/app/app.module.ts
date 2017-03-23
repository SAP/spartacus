import { LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from './router/router.module';
import { OccModule } from './occ/occ.module';
import { UiModule } from './ui/ui.module';

import { CmsModule } from './cms/cms.module';

import { CmsLibModule } from './cms-lib/cms-lib.module';

import { UiFrameworkModule } from './ui/ui-framework/ui-framework.module';

const hybrisServerSettings = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/',
    baseSite: 'electronics',
    oauth: {
        client_id: 'trusted_client',
        client_secret: 'secret'
    }
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,

        RouterModule,
        OccModule.forRoot({
            settings: hybrisServerSettings
        }),
        CmsModule.forRoot(
            {
                settings: {
                    baseUrl: hybrisServerSettings.baseUrl
                },
            },
            {
                componentMapping: {
                    CMSLinkComponent: 'LinkComponent',
                    SimpleResponsiveBannerComponent: 'BannerComponent',
                    SimpleBannerComponent: 'BannerComponent',
                    BreadcrumbComponent: 'BreadcrumbComponent',
                    CmsParagraphComponent: 'ParagraphComponent',
                    NavigationComponent: 'NavigationComponent',
                    FooterNavigationComponent: 'FooterNavigationComponent',
                    CategoryNavigationComponent: 'CategoryNavigationComponent',
                    ProductAddToCartComponent: 'AddToCartComponent',
                    MiniCartComponent: 'MiniCartComponent',
                    // SideCartComponent: 'MiniCartComponent',
                    ProductCarouselComponent: 'ProductCarouselComponent',
                    SearchBoxComponent: 'SearchBoxComponent',
                    ProductReferencesComponent: 'ProductReferencesComponent',
                    CMSTabParagraphComponent: 'TabParagraphContainerComponent'
                }
            }
        ),
        CmsLibModule,
        UiModule,
        UiFrameworkModule
    ],

    providers: [
      {
          provide: LOCALE_ID, useValue: 'nl-NL'
      },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
