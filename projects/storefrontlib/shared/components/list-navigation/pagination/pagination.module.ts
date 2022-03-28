import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPaginationConfig } from './config/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [provideDefaultConfig(defaultPaginationConfig)],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationModule {}
