import {
  Component,
  DebugElement,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { FocusDirective } from '@spartacus/storefront';
import { ICON_TYPE } from '../../../cms-components/misc/index';
import { Card, CardComponent, CardLinkAction } from './card.component';

@Directive({
  selector: '[cxAtMessage]',
})
export class MockAtMessageDirective {
  @Input() cxAtMessage: string | string[] | undefined;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-truncate-text-popover',
  template: '',
})
class MockCxTruncateTextPopoverComponent {
  @Input() content: string;
  @Input() charactersLimit: number = 5;
  @Input() customClass?: string;
}

function getTruncatedPopover(elem: DebugElement) {
  return elem.queryAll(By.css('cx-truncate-text-popover'));
}
let isActiveStoreFrontLibCardParagraphTruncated: boolean;
@Directive({
  selector: '[cxFeature]',
})
class MockFeatureDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {}

  @Input() set cxFeature(feature: string) {
    const featureDesiredAndPresent =
      isActiveStoreFrontLibCardParagraphTruncated && !feature.startsWith('!');
    const featureNotDesiredAndNotPresent =
      !isActiveStoreFrontLibCardParagraphTruncated && feature.startsWith('!');
    if (featureDesiredAndPresent || featureNotDesiredAndNotPresent) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CardComponent,
          MockCxIconComponent,
          MockAtMessageDirective,
          FocusDirective,
          MockCxTruncateTextPopoverComponent,
          MockFeatureDirective,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.deleteCard, 'emit').and.callThrough();
    spyOn(component.cancelCard, 'emit').and.callThrough();
    spyOn(component.setDefaultCard, 'emit').and.callThrough();
    spyOn(component.sendCard, 'emit').and.callThrough();
    spyOn(component.editCard, 'emit').and.callThrough();
    isActiveStoreFrontLibCardParagraphTruncated = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have class border if border attribute is passed', () => {
    function getBorderClass(elem: DebugElement) {
      return elem.query(By.css('.cx-card-border'));
    }

    const mockCard: Card = {
      text: ['hello'],
    };
    component.border = true;
    component.content = mockCard;
    fixture.detectChanges();
    expect(getBorderClass(el)).toBeTruthy();
  });

  it('should have class fit-to-container if fitToContainer attribute is passed', () => {
    function getFitToContainerClass(elem: DebugElement) {
      return elem.query(By.css('.cx-card-fit-to-container'));
    }

    const mockCard: Card = {
      text: ['hello'],
    };
    component.fitToContainer = true;
    component.content = mockCard;
    fixture.detectChanges();
    expect(getFitToContainerClass(el)).toBeTruthy();
  });

  it('should show passed header', () => {
    function getHeaderText(elem: DebugElement): string {
      return elem.query(By.css('.card-header')).nativeElement.textContent;
    }

    const mockCard: Card = {
      header: 'Header text',
    };
    component.content = mockCard;
    fixture.detectChanges();
    expect(getHeaderText(el)).toContain(mockCard.header);
  });

  it('should show passed title', () => {
    function getTitleText(elem: DebugElement): string {
      return elem.query(By.css('.cx-card-title')).nativeElement.textContent;
    }

    const mockCard: Card = {
      title: 'Title text',
    };
    component.content = mockCard;
    fixture.detectChanges();
    expect(getTitleText(el)).toContain(mockCard.title);
  });

  it('should show passed bold text', () => {
    function getBoldText(elem: DebugElement): string {
      return elem.query(By.css('.cx-card-label-bold')).nativeElement
        .textContent;
    }

    const mockCard: Card = {
      textBold: 'Bold text',
    };
    component.content = mockCard;
    fixture.detectChanges();
    expect(getBoldText(el)).toContain(mockCard.textBold);
  });

  it('should render passed text', () => {
    function getText(elem: DebugElement) {
      return elem.queryAll(By.css('.cx-card-label'));
    }

    const mockCard: Card = {
      text: ['First line', 'Second line'],
    };
    component.content = mockCard;
    fixture.detectChanges();
    const lineNodes = getText(el);
    expect(lineNodes[0].nativeElement.textContent).toContain(mockCard.text[0]);
    expect(lineNodes[1].nativeElement.textContent).toContain(mockCard.text[1]);
  });

  it('should render passed text for truncated text popover for a long text', () => {
    const mockCard: Card = {
      text: ['First line', 'Second line'],
    };
    component.content = mockCard;
    component.charactersLimit = 5;
    component.truncateText = true;
    fixture.detectChanges();
    const truncatedPopovers = getTruncatedPopover(el);

    truncatedPopovers.forEach((truncatedPopover, index) => {
      const popover = truncatedPopover.nativeNode;
      const attributeNames = popover.getAttributeNames();
      attributeNames.forEach((attrName) => {
        if (attrName.indexOf('characters-limit') >= 0) {
          expect(popover.getAttribute(attrName)).toContain(
            component.charactersLimit
          );
        }

        if (attrName.indexOf('content') >= 0) {
          expect(popover.getAttribute(attrName)).toContain(
            mockCard.text[index]
          );
        }

        if (attrName.indexOf('custom-class') >= 0) {
          expect(popover.getAttribute(attrName)).toContain('cx-card-label');
        }
      });
    });
  });

  it('should render passed paragraph', () => {
    checkParagraph(component, fixture, el);
  });

  it('should render passed paragraph in case isActiveStoreFrontLibCardParagraphTruncated is active', () => {
    isActiveStoreFrontLibCardParagraphTruncated = true;
    checkParagraph(component, fixture, el);
  });

  it('should render passed paragraph with text for truncated text popover for a long text', () => {
    isActiveStoreFrontLibCardParagraphTruncated = true;
    const mockCard: Card = {
      paragraphs: [
        { title: 'paragraph1', text: ['text1'] },
        { title: 'paragraph2', text: ['text3'] },
      ],
    };
    component.content = mockCard;
    component.charactersLimit = 4;
    component.truncateParagraphText = true;

    fixture.detectChanges();

    const truncatedPopovers = getTruncatedPopover(el);
    expect(truncatedPopovers.length).toBe(2);
    truncatedPopovers.forEach((truncatedPopover, index) => {
      const popover = truncatedPopover.nativeNode;
      const attributeNames = popover.getAttributeNames();
      attributeNames.forEach((attrName) => {
        if (attrName.indexOf('characters-limit') >= 0) {
          expect(popover.getAttribute(attrName)).toContain(
            component.charactersLimit
          );
        }

        if (attrName.indexOf('content') >= 0) {
          expect(popover.getAttribute(attrName)).toContain(
            mockCard.paragraphs[index].text[0]
          );
        }

        if (attrName.indexOf('custom-class') >= 0) {
          expect(popover.getAttribute(attrName)).toContain(
            'cx-card-paragraph-text'
          );
        }
      });
    });
  });

  it('should render passed img', () => {
    function getImage(elem: DebugElement) {
      return elem.query(By.css('.cx-card-img-container cx-icon'));
    }

    const mockCard: Card = {
      img: 'mock-image',
    };
    component.content = mockCard;
    fixture.detectChanges();
    expect(getImage(el).componentInstance.type).toEqual(mockCard.img);
  });

  it('should properly handle editMode', () => {
    function getDeleteMsg(elem: DebugElement): string {
      return elem.query(By.css('.cx-card-delete-msg')).nativeElement
        .textContent;
    }

    function getDeleteButton(elem: DebugElement): HTMLButtonElement {
      return elem.query(By.css('.cx-card-body-delete .btn-primary'))
        .nativeElement;
    }

    const mockCard: Card = {
      deleteMsg: 'Delete msg',
    };
    component.editMode = true;
    component.content = mockCard;
    fixture.detectChanges();
    expect(getDeleteMsg(el)).toContain(mockCard.deleteMsg);
    const deleteButton = getDeleteButton(el);
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(component.deleteCard.emit).toHaveBeenCalled();
  });

  it('should handle cancel action', () => {
    function getCancelButton(elem: DebugElement): HTMLButtonElement {
      return elem.query(By.css('.cx-card-body-delete .btn-secondary'))
        .nativeElement;
    }

    const mockCard: Card = {
      deleteMsg: 'Delete msg',
    };
    component.editMode = true;
    component.content = mockCard;
    fixture.detectChanges();
    const cancelButton = getCancelButton(el);
    expect(cancelButton).toBeTruthy();
    cancelButton.click();
    expect(component.cancelCard.emit).toHaveBeenCalled();
  });

  it('should handle delete action', () => {
    function getDeleteButton(elem: DebugElement): HTMLElement {
      return elem.query(By.css('.cx-card-actions .link')).nativeElement;
    }

    const mockCard: Card = {
      actions: [{ event: 'delete', name: 'Delete' }],
    };
    component.content = mockCard;
    fixture.detectChanges();
    const deleteButton = getDeleteButton(el);
    expect(deleteButton.textContent).toContain(mockCard.actions[0].name);
    deleteButton.click();
    expect(component.deleteCard.emit).toHaveBeenCalled();
  });

  it('should handle default action', () => {
    function getDefaultActionButton(elem: DebugElement): HTMLElement {
      return elem.query(By.css('.cx-card-actions .link')).nativeElement;
    }

    const mockCard: Card = {
      actions: [{ event: 'default', name: 'Set as default' }],
    };
    component.content = mockCard;
    fixture.detectChanges();
    const defaultActionButton = getDefaultActionButton(el);
    expect(defaultActionButton.textContent).toContain(mockCard.actions[0].name);
    defaultActionButton.click();
    expect(component.setDefaultCard.emit).toHaveBeenCalled();
  });

  it('should handle send action', () => {
    function getSendActionButton(elem: DebugElement): HTMLElement {
      return elem.query(By.css('.cx-card-actions .link')).nativeElement;
    }

    const mockCard: Card = {
      actions: [{ event: 'send', name: 'Save address' }],
    };
    component.content = mockCard;
    fixture.detectChanges();
    const sendActionButton = getSendActionButton(el);
    expect(sendActionButton.textContent).toContain(mockCard.actions[0].name);
    sendActionButton.click();
    expect(component.sendCard.emit).toHaveBeenCalled();
  });

  it('should handle edit action', () => {
    function getEditActionButton(elem: DebugElement): HTMLElement {
      return elem.query(By.css('.cx-card-actions .link')).nativeElement;
    }

    const mockCard: Card = {
      actions: [{ event: 'edit', name: 'Edit address' }],
    };
    component.content = mockCard;
    fixture.detectChanges();
    const editActionButton = getEditActionButton(el);
    expect(editActionButton.textContent).toContain(mockCard.actions[0].name);
    editActionButton.click();
    expect(component.editCard.emit).toHaveBeenCalled();
  });

  it('should handle links', () => {
    function getLinkAction(elem: DebugElement): HTMLAnchorElement {
      return elem.query(By.css('.cx-card-actions .link')).nativeElement;
    }

    const link: CardLinkAction = { link: '/test.html', name: 'Go to test' };
    const mockCard: Card = {
      actions: [link],
    };
    component.content = mockCard;
    fixture.detectChanges();
    const editActionButton = getLinkAction(el);
    expect(editActionButton.textContent).toContain(link.name);
    expect(editActionButton.href).toContain(link.link);
  });
});

