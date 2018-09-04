import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaModule } from '../../ui/components/media/media.module';

import { SearchBoxComponent } from './search-box.component';
import { BootstrapModule } from '../../bootstap.module';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MediaModule
  ],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
