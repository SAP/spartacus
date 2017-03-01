import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule } from './router/router.module';
import { OccModule } from './occ/occ.module';
import { UiModule } from './ui/ui.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        
        RouterModule,
        OccModule,
        UiModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