function checkParagraph(
  component: CardComponent,
  fixture: ComponentFixture<CardComponent>,
  el: DebugElement
) {
  function getParagraph(elem: DebugElement) {
    return elem.queryAll(By.css('.cx-card-paragraph'));
  }

  function getParagraphText(elem: DebugElement) {
    return elem.queryAll(By.css('.cx-card-paragraph-text'));
  }

  const mockCard: Card = {
    paragraphs: [
      { title: 'paragraph1', text: ['text1', 'text2'] },
      { title: 'paragraph2', text: ['text3', 'text4'] },
    ],
  };
  component.content = mockCard;
  fixture.detectChanges();
  const paragraphNodes = getParagraph(el);
  const text1Nodes = getParagraphText(paragraphNodes[0]);
  const text2Nodes = getParagraphText(paragraphNodes[1]);
  expect(paragraphNodes[0].nativeElement.firstChild.textContent).toContain(
    mockCard.paragraphs[0].title
  );
  expect(paragraphNodes[1].nativeElement.firstChild.textContent).toContain(
    mockCard.paragraphs[1].title
  );
  expect(text1Nodes[0].nativeElement.textContent).toContain(
    mockCard.paragraphs[0].text[0]
  );
  expect(text1Nodes[1].nativeElement.textContent).toContain(
    mockCard.paragraphs[0].text[1]
  );
  expect(text2Nodes[0].nativeElement.textContent).toContain(
    mockCard.paragraphs[1].text[0]
  );
  expect(text2Nodes[1].nativeElement.textContent).toContain(
    mockCard.paragraphs[1].text[1]
  );
}
