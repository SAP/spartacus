import { LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from './router/router.module';
import { OccModule } from './occ/occ.module';
import { UiModule } from './ui/ui.module';

import { CmsModule } from './cms/cms.module';

import { CmsLibModule } from './cms-lib/cms-lib.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        
        RouterModule,
        OccModule.forRoot({
            settings: {
                baseUrl: 'https://localhost:9002/rest/v2/',
                baseSite: 'electronics'
            }
        }),
        CmsModule.forRoot({
            componentMapping: {
                CMSLinkComponent: 'LinkComponent',
                SimpleResponsiveBannerComponent: 'SimpleResponsiveBannerComponent',
                SimpleBannerComponent: 'SimpleResponsiveBannerComponent',
                BreadcrumbComponent: 'BreadcrumbComponent',
                CmsParagraphComponent: 'CmsParagraphComponent',
                NavigationComponent: 'NavigationComponent',
                FooterNavigationComponent: 'FooterNavigationComponent',
                CategoryNavigationComponent: 'CategoryNavigationComponent',
                MiniCartComponent: 'CartTriggerComponent',
                SideCartComponent: 'MiniCartComponent'
            }
        }),
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
