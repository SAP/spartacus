import { NgModule } from '@angular/core';
import {
  NgbTabsetModule,
  NgbAccordionModule,
  NgbTabsetConfig,
  NgbAccordionConfig,
  NgbRatingModule,
  NgbRatingConfig,
  NgbDropdownModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbPaginationConfig
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbDropdownModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbPaginationModule
  ],
  exports: [
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTypeaheadModule,
    NgbPaginationModule
  ],
  providers: [
    NgbTabsetConfig,
    NgbAccordionConfig,
    NgbRatingConfig,
    NgbPaginationConfig
  ]
})
export class BootstrapModule {}
