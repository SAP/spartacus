import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturelibComponent } from './featurelib.component';

describe('FeaturelibComponent', () => {
  let component: FeaturelibComponent;
  let fixture: ComponentFixture<FeaturelibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturelibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturelibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
