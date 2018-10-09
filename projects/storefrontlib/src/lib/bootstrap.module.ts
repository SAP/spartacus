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
  NgbPaginationConfig,
  NgbCarouselModule
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
    NgbCollapseModule,
    NgbCarouselModule
  ],
  exports: [
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTypeaheadModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbCarouselModule
  ],
  providers: [
    NgbTabsetConfig,
    NgbAccordionConfig,
    NgbRatingConfig,
    NgbPaginationConfig
  ]
})
export class BootstrapModule {}
