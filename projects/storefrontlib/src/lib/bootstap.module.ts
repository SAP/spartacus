import { NgModule } from '@angular/core';
import {
  NgbTabsetModule,
  NgbAccordionModule,
  NgbTabsetConfig,
  NgbAccordionConfig,
  NgbRatingModule,
  NgbRatingConfig,
  NgbDropdownModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbDropdownModule.forRoot(),
    NgbTypeaheadModule.forRoot(),
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule
  ],
  exports: [
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTypeaheadModule
  ],
  providers: [NgbTabsetConfig, NgbAccordionConfig, NgbRatingConfig]
})
export class BootstrapModule {}
