import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorType, ChatBotMessage, ChatBotOption } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService implements OnInit {
  constructor() {
    this.sayHello();
    this.showCategories();
  }

  conversation$ = new BehaviorSubject<ChatBotMessage[]>([]);
  options$ = new BehaviorSubject<ChatBotOption[]>([]);

  ngOnInit() {}

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
        text: { key: 'chatBot.removeFacets' },
        callback: (param) => this.removeFacets(param),
      },
      {
        text: { key: 'chatBot.backToCategory' },
        callback: (param) => this.showCategories(param),
      },
      {
        text: { key: 'chatBot.displayResults' },
        callback: (param) => this.displayResults(param),
      },
    ]);
  }

  protected chooseFacet(facet: string) {
    console.log('facet', facet);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.chosenFacet', params: { facet } },
    });
    this.showFacets();
  }

  protected get availableCategories() {
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
    return undefined;
  }

  protected get appliedFacets() {
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
    return [
      {
        text: { key: 'chatBot.facet.1' },
        callback: (param) => this.chooseFacet(param),
      },
      {
        text: { key: 'chatBot.facet.2' },
        callback: (param) => this.chooseFacet(param),
      },
    ];
  }

  protected removeFacets(param?) {
    console.log('removeFacets', param);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.removeFacets' },
    });
    this.showOptions([
      ...this.availableFacets,
      {
        text: { key: 'chatBot.cancel' },
        callback: (param) => this.showFacets(param),
      },
    ]);
  }

  protected removeFacet(param?) {
    console.log('removeFacet', param);
  }

  protected displayResults(param?) {
    console.log('displayResults', param);
  }
}
