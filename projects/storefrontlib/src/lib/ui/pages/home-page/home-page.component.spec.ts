import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { LandingPageLayoutComponent } from '../../layout/landing-page-layout/landing-page-layout.component';
import { ComponentWrapperDirective } from '../../../cms/components';
import { StoreModule } from '@ngrx/store';
import * as fromCmsReducer from '../../../cms/store/reducers';
import { OutletDirective } from '../../../outlet';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-dynamic-slot',
  template: 'MockDynamicSlotComponent'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers())
      ],
      declarations: [
        HomePageComponent,
        LandingPageLayoutComponent,
        MockDynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
