import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Config, provideConfig } from '@spartacus/core';
import { defaultPaginationConfig, PaginationConfig } from './config/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [
    provideConfig(defaultPaginationConfig),
    { provide: PaginationConfig, useExisting: Config },
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
