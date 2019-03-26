import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YotpostarratingComponent } from './yotpostarrating.component';

describe('YotpostarratingComponent', () => {
  let component: YotpostarratingComponent;
  let fixture: ComponentFixture<YotpostarratingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YotpostarratingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YotpostarratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
