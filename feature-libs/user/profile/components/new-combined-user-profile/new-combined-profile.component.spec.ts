import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCombinedProfileComponent } from './new-combined-profile.component';

describe('NewEmailComponent', () => {
  let fixture: ComponentFixture<NewCombinedProfileComponent>;
  let component: NewCombinedProfileComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCombinedProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
