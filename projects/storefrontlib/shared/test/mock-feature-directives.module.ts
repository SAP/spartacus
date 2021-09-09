import { NgModule } from '@angular/core';
import { MockFeatureDirective } from './mock-feature-directive';
import { MockFeatureLevelDirective } from './mock-feature-level-directive';

@NgModule({
  declarations: [MockFeatureDirective, MockFeatureLevelDirective],
})
export class MockFeatureDirectivesModule {}
