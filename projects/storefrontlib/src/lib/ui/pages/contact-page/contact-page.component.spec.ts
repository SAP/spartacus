import { ContactPageComponent } from './contact-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ContactPageLayoutModule } from '../../layout/contact-page-layout/contact-page-layout.module';

describe('ContactPageLayoutComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ContactPageLayoutModule],
      declarations: [ContactPageComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
