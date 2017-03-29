import { LOCALE_ID } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ConfigService } from './config.service';

import { AppComponent } from './app.component';
// import { RouterModule } from './router/router.module';

import { DataModule } from './data/data.module';
import { OccModule } from './occ/occ.module';

import { UiModule } from './ui/ui.module';

import { CmsModule } from './cms/cms.module';

import { CmsLibModule } from './cms-lib/cms-lib.module';

import { UiFrameworkModule } from './ui/ui-framework/ui-framework.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        // RouterModule,
        OccModule.forRoot(ConfigService),
        DataModule.forRoot(ConfigService),
        CmsModule.forRoot(ConfigService),
        CmsLibModule,
        UiModule,
        UiFrameworkModule
    ],

    providers: [
        ConfigService,
        {
            // TODO: configure locale
            provide: LOCALE_ID, useValue: 'nl-NL'
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
