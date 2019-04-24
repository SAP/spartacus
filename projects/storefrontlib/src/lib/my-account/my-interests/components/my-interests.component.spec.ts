import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInterestsComponent } from './my-interests.component';

describe('MyInterestsComponent', () => {
  let component: MyInterestsComponent;
  let fixture: ComponentFixture<MyInterestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyInterestsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
