import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { SvgLoaderService } from './svg-loader.service';
@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [
        SvgLoaderService
    ],
    declarations: [BannerComponent],
    exports: [BannerComponent],
    entryComponents: [BannerComponent]
})
export class BannerModule { }
