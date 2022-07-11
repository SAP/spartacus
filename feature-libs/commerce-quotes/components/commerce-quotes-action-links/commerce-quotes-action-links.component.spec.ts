import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { CommerceQuotesActionLinksComponent } from './commerce-quotes-action-links.component';
import { CommerceQuotesActionLinksService } from './commerce-quotes-action-links.service';
import createSpy = jasmine.createSpy;

class MockActionLinksService
  implements Partial<CommerceQuotesActionLinksService>
{
  goToNewCart = createSpy();
}

describe('CommerceQuotesActionLinksComponent', () => {
  let fixture: ComponentFixture<CommerceQuotesActionLinksComponent>;
  let component: CommerceQuotesActionLinksComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, UrlTestingModule],
      declarations: [CommerceQuotesActionLinksComponent],
      providers: [
        {
          provide: CommerceQuotesActionLinksService,
          useClass: MockActionLinksService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceQuotesActionLinksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render action links', () => {
    const links = fixture.debugElement.queryAll(By.css('button.link'));

    fixture.detectChanges();

    expect(links[0].nativeElement.innerText).toContain('links.newCart');
    expect(links[1].nativeElement.innerText).toContain('links.quotes');
    expect(links.length).toEqual(2);
  });
});
