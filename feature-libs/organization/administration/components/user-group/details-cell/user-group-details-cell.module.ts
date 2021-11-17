import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { UserGroupDetailsCellComponent } from './user-group-details-cell.component';

@NgModule({
  imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
  declarations: [UserGroupDetailsCellComponent],
  exports: [UserGroupDetailsCellComponent],
})
export class UserGroupDetailsCellModule {}
