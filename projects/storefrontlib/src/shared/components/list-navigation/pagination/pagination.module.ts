import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Config, provideDefaultConfig } from '@spartacus/core';
import { defaultPaginationConfig, PaginationConfig } from './config/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [
    provideDefaultConfig(defaultPaginationConfig),
    { provide: PaginationConfig, useExisting: Config },
  ],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
