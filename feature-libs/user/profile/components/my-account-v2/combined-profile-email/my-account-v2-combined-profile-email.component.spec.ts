import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountV2CombinedProfileEmailComponent } from './my-account-v2-combined-profile-email.component';

describe('MyProfileV2EmailComponent', () => {
  let fixture: ComponentFixture<MyAccountV2CombinedProfileEmailComponent>;
  let component: MyAccountV2CombinedProfileEmailComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountV2CombinedProfileEmailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
