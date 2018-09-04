import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MediaModule } from '../../ui/components/media/media.module';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MediaModule,
    NgbModule
  ],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
