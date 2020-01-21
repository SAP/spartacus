import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Config, ConfigModule } from '@spartacus/core';
import { defaultPaginationConfig, PaginationConfig } from './config/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(defaultPaginationConfig),
  ],
  providers: [{ provide: PaginationConfig, useExisting: Config }],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
