import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultGenericLinkConfig } from './default-generic-link-config';
import { GenericLinkComponent } from './generic-link.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GenericLinkComponent],
  providers: [provideDefaultConfig(defaultGenericLinkConfig)],
  exports: [GenericLinkComponent],
})
export class GenericLinkModule {}
