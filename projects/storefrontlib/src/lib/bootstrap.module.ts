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
  NgbCollapseModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbPaginationConfig
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbCollapseModule
  ],
  exports: [
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbModalModule,
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
