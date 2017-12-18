import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        NgbModule,        
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
