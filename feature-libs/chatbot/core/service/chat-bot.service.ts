import { Injectable } from '@angular/core';
import { AuthService, Translatable } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, of, timer } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
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
        status: MessageStatus.WRITING,
      } as ChatBotMessage;
      const isLastMessageWriting = currentMessages.find(
        (message) => message.status === MessageStatus.WRITING
      );
      console.log('timer0', currentMessages, newMessage, isLastMessageWriting);

      if (!isLastMessageWriting) {
        this.conversation$.next([...this.conversation$.getValue(), newMessage]);
        timer(3000)
          .pipe(
            take(1),
            tap(() => {
              console.log('timer sync', isLastMessageWriting);
              this.updateMessageStatus(newMessage);
            })
          )
          .subscribe();
      } else {
        timer(3000)
          .pipe(
            take(1),
            tap(() => {
              this.conversation$.next([
                ...this.conversation$.getValue(),
                newMessage,
              ]);
            }),
            delay(3000),
            tap(() => {
              console.log('timer2', isLastMessageWriting);
              this.updateMessageStatus(newMessage);
            })
          )
          .subscribe();
      }
    }
  }

  updateMessageStatus(newMessage: ChatBotMessage) {
    const currentMessages = this.conversation$.getValue();
    this.conversation$.next([
      ...currentMessages.map((message) => {
        if (message === newMessage) {
          message.status = MessageStatus.SENT;
        }
        return message;
      }),
    ]);
  }

  protected showOptions(options: ChatBotOption[]) {
    this.options$.next(options);
  }

  protected sayHello() {
    this.user$.subscribe((user: User) => {
      console.log('hello', user);
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
            callback: (param) => this.cancel(param),
          });
        }
        this.showOptions(options);
      });
  }

  protected chooseCategory(category) {
    console.log('chosenCategory', category);
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

  protected showFacets(param?) {
    console.log('show facets', param);
    this.appliedFacets
      .pipe(
        // take(1),
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
              console.log('availableFacets', availableFacets);
              if (availableFacets?.length > 0) {
                options.push(...availableFacets);
              }
              options.push({
                text: { key: 'chatBot.changeCategory' },
                callback: (param) => this.changeCategory(param),
              });
              if (appliedFacets.length > 0) {
                options.push({
                  text: { key: 'chatBot.removeFacet' },
                  callback: (param) => this.showAppliedFacets(param),
                });
              }
              options.push({
                text: { key: 'chatBot.displayResults' },
                callback: (param) => this.displayResults(param),
              });
              this.showOptions(options);
            })
          );
        })
      )
      .subscribe();
  }

  protected changeCategory(param) {
    console.log('changeCategory');
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.changeCategory' },
    });
    this.showCategories(param);
  }

  protected showFacetOptions(facet) {
    console.log('showFacetOptions', facet);
    // this.addMessage({
    //   author: AuthorType.BOT,
    //   text: { key: 'chatBot.chooseFacetOption' },
    // });
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
        callback: (param) => this.cancel(param),
      },
    ]);
  }

  protected cancel(param?) {
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
    this.showFacets(param);
  }

  protected chooseFacet(text: Translatable, facet: any) {
    console.log('chooseFacet', text);
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
        console.log('appliedFacets', facets);
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

  protected showAppliedFacets(param?) {
    console.log('showAppliedFacets', param);
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
          callback: (param) => this.cancel(param),
        },
      ]);
    });
  }

  protected chooseFacetOption(facetOption?) {
    console.log('chooseFacetOption', facetOption);
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
    console.log('removeFacet', facet);
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

  protected displayResults(param?) {
    console.log('displayResults', param);
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

    this.buildQuery();

    this.events$.next(ChatBotEvent.DISPLAY_RECOMMENDATIONS);
  }

  protected buildQuery() {
    const url = this.chosenCategory;
    console.log('buildQuery', url);
  }
}
