import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: provide URL mappings for site specific routings
export const appRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
