import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Input, Component } from '@angular/core';

import { TermsConditionsLayoutComponent } from './terms-conditions-layout.component';
import { ComponentsModule } from '../../components/components.module';
import { ComponentWrapperDirective } from '../../../cms/components';
import { OutletDirective } from '../../../outlet';

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

describe('TermsConditionsLayoutComponent', () => {
  let component: TermsConditionsLayoutComponent;
  let fixture: ComponentFixture<TermsConditionsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, StoreModule.forRoot({})],
      declarations: [
        MockDynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective,
        TermsConditionsLayoutComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
