import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// OCC services (we should leverage swagger generated sevices instead)
// import { SettingsModule } from '../settings/settings.module';
import { OccCmsService } from './occ-cms.service';
import { StubService } from './stub.service';

@NgModule({
    schemas:   [],
    imports: [
        BrowserModule,
        CommonModule,
        // SettingsModule
    ],
    declarations: [
    ],
    providers: [
        OccCmsService,
        StubService
    ],
    exports: []
})
export class OccCmsModule { }
