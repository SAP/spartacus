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
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbDropdownModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    NgbPaginationModule.forRoot(),
    NgbModalModule.forRoot(),
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
  providers: [NgbTabsetConfig, NgbAccordionConfig, NgbRatingConfig]
})
export class BootstrapModule {}
