import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';

import { OutletDirective } from '../../../outlet';
import { ComponentWrapperDirective } from '../../../cms/components';

import { LandingPageLayoutComponent } from './landing-page-layout.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
class MockDynamicSlotComponent {
  @Input()
  position: string;
}

xdescribe('LandingPageLayoutComponent', () => {
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
