import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { ConfigConflictDescriptionComponent } from './config-conflict-description.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [ConfigConflictDescriptionComponent],
  exports: [ConfigConflictDescriptionComponent],
  entryComponents: [ConfigConflictDescriptionComponent],
})
export class ConfigConflictDescriptionModule {}
