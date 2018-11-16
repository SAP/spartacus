import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn.component';
import { PWAModuleConfig, defaultPWAModuleConfig } from '../pwa.module-config';
import { PwaModule } from './../pwa.module';
import { StoreModule } from '@ngrx/store';
import { ɵangular_packages_service_worker_service_worker_b as RegistrationOptions } from '@angular/service-worker';

describe('AddToHomeScreenBtnComponent', () => {
  let component: AddToHomeScreenBtnComponent;
  let fixture: ComponentFixture<AddToHomeScreenBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PwaModule, StoreModule.forRoot({})],
      providers: [
        RegistrationOptions,
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
