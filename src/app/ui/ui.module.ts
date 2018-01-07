import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { AppRouter } from './routes';
import { LayoutModule } from './layout/layout.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
    imports: [
        CommonModule,
        //AppRouter,
        LayoutModule,
        TemplatesModule
    ],
    exports: [
        LayoutModule
    ],
    declarations: []
})
export class UiModule { }
