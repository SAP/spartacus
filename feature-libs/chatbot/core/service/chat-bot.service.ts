import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorType, ChatBotMessage, ChatBotOption } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  constructor() {
    this.sayHello();
    this.showCategories();
  }

  conversation$ = new BehaviorSubject<ChatBotMessage[]>([]);
  options$ = new BehaviorSubject<ChatBotOption[]>([]);

  protected addMessage(message: ChatBotMessage) {
    this.conversation$.next([...this.conversation$.getValue(), message]);
  }

  protected showOptions(options: ChatBotOption[]) {
    this.options$.next(options);
  }

  protected sayHello() {
    console.log('hello');
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.hello', params: { name: 'Andrzej' } },
    });
  }

  protected showCategories(param?) {
    console.log('showCategories', param);
    this.addMessage({
      author: AuthorType.BOT,
      text: {
        key: 'chatBot.chooseCategory',
      },
    });

    const options = [...this.availableCategories];
    if (this.chosenCategory) {
      options.push({
        text: { key: 'chatBot.cancel' },
        callback: (param) => this.showFacets(param),
      });
    }
    this.showOptions(options);
  }

  protected chooseCategory(category: string) {
    console.log('category', category);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.chosenCategory', params: { category } },
    });
    this.showFacets();
  }

  protected showFacets(param?) {
    console.log('show facets', param);
    if (this.appliedFacets.length === 0) {
      this.addMessage({
        author: AuthorType.BOT,
        text: { key: 'chatBot.chooseFacets' },
      });
    } else {
      this.addMessage({
        author: AuthorType.BOT,
        text: { key: 'chatBot.whatNext' },
      });
    }
    this.showOptions([
      ...this.availableFacets,
      {
        text: { key: 'chatBot.removeFacet' },
        callback: (param) => this.showAppliedFacets(param),
      },
      {
        text: { key: 'chatBot.backToCategories' },
        callback: (param) => this.showCategories(param),
      },
      {
        text: { key: 'chatBot.displayResults' },
        callback: (param) => this.displayResults(param),
      },
    ]);
  }

  protected showFacetOptions(param?) {
    console.log('showFacetOptions', param);
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.chooseFacetOption' },
    });
    this.showOptions([
      ...this.availableFacetOptions,
      {
        text: { key: 'chatBot.cancel' },
        callback: (param) => this.showFacets(param),
      },
    ]);
  }

  protected chooseFacet(facet: string) {
    console.log('facet', facet);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.chosenFacet', params: { facet } },
    });
    this.showFacetOptions();
  }

  protected get availableCategories() {
    // TODO: get categories from API
    return [
      {
        text: { key: 'chatBot.category.1' },
        callback: (param) => this.chooseCategory(param),
      },
      {
        text: { key: 'chatBot.category.2' },
        callback: (param) => this.chooseCategory(param),
      },
    ];
  }

  protected get chosenCategory() {
    // TODO: return chosen category
    return undefined;
  }

  protected get appliedFacets() {
    // TODO: get applied facets from backend
    return [
      {
        text: { key: 'chatBot.facet.1' },
        callback: (param) => this.removeFacet(param),
      },
      {
        text: { key: 'chatBot.facet.2' },
        callback: (param) => this.removeFacet(param),
      },
    ];
  }

  protected get availableFacets() {
    // TODO: get available facets from backend
    return [
      {
        text: { key: 'chatBot.facet.price' },
        callback: (param) => this.chooseFacet(param),
      },
      {
        text: { key: 'chatBot.facet.size' },
        callback: (param) => this.chooseFacet(param),
      },
    ];
  }
  protected get availableFacetOptions() {
    // TODO: get available facet options from backend
    return [
      {
        text: { key: 'chatBot.facet.price.1' },
        callback: (param) => this.chooseFacetOption(param),
      },
      {
        text: { key: 'chatBot.facet.price.1' },
        callback: (param) => this.chooseFacetOption(param),
      },
    ];
  }

  protected showAppliedFacets(param?) {
    console.log('showAppliedFacets', param);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.removeFacet', params: {} },
    });
    this.showOptions([
      ...this.appliedFacets,
      {
        text: { key: 'chatBot.cancel' },
        callback: (param) => this.showFacets(param),
      },
    ]);
  }

  protected chooseFacetOption(param?) {
    console.log('chooseFacetOption', param);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.chosenFacetOption', params: { option: '' } },
    });
    this.showFacets();
  }

  protected removeFacet(param?) {
    console.log('removeFacet', param);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.removedFacet', params: {} },
    });
    // TOD: remove facet
    this.showFacets();
  }

  protected displayResults(param?) {
    console.log('displayResults', param);
    // TOD: display results
  }
}
