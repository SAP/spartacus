import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule, BootstrapModule],
  providers: [NavigationService],
  declarations: [NavigationComponent],
  entryComponents: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {}
