import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterNavigationComponent } from './footer-navigation.component';

import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [FooterNavigationComponent],
    entryComponents: [FooterNavigationComponent],
    exports: [FooterNavigationComponent]
})
export class FooterNavigationModule { }
