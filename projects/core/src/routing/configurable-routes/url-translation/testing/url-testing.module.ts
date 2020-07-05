import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [MockUrlPipe],
  exports: [MockUrlPipe],
})
export class UrlTestingModule {}
