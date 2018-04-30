import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MediaModule } from '../../ui/components/media/media.module';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [CommonModule, RouterModule, MediaModule],
  declarations: [SearchBoxComponent],
  entryComponents: [SearchBoxComponent],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
