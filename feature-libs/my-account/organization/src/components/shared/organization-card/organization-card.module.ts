import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { OrganizationCardComponent } from './organization-card.component';

@NgModule({
  imports: [
    CommonModule,
    SplitViewModule,
    RouterModule,
    I18nModule,
    IconModule,
    UrlModule,
  ],
  declarations: [OrganizationCardComponent],
  exports: [OrganizationCardComponent],
})
export class OrganizationCardModule {}
