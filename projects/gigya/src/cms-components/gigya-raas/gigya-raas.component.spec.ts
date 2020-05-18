import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigyaRaasComponent } from './gigya-raas.component';

describe('GigyaRaasComponent', () => {
  let component: GigyaRaasComponent;
  let fixture: ComponentFixture<GigyaRaasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigyaRaasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigyaRaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
