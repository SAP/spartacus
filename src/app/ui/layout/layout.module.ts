import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CmsModule } from '../../cms/cms.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ContentPageLayoutComponent } from './content-page-layout/content-page-layout.component';

import { ComponentsModule } from '../components/components.module';

import { CookieConfirmationModule } from '../../cms-lib/cookie-confirmation/cookie-confirmation.module';
import { LoginStatusModule } from '../../cms-lib/login-status/login-status.module';
import { LanguageSelectorModule } from '../../cms-lib/language-selector/language-selector.module';
import { CurrencySelectorModule } from '../../cms-lib/currency-selector/currency-selector.module';

import { ProductListPageLayoutComponent } from './product-list-page-layout/product-list-page-layout.component';
import { ProductDetailsPageLayoutComponent } from './product-details-page-layout/product-details-page-layout.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule.forRoot(),
        FlexLayoutModule,
        CmsModule,

        ComponentsModule,

        CookieConfirmationModule,
        LoginStatusModule,
        LanguageSelectorModule,
        CurrencySelectorModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        MainComponent,
        ContentPageLayoutComponent,
        ProductListPageLayoutComponent,
        ProductDetailsPageLayoutComponent
    ],
    exports: [
        MainComponent,
        ContentPageLayoutComponent,
        ProductListPageLayoutComponent,
        ProductDetailsPageLayoutComponent
    ]
})
export class LayoutModule { }
