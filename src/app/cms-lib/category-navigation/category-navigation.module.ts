import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationModule } from '../navigation/navigation.module';

import { CategoryNavigationComponent } from './category-navigation.component';

@NgModule({
  imports: [CommonModule, NavigationModule, RouterModule, NgbModule.forRoot()],
  declarations: [CategoryNavigationComponent],
  entryComponents: [CategoryNavigationComponent],
  exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule {}
