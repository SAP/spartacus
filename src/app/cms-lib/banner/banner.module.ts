import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgLoaderService } from './svg-loader.service';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ],
    providers: [
        SvgLoaderService
    ],
    declarations: [BannerComponent],
    exports: [BannerComponent],
    entryComponents: [BannerComponent]
})
export class BannerModule { }
