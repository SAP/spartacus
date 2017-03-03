import { LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from './router/router.module';
import { OccModule } from './occ/occ.module';
import { UiModule } from './ui/ui.module';

import { CmsModule } from './cms/cms.module';

import { CmsLibModule } from './cms-lib/cms-lib.module';


const hybrisServerSettings = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/',
    baseSite: 'electronics'
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
                    MiniCartComponent: 'CartTriggerComponent',
                    SideCartComponent: 'MiniCartComponent',
                    ProductCarouselComponent: 'ProductCarouselComponent'
                }
            }
        ),
        CmsLibModule,
        UiModule
    ],
    
    providers: [
      {
          provide: LOCALE_ID, useValue: 'nl-NL'
      },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
