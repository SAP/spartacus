import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageLayoutComponent } from './landing-page-layout.component';
import { ComponentWrapperDirective } from '../../../cms/components';
import { StoreModule } from '@ngrx/store';
import { OutletDirective } from '../../../outlet';
import { Input, Component } from '@angular/core';

@Component({
  selector: 'cx-dynamic-slot',
  template: 'MockDynamicSlotComponent'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}
describe('LandingPageLayoutComponent', () => {
  let component: LandingPageLayoutComponent;
  let fixture: ComponentFixture<LandingPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [
        LandingPageLayoutComponent,
        MockDynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
