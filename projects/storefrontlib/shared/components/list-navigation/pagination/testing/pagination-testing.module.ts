import { NgModule } from '@angular/core';
import { defaultPaginationConfig, PaginationConfig } from '../config';
import { PaginationModule } from '../pagination.module';

// PRIVATE TESTING UTIL
@NgModule({
  imports: [PaginationModule],
  exports: [PaginationModule],
  providers: [
    {
      provide: PaginationConfig,
      useValue: defaultPaginationConfig,
    },
  ],
})
export class PaginationTestingModule {}
