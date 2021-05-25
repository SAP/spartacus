import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { RolesCellComponent } from '..';

describe('RolesCellComponent', () => {
  let component: RolesCellComponent;
  let fixture: ComponentFixture<RolesCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesCellComponent],
      imports: [RouterTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              roles: ['approver', 'worker'],
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render roles', () => {
    const el = fixture.debugElement.queryAll(By.css('ul.text li'));
    expect(el.length).toEqual(2);

    expect((el[0].nativeElement as HTMLElement).innerText).toEqual(
      'organization.userRoles.approver'
    );
    expect((el[1].nativeElement as HTMLElement).innerText).toEqual(
      'organization.userRoles.worker'
    );
  });
});
