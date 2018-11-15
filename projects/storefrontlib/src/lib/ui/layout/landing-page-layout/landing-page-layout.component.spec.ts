import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';

import { OutletDirective } from '../../../outlet';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';

import { LandingPageLayoutComponent } from './landing-page-layout.component';

xdescribe('LandingPageLayoutComponent', () => {
  let component: LandingPageLayoutComponent;
  let fixture: ComponentFixture<LandingPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [
        LandingPageLayoutComponent,
        DynamicSlotComponent,
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
