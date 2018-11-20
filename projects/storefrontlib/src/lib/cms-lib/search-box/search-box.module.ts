import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MediaModule } from '../../ui/components/media/media.module';

import { SearchBoxComponent } from './search-box.component';
import { BootstrapModule } from '../../bootstrap.module';
import { ProductModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MediaModule,
    ProductModule
  ],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
