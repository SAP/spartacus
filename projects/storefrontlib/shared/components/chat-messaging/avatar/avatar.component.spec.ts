import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { MessageEvent } from '../messaging';
import { AvatarComponent } from './avatar.component';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';

const mockEvent: MessageEvent = {
  author: 'Mark Rivers',
  rightAlign: true,
};

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, IconModule],
      declarations: [AvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.message = mockEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return initials', () => {
    let result = component.getInitials('Mark Rivers');

    expect(result).toEqual('MR');
  });

  it('should display initials if the addedByAgent is falsy', () => {
    mockEvent.rightAlign = false;
    component.message = mockEvent;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('span')).nativeElement;

    expect(element.innerText).toEqual('MR');
  });

  it('should display icon if addedByAgent is truthy', () => {
    mockEvent.rightAlign = true;
    component.message = mockEvent;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('cx-icon')).nativeElement;

    expect(element.getAttribute('ng-reflect-type')).toEqual('HEADSET');
  });

  it('should display user icon if author is missing', () => {
    mockEvent.author = '';
    mockEvent.rightAlign = false;
    component.message = mockEvent;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('cx-icon')).nativeElement;

    expect(element.getAttribute('ng-reflect-type')).toEqual('USER');
  });
});
