import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsParagraphModule } from './cms-paragraph/cms-paragraph.module';
import { LinkModule } from './link/link.module';
import { BannerModule } from './banner/banner.module';
import { CategoryNavigationModule} from './category-navigation/category-navigation.module';
import { NavigationModule } from './navigation/navigation.module';

// import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,

        CmsParagraphModule,
        LinkModule,
        BannerModule,
        CategoryNavigationModule,
        NavigationModule
    ],
    declarations: []
})
export class CmsLibModule { }
