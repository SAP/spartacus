import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  CmsService,
  Page,
  PageType,
  PersonalizationConfig,
  PersonalizationContext,
  PersonalizationContextService,
} from '@spartacus/core';

const mockPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    enabled: true,
    context: {
      slotPosition: 'PlaceholderContentSlot',
      componentId: 'PersonalizationScriptComponent',
    },
  },
};

const personalizationContext = {
  actions: [
    {
      customization_name: btoa('customization_name1'),
      customization_code: btoa('customization_code1'),
      variation_name: btoa('variation_name1'),
      variation_code: btoa('variation_code1'),
      action_name: btoa('action_name1'),
      action_type: btoa('action_type1'),
    },
    {
      customization_name: btoa('customization_name2'),
      customization_code: btoa('customization_code2'),
      variation_name: btoa('variation_name2'),
      variation_code: btoa('variation_code2'),
      action_name: btoa('action_name2'),
      action_type: btoa('action_type2'),
    },
  ],
  segments: [btoa('segment1'), btoa('segment2')],
};

const personalizationContextBase64 = btoa(
  JSON.stringify(personalizationContext)
);

const mockContentPage: Page = {
  type: PageType.CONTENT_PAGE,
  template: 'CartPageTemplate',
  title: 'Shopping Cart',
  slots: {
    PlaceholderContentSlot: {
      components: [
        {
          uid: 'PersonalizationScriptComponent',
          properties: {
            script: {
              data: personalizationContextBase64,
            },
          },
        },
      ],
    },
  },
};

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockContentPage);
  }
}

describe('PersonalizationContextService', () => {
  let service: PersonalizationContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonalizationContextService,
        { provide: PersonalizationConfig, useValue: mockPersonalizationConfig },
        { provide: CmsService, useClass: MockCmsService },
      ],
    });

    service = TestBed.inject(PersonalizationContextService);
  });

  it('should return personalization context if PersonalizationScriptComponent exists', () => {
    let result: PersonalizationContext;
    service
      .getPersonalizationContext()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();

    expect(result.segments[0]).toEqual('segment1');
    expect(result.segments[1]).toEqual('segment2');
    expect(result.actions[0].customization_code).toEqual('customization_code1');
    expect(result.actions[1].customization_code).toEqual('customization_code2');
    expect(result.actions[0].variation_name).toEqual('variation_name1');
    expect(result.actions[0].variation_code).toEqual('variation_code1');
    expect(result.actions[0].action_name).toEqual('action_name1');
    expect(result.actions[0].action_type).toEqual('action_type1');
  });
});
