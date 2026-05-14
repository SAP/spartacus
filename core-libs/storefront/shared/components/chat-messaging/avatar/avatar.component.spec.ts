import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  MockIconComponent,
} from '../../../../cms-components/misc/icon';
import { MessageEvent } from '../messaging';
import { AvatarComponent } from './avatar.component';

const mockEvent: MessageEvent = {
  author: 'Mark Rivers',
  rightAlign: true,
};

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, AvatarComponent],
    })
      .overrideComponent(AvatarComponent, {
        remove: {
          imports: [IconComponent],
        },
        add: {
          imports: [MockIconComponent],
        },
      })
      .compileComponents();
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
    mockEvent.author = 'Agent';
    component.message = mockEvent;
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('cx-icon');
    expect(iconElement).toBeTruthy();

    expect(iconElement.textContent).toEqual(ICON_TYPE.HEADSET);
  });

  it('should display user icon if author is missing', () => {
    mockEvent.author = '';
    mockEvent.rightAlign = false;
    component.message = mockEvent;
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('cx-icon');
    expect(iconElement).toBeTruthy();

    expect(iconElement.textContent).toEqual(ICON_TYPE.USER);
  });
});
