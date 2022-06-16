import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreSearchComponent } from './store-search.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  exports: [StoreSearchComponent],
  declarations: [StoreSearchComponent],
})
export class StoreSearchModule {}
