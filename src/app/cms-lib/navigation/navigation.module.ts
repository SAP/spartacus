import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule.forRoot()        
    ],
    providers: [NavigationService],
    declarations: [NavigationComponent],
    entryComponents: [NavigationComponent],
    exports: [NavigationComponent]
})
export class NavigationModule { }
