import { Injectable } from '@angular/core';
import { AuthService, Translatable } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
  AuthorType,
  ChatBotEvent,
  ChatBotMessage,
  ChatBotOption,
  MessageStatus,
} from '../model';
import { ChatBotCategoryService } from './chat-bot-category.service';
import { ChatBotFacetService } from './chat-bot-facet.service';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  constructor(
    protected chatBotCategoryService: ChatBotCategoryService,
    protected chatBotFacetService: ChatBotFacetService,
    protected userAccount: UserAccountFacade,
    protected auth: AuthService
  ) {
    this.sayHello();
  }

  conversation$ = new BehaviorSubject<ChatBotMessage[]>([]);
  options$ = new BehaviorSubject<ChatBotOption[]>([]);
  events$ = new BehaviorSubject<ChatBotEvent>(ChatBotEvent.INIT);

  chosenCategory: string;
  protected user$ = this.auth.isUserLoggedIn().pipe(
    switchMap((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        return this.userAccount.get().pipe(filter((user) => !!user));
      } else {
        return of(undefined);
      }
    }),
    take(1)
  );

  protected addMessage(message: Partial<ChatBotMessage>) {
    const currentMessages = this.conversation$.getValue();

    if (message.author === AuthorType.CUSTOMER) {
      this.conversation$.next([
        ...currentMessages,
        { ...message, status: MessageStatus.SENT } as ChatBotMessage,
      ]);
    } else {
      const newMessage = {
        ...message,
        status: MessageStatus.QUEUED,
      } as ChatBotMessage;
      this.conversation$.next([...currentMessages, newMessage]);
      console.log('add by bot', currentMessages, newMessage);
    }
    this.events$.next(ChatBotEvent.NEW_MESSAGE);
  }

  updateMessageStatuses() {
    const messages = this.conversation$.getValue();
    const foundWritingMessage = messages.find(
      (message) => message.status === MessageStatus.WRITING
    );
    const foundQueuedMessage = messages.find(
      (message) => message.status === MessageStatus.QUEUED
    );

    console.log(
      'updateMessageStatuses',
      foundWritingMessage,
      foundQueuedMessage,
      messages
    );
    if (foundWritingMessage || foundQueuedMessage) {
      this.conversation$.next([
        ...messages.map((message) => {
          if (message === foundWritingMessage) {
            message.status = MessageStatus.SENT;
          }
          if (message === foundQueuedMessage) {
            message.status = MessageStatus.WRITING;
          }
          return message;
        }),
      ]);
    }
    this.events$.next(ChatBotEvent.UPDATE_MESSAGE_STATUS);
  }

  protected showOptions(options: ChatBotOption[]) {
    this.options$.next(options);
  }

  protected sayHello() {
    this.user$.subscribe((user: User) => {
      this.addMessage({
        author: AuthorType.BOT,
        text: { key: 'chatBot.hello', params: user },
      });
      this.addMessage({
        author: AuthorType.BOT,
        text: { key: 'chatBot.introduction' },
      });
      this.showCategories();
    });
  }

  protected showCategories() {
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
          return categories.map((category) => ({
            text: { raw: category.title },
            callback: () => this.chooseCategory(category),
          }));
        })
      )
      .subscribe((categories) => {
        const options: ChatBotOption[] = [...categories];
        if (this.chosenCategory) {
          options.push({
            text: { key: 'chatBot.cancel' },
            callback: () => this.cancel(),
          });
        }
        this.showOptions(options);
      });
  }

  protected chooseCategory(category) {
    this.chosenCategory = this.chatBotCategoryService.getCategoryCode(category);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        raw: category.title,
      },
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: {
        key: 'chatBot.chosenCategory',
        params: { category: category.title },
      },
    });

    this.chatBotFacetService.clearFacets();
    this.chatBotCategoryService.selectCategory(category);

    this.showFacets();
  }

  protected showFacets() {
    this.appliedFacets
      .pipe(
        switchMap((appliedFacets) => {
          if (appliedFacets.length === 0) {
            this.addMessage({
              author: AuthorType.BOT,
              text: { key: 'chatBot.chooseFacet' },
            });
          } else {
            this.addMessage({
              author: AuthorType.BOT,
              text: { key: 'chatBot.whatNext' },
            });
          }
          return this.availableFacets.pipe(
            tap((availableFacets) => {
              const options: ChatBotOption[] = [];
              if (availableFacets?.length > 0) {
                options.push(...availableFacets);
              }
              options.push({
                text: { key: 'chatBot.changeCategory' },
                callback: () => this.changeCategory(),
              });
              if (appliedFacets.length > 0) {
                options.push({
                  text: { key: 'chatBot.removeFacet' },
                  callback: () => this.showAppliedFacets(),
                });
              }
              options.push({
                text: { key: 'chatBot.displayResults' },
                callback: () => this.displayResults(),
              });
              this.showOptions(options);
            })
          );
        })
      )
      .subscribe();
  }

  protected changeCategory() {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.changeCategory' },
    });
    this.showCategories();
  }

  protected showFacetOptions(facet) {
    this.showOptions([
      ...this.chatBotFacetService.getFacetOptions(facet)?.map((value) => {
        return {
          text: { raw: value.name },
          callback: () => {
            this.chatBotFacetService.addFacet(value);
            this.chooseFacetOption(value);
          },
        };
      }),
      {
        text: { key: 'chatBot.cancel' },
        callback: () => this.cancel(),
      },
    ]);
  }

  protected cancel() {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        key: 'chatBot.cancel',
      },
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: {
        key: 'chatBot.okNoProblem',
      },
    });
    this.showFacets();
  }

  protected chooseFacet(text: Translatable, facet: any) {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text,
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.chosenFacet', params: { facet: text.raw } },
    });
    this.showFacetOptions(facet);
  }

  protected get appliedFacets() {
    return this.chatBotFacetService.selected$.pipe(
      take(1),
      map((facets) => {
        return facets?.map((facet) => {
          return {
            text: { raw: facet.name },
            callback: () => this.removeFacet(facet),
          };
        });
      })
    );
  }

  protected get availableFacets() {
    return this.chatBotFacetService.facets$.pipe(
      map((results) => {
        return results.facets?.map((facet) => {
          return {
            text: { key: 'chatBot.facet', params: { facet: facet.name } },
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
    );
  }

  protected showAppliedFacets() {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.removeFacet', params: {} },
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.whichOne', params: {} },
    });
    this.appliedFacets.subscribe((appliedFacets) => {
      this.showOptions([
        ...appliedFacets,
        {
          text: { key: 'chatBot.cancel' },
          callback: () => this.cancel(),
        },
      ]);
    });
  }

  protected chooseFacetOption(facetOption?) {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        raw: facetOption.name,
      },
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: {
        key: 'chatBot.chosenFacetOption',
        params: { option: facetOption.name },
      },
    });
    this.showFacets();
  }

  protected removeFacet(facet) {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { raw: facet.name },
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.removedFacet', params: { facet: facet.name } },
    });
    this.chatBotFacetService.removeFacet(facet);
    this.showFacets();
  }

  protected displayResults() {
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.displayResults' },
    });
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.ok' },
    });
    this.user$.subscribe((user: User) => {
      this.addMessage({
        author: AuthorType.BOT,
        text: { key: 'chatBot.bye', params: user },
      });
    });

    // this.buildQuery();

    this.events$.next(ChatBotEvent.DISPLAY_RECOMMENDATIONS);
  }

  // protected buildQuery() {
  //   const url = this.chosenCategory;
  //   console.log('buildQuery', url);
  // }
}
