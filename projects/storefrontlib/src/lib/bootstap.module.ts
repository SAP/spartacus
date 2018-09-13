import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbTabsetModule,
  NgbAccordionModule,
  NgbTabsetConfig,
  NgbAccordionConfig,
  NgbRatingModule,
  NgbRatingConfig
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbDropdownModule.forRoot(),
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule
  ],
  exports: [
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbRatingModule
  ],
  providers: [NgbTabsetConfig, NgbAccordionConfig, NgbRatingConfig]
})
export class BootstrapModule {}
