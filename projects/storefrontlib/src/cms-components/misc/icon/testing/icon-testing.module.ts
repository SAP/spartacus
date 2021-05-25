import { Component, Input, NgModule } from '@angular/core';
import { IconLoaderService } from '../icon-loader.service';

// PRIVATE TESTING UTIL
@Component({
  selector: 'cx-icon,[cxIcon]',
  template: `{{ type || cxIcon }}`,
})
export class MockIconComponent {
  @Input() cxIcon;
  @Input() type;
}

const mockComponents = [MockIconComponent];

export class MockIconLoaderService {
  getHtml() {}
  getStyleClasses() {}
  addStyleClasses() {}
  addLinkResource() {}
}

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
  providers: [
    {
      provide: IconLoaderService,
      useClass: MockIconLoaderService,
    },
  ],
})
export class IconTestingModule {}
