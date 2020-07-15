import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConfigTabBarComponent } from './config-tab-bar.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
  ],
  declarations: [ConfigTabBarComponent],
  exports: [ConfigTabBarComponent],
  entryComponents: [ConfigTabBarComponent],
})
export class ConfigTabBarModule {}
