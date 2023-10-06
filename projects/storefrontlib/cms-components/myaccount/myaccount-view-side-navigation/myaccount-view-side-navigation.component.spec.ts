import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyaccountViewSideNavigationComponent } from './myaccount-view-side-navigation.component';

describe('MyaccountViewSideNavigationComponent', () => {
  let component: MyaccountViewSideNavigationComponent;
  let fixture: ComponentFixture<MyaccountViewSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyaccountViewSideNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyaccountViewSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
