import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { ChatBotCategoryService } from './chat-bot-category.service';
import { ChatBotFacetService } from './chat-bot-facet.service';
import { BehaviorSubject } from 'rxjs';
import { AuthorType, ChatBotMessage, ChatBotOption } from '../model';
import { Translatable } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  constructor(
    protected chatBotCategoryService: ChatBotCategoryService,
    protected chatBotFacetService: ChatBotFacetService
  ) {
    this.sayHello();
    this.showCategories();
  }

  conversation$ = new BehaviorSubject<ChatBotMessage[]>([]);
  options$ = new BehaviorSubject<ChatBotOption[]>([]);
  chosenCategory: string;

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

    this.chatBotCategoryService.categories$
      .pipe(
        take(1),
        map((categories) => {
          console.log(categories);
          return categories.map((category) => ({
            text: { raw: category.title },
            callback: () => this.chooseCategory(category),
          }));
        }),
        tap(console.log)
      )
      .subscribe((categories) => {
        const options = [...categories];
        if (this.chosenCategory) {
          options.push({
            text: { key: 'chatBot.cancel' },
            callback: (param) => {
              this.addMessage({
                author: AuthorType.CUSTOMER,
                text: {
                  key: 'chatBot.cancel',
                },
              });
              this.showFacets(param);
            },
          });
        }
        this.showOptions(options);
      });
  }

  protected chooseCategory(category) {
    console.log('chosenCategory', category);
    this.chosenCategory = this.getCategoryCode(category);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        key: 'chatBot.chosenCategory',
        params: { category: category.raw },
      },
    });

    this.showFacets();
  }

  protected getCategoryCode(category) {
    return category?.url?.split('/c/')?.[1];
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
        text: { key: 'chatBot.changeCategory' },
        callback: (param) => this.changeCategory(param),
      },
      {
        text: { key: 'chatBot.displayResults' },
        callback: (param) => this.displayResults(param),
      },
    ]);
  }

  protected changeCategory(param) {
    console.log('changeCategory');
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.changeCategory' },
    });
    this.showCategories(param);
  }

  protected showFacetOptions(param?) {
    console.log('showFacetOptions', param);
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.chooseFacetOption' },
    });
    this.showOptions([
      ...this.chatBotFacetService.getFacetOptions(param).map((value) => {
        return {
          text: { raw: value.name },
          callback: () => {
            this.chatBotFacetService.addFacet(value);
            this.chooseFacetOption(value.name);
          },
        };
      }),
      {
        text: { key: 'chatBot.cancel' },
        callback: (param) => this.cancelChoosingFacetOptions(param),
      },
    ]);
  }

  protected cancelChoosingFacetOptions(param?) {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        key: 'chatBot.cancel',
      },
    });
    this.showFacets(param);
  }

  protected chooseFacet(text: Translatable, facet: any) {
    console.log('chooseFacet', text);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.chosenFacet', params: { text: text.key } },
    });
    this.showFacetOptions(facet);
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
    this.chatBotFacetService.facets$.subscribe((facets) => console.log(facets));

    let options = [];
    this.chatBotFacetService.facets$
      .pipe(
        take(1),
        map((results) => {
          return results.facets?.map((facet) => {
            return {
              text: { raw: facet.name },
              callback: () =>
                this.chooseFacet(
                  {
                    raw: facet?.name,
                  },
                  facet
                ),
            };
          });
        })
      )
      .subscribe((chats) => {
        options = chats;
      });

    return options;
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
        callback: (param) => this.cancelChoosingFacetOptions(param),
      },
    ]);
  }

  protected chooseFacetOption(facetOption?: Translatable) {
    console.log('chooseFacetOption', facetOption);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        key: 'chatBot.chosenFacetOption',
        params: { option: facetOption.key },
      },
    });
    this.showFacets();
  }

  protected removeFacet(facet?: Translatable) {
    console.log('removeFacet', facet);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.removedFacet', params: { facet: facet.key } },
    });
    // TOD: remove facet
    this.showFacets();
  }

  protected displayResults(param?) {
    console.log('displayResults', param);
    // TOD: display results
  }
}
