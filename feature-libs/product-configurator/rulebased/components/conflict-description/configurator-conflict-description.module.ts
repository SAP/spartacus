import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorConflictDescriptionComponent } from './configurator-conflict-description.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [ConfiguratorConflictDescriptionComponent],
  exports: [ConfiguratorConflictDescriptionComponent],
})
export class ConfiguratorConflictDescriptionModule {}
