import { Injectable } from '@angular/core';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ChatBotCategoryService } from './chat-bot-category.service';
import { ChatBotFacetService } from './chat-bot-facet.service';
import { BehaviorSubject, of } from 'rxjs';
import { AuthorType, ChatBotMessage, ChatBotOption } from '../model';
import { AuthService, Translatable } from '@spartacus/core';
import { UserAccountFacade, User } from '@spartacus/user/account/root';

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

  protected addMessage(message: ChatBotMessage) {
    this.conversation$.next([...this.conversation$.getValue(), message]);
  }

  protected showOptions(options: ChatBotOption[]) {
    this.options$.next(options);
  }

  protected sayHello() {
    this.user$.subscribe((user: User) => {
      console.log('hello', user);
      this.addMessage({
        author: AuthorType.BOT,
        text: { key: 'chatBot.hello', params: { name: user?.firstName } },
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
    this.chosenCategory = this.chatBotCategoryService.getCategoryCode(category);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: {
        key: 'chatBot.chosenCategory',
        params: { category: category.title },
      },
    });

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
    this.addMessage({
      author: AuthorType.BOT,
      text: { key: 'chatBot.chooseFacetOption' },
    });
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
    );
  }

  protected showAppliedFacets(param?) {
    console.log('showAppliedFacets', param);
    this.addMessage({
      author: AuthorType.CUSTOMER,
      text: { key: 'chatBot.removeFacet', params: {} },
    });
    this.appliedFacets.subscribe((appliedFacets) => {
      this.showOptions([
        ...appliedFacets,
        {
          text: { key: 'chatBot.cancel' },
          callback: (param) => this.cancelChoosingFacetOptions(param),
        },
      ]);
    });
  }

  protected chooseFacetOption(facetOption?) {
    console.log('chooseFacetOption', facetOption);
    this.addMessage({
      author: AuthorType.CUSTOMER,
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
    this.buildQuery();
  }

  protected buildQuery() {
    const url = this.chosenCategory;
    console.log('buildQuery', url);
  }
}
