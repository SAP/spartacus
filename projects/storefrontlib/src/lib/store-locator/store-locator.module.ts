import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material.module';
import {StoreLocatorComponent} from './components/store-locator/store-locator.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [StoreLocatorComponent],
  entryComponents: [StoreLocatorComponent],
  exports: [StoreLocatorComponent]
})
export class StoreLocatorModule {}
