import { NgModule } from '@angular/core';
import {
  NgbDropdownModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbDropdownModule.forRoot(), NgbTypeaheadModule.forRoot()],
  exports: [NgbDropdownModule, NgbTypeaheadModule]
})
export class BootstrapModule {}
