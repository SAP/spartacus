import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { TermsConditionsPageComponent } from './terms-conditions-page.component';
import { TermsConditionsLayoutComponent } from '../../layout/terms-conditions-layout/terms-conditions-layout.component';
import { OutletDirective } from '../../../outlet';
import { ComponentWrapperDirective } from '../../../cms/components';
import { ComponentsModule } from '../../components/components.module';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

describe('TermsConditionsPageComponent', () => {
  let component: TermsConditionsPageComponent;
  let fixture: ComponentFixture<TermsConditionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, StoreModule.forRoot({})],
      declarations: [
        TermsConditionsPageComponent,
        TermsConditionsLayoutComponent,
        MockDynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
