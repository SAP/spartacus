import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRouter } from './routes';

import { TemplatesModule } from '../ui/templates/templates.module';
import { DataModule } from '../data/data.module';

@NgModule({
    imports: [
        CommonModule,
        AppRouter,
        DataModule,
        TemplatesModule
    ]
})
export class RouterModule { }
