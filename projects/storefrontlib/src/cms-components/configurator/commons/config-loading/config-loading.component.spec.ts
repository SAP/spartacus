import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLoadingComponent } from './config-loading.component';

describe('ConfigLoadingComponent', () => {
  let component: ConfigLoadingComponent;
  let fixture: ComponentFixture<ConfigLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
