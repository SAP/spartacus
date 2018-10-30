import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn.component';
import { PWAModuleConfig, defaultPWAModuleConfig } from '../pwa.module-config';

describe('AddToHomeScreenBtnComponent', () => {
  let component: AddToHomeScreenBtnComponent;
  let fixture: ComponentFixture<AddToHomeScreenBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddToHomeScreenBtnComponent],
      providers: [
        {
          provide: PWAModuleConfig,
          useValue: defaultPWAModuleConfig
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToHomeScreenBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
