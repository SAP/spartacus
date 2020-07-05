import { Component, Input, NgModule, Output } from '@angular/core';

@Component({
  template: '<ng-content></ng-content>',
  selector: 'cx-split-view',
})
class MockSplitViewComponent {}

@Component({
  template: '<ng-content></ng-content>',
  selector: 'cx-view',
})
class MockViewComponent {
  @Input() position: number;
  @Input() hidden;
  @Output() hiddenChange;
}

const mockComponents = [MockSplitViewComponent, MockViewComponent];

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
})
export class SplitViewTestingModule {}
