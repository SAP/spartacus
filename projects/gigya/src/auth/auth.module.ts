import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthServices } from './services/index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [...AuthServices],
})
export class AuthModule {}
