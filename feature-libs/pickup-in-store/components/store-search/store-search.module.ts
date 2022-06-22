import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { I18nModule } from '@spartacus/core';
import { StoreSearchComponent } from './store-search.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    HttpClientTestingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  exports: [StoreSearchComponent],
  declarations: [StoreSearchComponent],
  providers: [],
})
export class StoreSearchModule {}
