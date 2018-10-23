import { BootstrapModule } from '../../bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation.component';
import { NavigationUIComponent } from './navigation-ui.component';
import { NavigationService } from './navigation.service';

@NgModule({
  imports: [CommonModule, RouterModule, BootstrapModule],
  providers: [NavigationService],
  declarations: [NavigationComponent, NavigationUIComponent],
  entryComponents: [NavigationComponent],
  exports: [NavigationComponent, NavigationUIComponent]
})
export class NavigationModule {}
