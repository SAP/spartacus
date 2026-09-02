<!-- cspell:ignore flextype -->
# How the Spartacus Storefront Integrates with a CMS — Explainer Brief

> **Purpose of this document**
> This is a **content + design brief** to be handed to a Claude design agent to generate a presentation. The presentation is a **neutral, educational explainer** of how our Spartacus-based storefront integrates with a CMS. It can be used as onboarding/learning material for new teammates, an architecture refresher, or a general technical overview.
>
> It contains two things:
> 1. **The substance** — a technically accurate, but accessible, explanation of how the storefront and CMS fit together.
> 2. **Presentation guidance** — how to structure, phrase, and visualize it.
>
> **Scope & tone rules (important):**
> - This is **descriptive, not a decision document.** Do **not** name any CMS products or vendors, and do **not** frame anything around "switching," "migrating," "choosing a vendor," or cost/risk of change.
> - The fact that the architecture is **CMS-agnostic** is a genuine design property worth teaching — present it as *"here is how the design achieves separation of concerns,"* not *"here is why replacing the CMS is easy."*
> - Audience is **mixed technical literacy** (new engineers, but possibly also PMs/QA). Explain concepts from first principles; use analogies; keep jargon optional.
>
> **The single idea the presentation should make click:**
> *The storefront doesn't hard-code pages. The CMS describes a page as **slots filled with typed components**, and the storefront turns that description into a live UI through a **configurable mapping** and a **layered pipeline** — each layer with one clear job.*

---

## Part 1 — Audience & Framing

### Who it's for
- Primarily **new teammates** learning the architecture; secondarily anyone who wants a mental model of the CMS integration.
- Assume Angular familiarity is *helpful but not required*. Lead with concepts; keep framework specifics as supporting detail.

### The core analogy to use throughout
Frame the CMS + storefront like a **theater production**:
- The **CMS** is the **script and stage directions** — it says *what scenes exist* and *what goes where* ("a banner here, a product carousel there").
- The **storefront** is the **cast, set, and crew** — it knows *how* to actually perform each role and render it on stage.
- A **casting sheet** (the component mapping) connects each named role in the script to the actor who plays it.

The power of this separation: the script can change scenes without re-training the cast, and the cast can rehearse new interpretations without rewriting the script.

### Tone
- Curious, explanatory, "here's how it works and why it's built this way."
- Every mechanism should answer *"why does the architecture bother doing it this way?"* — usually the answer is **separation of concerns**, **reuse**, or **performance**.

---

## Part 2 — The Substance (what the presentation must explain)

### 2.1 What a CMS provides to the storefront

Spartacus is a **headless storefront**: the CMS does **not** send finished HTML pages. Instead, the CMS answers two questions:

1. **"What is the structure of this page?"** → a **Page** made of **Slots** (named regions like *header*, *footer*, *main content*), where each slot holds an ordered list of **Components** (a banner, a paragraph, a navigation menu, a product carousel).
2. **"What is inside a specific component?"** → the **content data** for one component (e.g., a banner's image, headline, and link).

Everything the CMS returns is understood through three concepts:

| Concept | Plain-English meaning | Example |
|---|---|---|
| **Page** | A blueprint: its type, its template, and which slots it has | Homepage — type "ContentPage", template "LandingPageTemplate" |
| **Slot** | A named region that holds components | "header", "footer", "main-banner-area" |
| **Component** | One piece of content, labeled with a **type code** | A "BannerComponent" with an image + headline |

The **type code** is the critical hinge: the CMS says *"put a BannerComponent here,"* and the storefront has a **mapping** that says *"a BannerComponent is rendered by this Angular UI component."* The CMS never needs to know how the UI is built; the UI never needs to know how the CMS stores content.

> **Design note:** Draw this as three nested boxes — Page ⊃ Slots ⊃ Components. This is the mental model for the whole talk; reuse the shape on later slides.

---

### 2.2 The data contract (the shared "shape")

The storefront and CMS agree on a **normalized data shape**. Everything downstream depends only on this shape, not on how any particular CMS produces it. Simplified:

```
Page
 ├─ pageId          "homepage"
 ├─ type            "ContentPage" | "ProductPage" | "CategoryPage"
 ├─ title           (used for the browser tab + SEO)
 ├─ template        "LandingPageTemplate"   (which layout to use)
 ├─ robots          INDEX / NOINDEX ...      (SEO instructions)
 └─ slots
      ├─ "header"   → [ components... ]
      ├─ "footer"   → [ components... ]
      └─ "main"     → [ component: { uid, typeCode, properties } ]

Component
 ├─ uid             "banner-001"          (unique instance id)
 ├─ typeCode        "BannerComponent"     (WHAT KIND of component)
 └─ properties      { headline, media, link, ... }  (the actual content)
```

**Why this matters (teaching point):** this is a generic *"pages made of slots made of typed components"* model. Because the rest of the storefront speaks only this shape, the code that talks to the CMS is isolated to one place (the adapter, §2.3). This is the concrete meaning of "the storefront is CMS-agnostic": the agnosticism is a *result* of committing to a stable internal contract.

> **Design note:** Present the contract as a labeled shape/diagram, not raw code. Highlight the two questions from §2.1 mapping onto the two boxes (Page structure vs. Component data).

---

### 2.3 The layered architecture (each layer, one job)

The storefront is layered so that **all CMS-specific knowledge is concentrated in one thin layer at the bottom**, and every layer above it works purely with the normalized contract.

From bottom (talks to the CMS) to top (never talks to the CMS):

1. **Adapter layer — *"the translator"***
   - Knows the CMS's actual API endpoints and response format, and its **normalizer** converts raw CMS responses into the standard contract from §2.2.
   - This is the **only** layer that knows what the CMS actually looks like.

2. **Connector layer — *"the coordinator"***
   - Decides whether to fetch from the backend or from local static configuration; talks to the adapter through an interface.

3. **Store / state layer — *"the memory"***
   - Caches pages and components in memory, batches and de-duplicates requests so the same data isn't fetched twice.

4. **CMS service (facade) — *"the front desk"***
   - The single, clean API the rest of the app uses: *"give me the current page," "give me this component's data."*

5. **Rendering + configuration layer — *"the display engine"***
   - The type-code → component mapping, the page/slot/component rendering pipeline, guards, lazy loading, and the "outlet" customization system.

6. **SEO / page-metadata layer — *"the SEO engine"***
   - Turns the normalized page into `<title>`, meta description, canonical URL, robots tags, and breadcrumbs.

> **Design note — hero slide:** A vertical stack of the 6 layers. Visually distinguish the **bottom adapter layer** ("the only CMS-aware layer") from everything above it ("works purely with the normalized contract"). The teaching message is *separation of concerns*, not change-cost.

---

### 2.4 How a page renders (the end-to-end journey)

Tell this as a **narrative of a single request** — "what happens when someone opens the homepage." ~6 beats.

1. **URL → page identity.** A URL arrives. The storefront derives a normalized **page context** (an id + a type, e.g. "homepage / ContentPage"). How this works differs by page type — see §2.8. In short: product/category URLs yield a **code**, content URLs use the **whole path** as the id.
2. **Guard + fetch.** Before showing the page, a **route guard** asks the CMS service for the page. If it isn't cached, a request goes out through the adapter. If the page doesn't exist, the storefront shows the configured **"not found"** page.
3. **Normalize + store.** The CMS response is translated into the standard contract and cached. The page's components are batch-loaded in one efficient request.
4. **Resolve the layout.** The page's **template** name selects a layout, which defines which **slots** appear and in what arrangement (including responsive differences).
5. **Render each component.** For every component in every slot, the storefront looks up its **type code** in the mapping, finds the matching Angular UI component, and instantiates it — loading extra feature code on demand ("lazy loading") when needed.
6. **Feed data in + finish SEO.** Each UI component receives a **live stream of its own content data**, staying decoupled from where that data came from. In parallel, the SEO engine sets the page title, description, canonical URL, and robots tags.

> **Design note:** A horizontal 6-step timeline / swim lane. Note which steps talk to the CMS (2–3) vs. which are pure storefront (4–6) — as a teaching point about where the boundary sits.

---

### 2.5 Two mechanisms that make the integration flexible

These two mechanisms are *why* the storefront stays decoupled and customizable. Each deserves its own slide.

**A) The type-code → component mapping (configuration, not code)**
- A configuration object maps each CMS component type to a UI component.
- Because it's configuration, the team can:
  - Point a content type at a *different* UI component.
  - Attach **access rules** ("only logged-in users see this").
  - **Lazy-load** heavy features only when a page actually uses them.
  - Provide **fallback/static content** so a component can render even without a backend call.
- Conceptually:
  ```
  BannerComponent      → <banner UI>
  ProductCarousel...   → <carousel UI>   (loaded only when needed)
  NavigationComponent  → <nav UI>
  ```
- **Teaching takeaway:** the link between "content types" and "how they look" is a settings table, not hard-coded logic.

**B) The "outlet" customization system (extend the UI without touching the CMS)**
- The storefront can inject content **before**, **after**, or **in place of** any CMS-driven component — purely in the frontend.
- So UI/UX customizations don't require CMS changes, and content changes don't require UI changes.
- **Teaching takeaway:** the UI layer and the content layer can evolve independently — a clean example of decoupling.

---

### 2.6 The "no backend required" capability

The storefront can define pages, slots, and components **entirely in frontend configuration** (via an `ignoreBackend` option), and can **mix** backend-driven and config-driven content on the same page.

Why it's useful (teaching point):
- **Local development / testing** without a live CMS.
- **Fallback** rendering if a CMS call fails.
- Building or demoing UI **before** the corresponding content exists.

> **Design note:** Frame as "the storefront can stand on its own configuration" — a demonstration of how loosely it's coupled to the backend.

---

### 2.7 The relationships in detail (Page → Template → Slot → Outlet → Component)

> This is the technically deep section. The design agent should **pull the two diagrams (§2.7.1 and §2.7.2) forward** into the main flow, and keep the rest as appendix/backup so the main deck stays one-idea-per-slide.

#### 2.7.1 How a Template chooses its Slots (Template → Slots)

A page carries a **template name** (e.g., `LandingPage2Template`). That name is a **lookup key** into a frontend `layoutSlots` configuration that declares **which slots appear and in what order** — and it can differ **per screen size** (breakpoints `xs`/`sm`/`md`/`lg`).

Two inputs combine to produce the final slot list:
- **The frontend `layoutSlots` config** decides the *order* and *responsive arrangement*.
- **The CMS page data** decides which slots *actually have content*.
- Rendered list = **config order, filtered to the slots the page actually contains.** (No config entry → fall back to the CMS's slot order.)

Config shape (simplified):
```
layoutSlots:
  header:                       # a "section" (shared across all pages)
    lg: { slots: [PreHeader, SiteLogo, SearchBox, SiteLogin, MiniCart, NavigationBar] }
    slots: [PreHeader, SiteLogo, SearchBox, MiniCart]          # default / mobile
  LandingPage2Template:         # a page template
    pageFold: Section2B         # last slot considered "above the fold"
    slots: [Section1, Section2A, Section2B, Section3, Section4, Section5]
  ProductDetailsPageTemplate:
    lg: { pageFold: UpSelling }
    pageFold: Summary
    slots: [Summary, UpSelling, CrossSelling, Tabs]
```

Two concepts to name explicitly:
- **Sections** — `header`, `footer`, and `navigation` are *shared* slot groups reused across every page, resolved independently of the page template; the **main content** area is resolved from the template. This is why header/footer stay consistent site-wide while the middle changes per page.
- **Responsive slotting** — the *same* page can arrange slots differently on mobile vs. desktop, decided entirely in frontend config.

> **Design note (pull-forward diagram):** Template box → arrow to an ordered list of slot chips → caption "order from frontend config, presence from the CMS." Small phone/desktop icons for the responsive difference.

#### 2.7.2 The three-level Outlet naming rule (Slot ↔ Outlet ↔ Component)

This is the most important mechanical relationship. The storefront renders in **three nested levels**, and **each level is an "outlet" whose name is predictable**:

| Level | Outlet name is… | Example | What it lets you extend |
|---|---|---|---|
| **Template** | the template name | `LandingPage2Template` | wrap/replace the whole page layout |
| **Slot** | the slot position | `Section1`, `MiniCart` | insert content before/after/replace an entire region |
| **Component** | the component's resolved type (`flexType`) | `BannerComponent` | insert content before/after/replace one component *type* |

Because outlet names are **always** derived deterministically (template name → slot position → component type), **every** template, slot, and component type is an extension point that can be hooked from the frontend with three positions — **before**, **after**, or **replace** — without any CMS change.

> **Design note (pull-forward diagram):** Three concentric frames — outer "Template outlet," middle "Slot outlet," inner "Component outlet" — each with small before/after/replace tabs. Teaching takeaway: *the UI exposes a consistent set of extension hooks at every level, independent of the content source.*

#### 2.7.3 Component *types* — typeCode vs flexType

The CMS labels each component with a **`typeCode`**. The storefront resolves it into a **`flexType`** — the name it actually renders and hooks against. Three cases:

1. **Normal component** — `flexType` = `typeCode` (e.g., `BannerComponent`). The common case.
2. **Flex component** — a generic wrapper type where the *real* type lives in a separate field, used as the `flexType`. Lets new component variants be introduced without changing the base type code.
3. **Include (legacy)** — a backwards-compatibility case where the component's unique id becomes the `flexType`.

**Teaching point:** the connection between CMS content and UI passes through a small **normalization step** (in the adapter layer). That's the well-defined seam where any component naming is reconciled to the type codes the UI expects.

#### 2.7.4 Container components and inner components (nesting)

Some components are **containers** that declare a list of **inner** components (classic example: a **tab paragraph container** holding tab panels; or product-detail tab groups). The container carries an ordered list of inner component types, and each inner one is rendered through the **same** component-resolution mechanism, recursively.

**Teaching point:** composition/nesting is a first-class, generic concept — components can contain components, all resolved uniformly.

#### 2.7.5 The full component mapping — everything a type code can carry

The mapping is more than `type → UI component`. Each entry can carry:

| Mapping field | What it does | Why it's useful |
|---|---|---|
| **component** | which UI component renders this type | the core mapping |
| **guards** | access rules run before render (e.g., login required) | access control by config |
| **providers** | scoped services for that component | advanced customization |
| **childRoutes** | URLs a component introduces when present (e.g., checkout sub-steps) | content-driven routing |
| **i18nKeys** | translation bundles the component needs | localization |
| **disableSSR** | skip on the server (client-only widgets) | correctness/performance |
| **deferLoading** | load only when scrolled into view, or force-load | page-speed control |
| **data** | built-in fallback/placeholder content | render without a backend call (see §2.6) |

> **Design note:** A compact "one type code, many capabilities" slide. Teaching takeaway: *access control, localization, routing, and performance behavior are attached to content types declaratively.*

#### 2.7.6 Page-fold & deferred loading (performance)

The `layoutSlots` config marks a **page fold** — the last slot considered "above the fold." Content below it can be **deferred**: it loads only when the user scrolls near it (via an intersection observer), while above-the-fold and server-rendered content loads instantly to avoid flicker. The strategy (`INSTANT` vs `DEFER`) is configurable globally and per component.

**Teaching point:** a pure storefront performance feature, configured in the frontend and independent of the content source.

---

### 2.8 URL resolution & routing — and how it differs by page type

This is a distinct topic from page *structure* (§2.7): here we cover how a **URL becomes a page request**, and why **content pages, product pages, and category pages are handled differently**. It's worth its own slide because the difference surprises people.

#### 2.8.1 Semantic routes — components never hardcode URLs

URLs are **not** written literally in components. The storefront keeps a **routing config** that names each route and lists its URL path(s):

```
routes:
  product:  { paths: ['product/:productCode/:name', 'product/:productCode'] }
  category: { paths: ['category/:categoryCode'] }
  brand:    { paths: ['Brands/:brandName/c/:brandCode'] }
  search:   { paths: ['search/:query'] }
```

Components build links **by route name + params**, e.g. *"link to the `product` route with code ABC123"* — and a **path service** turns that into the actual URL from config. A `cxUrl` pipe / `RouterLink` does this in templates.

**Why it's built this way (teaching point):** the URL scheme lives in **one config**, not scattered across components. Changing `product/:productCode` to `p/:productCode` is a config change; no component that links to products needs editing. This is the same *separation-of-concerns* theme as the component mapping — indirection through configuration.

#### 2.8.2 Two ways a URL becomes a page identity

Every incoming URL is turned into a normalized **page context** (`id` + `type`). There are two fundamentally different paths, and which one applies depends on the URL:

| | **Coded pages** (Product / Category / Brand / Search) | **Content pages** |
|---|---|---|
| How the URL is matched | a **configured route** (+ optional suffix matcher like `.../p/:code`, `.../c/:code`) | a **catch-all** route (`**`) that matches anything not already claimed |
| What identifies the page | a **code** pulled from the URL (`productCode`, `categoryCode`, `brandCode`) | the **entire URL path** becomes the id (the "page label"), e.g. `/about-us/our-story` |
| Resulting page type | `ProductPage` / `CategoryPage` | `ContentPage` |
| How the CMS is asked | fetched **by code**: *"give me the ProductPage for code ABC123"* | fetched **by label**: *"give me the ContentPage labeled /about-us/our-story"* |

Two special cases: the **home page** (empty URL) uses a dedicated home identifier and the CMS returns the default page; and **preview mode** is recognized by a special preview URL.

**The mental model:** *product and category pages are "the CMS page for **this thing** (identified by a code)"; content pages are "the CMS page that **lives at this URL**." Same rendering pipeline afterward — different way of asking for the page.*

> **Design note (diagram):** Two lanes. Top lane: `/product/ABC123` → extract code `ABC123` → ask CMS "ProductPage, code=ABC123". Bottom lane: `/about-us` → whole path is the id → ask CMS "ContentPage, label=/about-us". Both lanes converge into the same "render page" box from §2.4.

#### 2.8.3 Content pages can create routes at runtime

Because content pages are matched by the catch-all route, the storefront can serve **any** URL the CMS defines **without a predefined Angular route**. If the page's components declare **child routes** (e.g., a multi-step flow), the guard **registers those routes at runtime** and re-navigates. Product/category pages don't need this — their routes are predefined in config.

**Why it matters (teaching point):** content authors can publish a page at a brand-new URL and it "just works," with no code deployment — the catch-all + guard resolves it. This is a key reason the content side and the code side stay decoupled.

---

## Part 3 — Recommended presentation structure (slide-by-slide)

Target length: **~12–15 slides** for the core explainer (slides 1–16), plus **2 optional appendix slides** (17–18) for the advanced/forward-looking material. One idea + one visual per slide.

1. **Title** — "How the Storefront Integrates with a CMS."
2. **The one-sentence idea** — "The CMS describes pages as slots filled with typed components; the storefront turns that into a live UI via a configurable mapping and a layered pipeline."
3. **The analogy** — script & stage directions / cast & crew / casting sheet.
4. **What a CMS provides** — Page ⊃ Slots ⊃ Components (nested-boxes diagram) + the two questions (structure vs. content).
5. **The data contract** — the shared shape; everything downstream depends only on this.
6. **The layered architecture (HERO SLIDE)** — the 6 layers, each with one job; the bottom adapter is the only CMS-aware layer.
7. **How a page renders** — the 6-step request journey.
8. **URL → page, two ways** — semantic routes + the coded-page vs. content-page split (from §2.8). Two-lane diagram converging on the render pipeline.
9. **How layout works** — Template → Slots via frontend config (from §2.7.1): order in the storefront, presence from the CMS, responsive arrangement. Pull-forward diagram.
10. **The three-level outlet rule** — Template / Slot / Component as extension points (from §2.7.2). Concentric-frames diagram.
11. **Mechanism 1** — the type-code → component mapping, incl. typeCode→flexType normalization and the "one type code, many capabilities" table (§2.7.3 + §2.7.5).
12. **Mechanism 2** — the outlet system: UI and content evolve independently (reuse slide 10's frame).
13. **Standing on its own** — config-driven pages (`ignoreBackend`) + page-fold/deferred loading as storefront-owned concerns (§2.6 + §2.7.6).
14. **Putting it together** — replay the full render flow end-to-end, tying each step back to its layer.
15. **Glossary / recap** — Page, Slot, Component, type code, template, section, outlet, mapping, semantic route, page label.
16. **Appendix (technical backup)** — component types, container/inner nesting, full mapping-field table, defer/page-fold detail, per-page-type routing detail, and the code anchors from Part 5.
17. **Advanced use cases — supported, with the catch (from §6.1)** — multi-site, nested components (two patterns), free-form payload (build-time mapping constraint), CWV hooks (config-driven signal). Present as *current-state* capabilities with honest constraints.
18. **Ideas — what would be good to have in the CMS (from §6.2)** — CMS-provided image dimensions (CLS), CMS-driven LCP marking, on-the-fly custom components, unified nesting/authoring, third-party CMS angle. **Clearly labeled forward-looking / not-yet-built.**

> **Note to design agent:** §2.7 is deliberately deep. Slides 8–9 pull its two diagrams forward; the remaining detail (component types, nesting, full mapping table, defer/page-fold) lives in the appendix so the main deck stays one-idea-per-slide.
>
> **Slides 17–18 are the two Part 6 sections** and must come *after* the recap/appendix. Slide 17 (§6.1) is still factual/current-state; slide 18 (§6.2) is explicitly forward-looking "ideas." Keep the boundary between "how it works" and "how it could work" visually obvious — a divider or a distinct accent color for slide 18 — so an idea is never mistaken for a shipped feature. If the meeting doesn't want the forward-looking material, slides 17–18 can be dropped without touching the main narrative.

---

## Part 4 — Design & style guidance

- **Diagrams over text.** The three carrying visuals: nested boxes (slide 4), the 6-layer stack (slide 6), and the concentric outlet frames (slide 9). Invest most design effort there.
- **Consistent visual language.** Reuse the Page ⊃ Slots ⊃ Components shape across slides so the mental model compounds. Consider one accent color for "CMS-side" and another for "storefront-side" and use them consistently.
- **No real code on main slides.** Stylize code-like content (the contract, the config) as labeled boxes/pseudo-snippets. Real symbol names go only in the appendix.
- **One idea per slide.** Strong headline sentence + one visual + max ~3 bullets.
- **Headlines are conclusions, not topics.** e.g. "Each layer has exactly one job," not "Architecture Overview."
- **Progressive disclosure.** Build the layer stack and the render journey with step reveals if the format supports it.
- **End each "how it works" section with a "why it's built this way" line** — usually separation of concerns, reuse, or performance.

---

## Part 5 — Technical appendix (code anchors, for engineers)

Concrete anchors in the codebase, mapped to the concepts above:

- **App-facing facade:** `CmsService` (`core-libs/core/src/cms/facade/cms.service.ts`) — `getCurrentPage()`, `getComponentData()`, `getContentSlot()`, `getPageComponentTypes()`.
- **The data contract / models:** `Page`, `ContentSlotData`, `ContentSlotComponentData`, `CmsComponent`, `PageContext` (`core-libs/core/src/cms/model/*`, `.../routing/models/page-context.model.ts`).
- **Adapter + normalizer (the only CMS-aware layer):** `occ-cms-page.adapter.ts`, `occ-cms-component.adapter.ts`, `occ-cms-page-normalizer.ts`; endpoints in `default-cms-config.ts`.
- **Coordinator:** `CmsPageConnector`, `CmsComponentConnector`.
- **State:** NgRx cms store (`page.effect.ts`, `components.effect.ts`, reducers, selectors) — batching, caching, context-aware component storage.
- **Type-code → component mapping (config):** `CmsConfig` / `CmsComponentMapping` (`cms-config.ts`); static structure in `cms-structure.config.ts` + `default-cms-config.ts`; `ignoreBackend` for backend-free pages.
- **Rendering pipeline:** `PageLayoutComponent` → `PageSlotComponent` (`page-slot.component.*`) → `ComponentWrapperDirective` (`component-wrapper.directive.ts`) → `ComponentHandlerService` (default vs. lazy handlers) → `CmsInjectorService` provides `CmsComponentData<T>` to each component. `InnerComponentsHostDirective` handles container/inner components.
- **Customization:** `OutletDirective` / `OutletService` / `OutletRefDirective` (`cms-structure/outlet/*`) — before/replace/after positions.
- **Routing & guards:** `CmsPageGuard`, `CmsPageGuardService`, router serializer `CustomSerializer.getPageContext()` (`routing/store/reducers/router.reducer.ts`) mapping URL → `PageContext`. Branching: `productCode` → `PRODUCT_PAGE`; `categoryCode`/`brandCode` → `CATEGORY_PAGE`; `data.pageLabel` or full URL path → `CONTENT_PAGE`; empty → `HOME_PAGE_CONTEXT`; `cx-preview` + `cmsTicketId` → `SMART_EDIT_CONTEXT`.
- **Semantic / configurable routes:** `RoutingConfig` / `RouteConfig` (`routing/configurable-routes/routes-config.ts`); defaults in `default-routing-config.ts` (`product`, `category`, `brand`, `search` `paths` + `paramsMapping`). `SemanticPathService.transform()/get()` + `UrlPipe` (`cxUrl`) + `RoutingService.go()` build links from `{ cxRoute, params }` — components never hardcode URLs.
- **Per-page-type backend query:** `OccCmsPageAdapter.getPagesRequestParams()` (`occ/adapters/cms/occ-cms-page.adapter.ts`) — `CONTENT_PAGE` → `pageLabelOrId=<path>`; other types → `code=<code>`; home/preview → empty params.
- **Suffix matchers & catch-all:** `PRODUCT_DETAILS_URL_MATCHER` (marker `p`) / `PRODUCT_LISTING_URL_MATCHER` (marker `c`) in `cms-pages/*`; catch-all `**` route in `cms-structure/routing/cms-route/add-cms-route.ts` (added at init, guarded by `CmsPageGuard`).
- **Runtime CMS routes for content pages:** `CmsRoutesImplService.handleCmsRoutesInGuard()/updateRouting()` (`cms-structure/services/cms-routes-impl.service.ts`) — registers child routes from component `childRoutes` via `router.resetConfig()` and re-navigates; only for `CONTENT_PAGE`.
- **SEO:** `PageMetaService`, `BasePageMetaResolver` (`base-page-meta.resolver.ts`), `ContentPageMetaResolver`, `PageLinkService` (canonical URLs), `default-page-meta.config.ts` (resolver registry: title, description, robots, canonical, breadcrumbs, image).
- **Static/fallback pages:** `core-libs/storefront/cms-pages/*` (product-details + product-listing URL matchers).
- **Template → Slots resolution:** `PageLayoutService.getSlots()` / `getPageFoldSlot()` (`page-layout.service.ts`) reads `LayoutConfig.layoutSlots` (`layout/config/layout-config.ts`; real config in `recipes/config/layout-config.ts`). Config gives slot **order** + responsive breakpoints (`xs/sm/md/lg`) + `pageFold`; result is filtered to slots present in `page.slots`. Sections (`header`/`footer`/`navigation`) resolved independently of the page template.
- **Three-level outlet naming (verified in templates):** `page-layout.component.html` binds `[cxOutlet]="layoutName"` (template name); `page-slot.component.html` binds `[cxOutlet]="position"` (slot) then `[cxOutlet]="component.flexType"` (component). So template name, slot position, and component `flexType` are each an outlet — hooked via `OutletService.add()` at `BEFORE`/`REPLACE`/`AFTER` (`outlet.model.ts` `OutletPosition`, `OutletContextData`).
- **Component types / normalization:** `occ-cms-page-normalizer.ts` `getFlexTypeFromComponent()` — `CMSFlexComponent` uses the `flexType` field, `JspIncludeComponent` uses `uid`, otherwise `typeCode`. `flexType` is the name the UI resolves and hooks against (`ContentSlotComponentData`).
- **Container / inner components:** `CmsComponent.composition.inner` (`model/cms.model.ts`) rendered by `InnerComponentsHostDirective` (`inner-components-host.directive.ts`), which reuses `ComponentWrapperDirective` per inner type (recursive).
- **Full mapping fields:** `CmsComponentMapping` (`cms-config.ts`) — `component`, `providers`, `guards`, `childRoutes`, `i18nKeys`, `disableSSR`, `deferLoading`, `data`. Resolved via `CmsComponentsService` `determineMappings()` (resolves lazy feature modules) → `getMapping()` → `shouldRender()` (skips when SSR + `disableSSR`) → `getModule()` (feature `NgModuleRef`).
- **Defer / page-fold:** `page-slot.service.ts` `getComponentDeferOptions()` + `DeferLoaderService`/intersection observer; `DeferLoadingStrategy` `INSTANT` vs `DEFER` (`cms-config.ts`); page fold from `layoutSlots[...].pageFold`.

---

## Part 6 — Advanced use cases & forward-looking ideas (optional appendix)

> **Scope note (important):** Parts 1–5 describe **how the integration works today**. Part 6 is deliberately separated into two subsections so the "how it works" narrative is never polluted with "how it could work":
> - **§6.1** is still **factual/current-state** — advanced things the integration *can* do today, stated honestly with their real constraints. Present these as capabilities, not aspirations.
> - **§6.2** is explicitly **forward-looking ideas** — gaps and wishlist items where the storefront is capable but the *CMS-side data or authoring experience* is missing. Present these as "ideas," clearly labeled, at the very end.
>
> These two subsections should render as the **final two slides** (after the recap/appendix), not woven into the main deck. Keep the descriptive/aspirational boundary visually obvious (e.g. a divider slide, or a distinct accent color for §6.2).

---

### 6.1 What the integration can already do (advanced, current-state)

Four capabilities that come up in advanced scenarios. Each is **supported today** — stated with the constraint that makes it honest.

**A) Multi-site out of the box (per-baseSite content)**
- Every OCC request carries the active **`baseSite`** as a URL path segment (`OccEndpointsService.getBaseUrl()` joins `baseUrl + prefix + baseSite`; the active site comes from `BaseSiteService`). CMS page and component requests inherit this automatically.
- **Result:** the *same* storefront build serves *different* content per site/channel — multi-site is a first-class property, not an add-on.
- **Why it's built this way:** the site context is resolved once and threaded through the OCC layer, so no CMS-facing code has to think about which site it's serving.

**B) Deeply nested / container components — supported, but two patterns coexist**
- A component's data can carry **`composition.inner: [uids]`**, and the generic **`InnerComponentsHostDirective`** (`[cxInnerComponentsHost]`) renders those children through the *same* component-resolution mechanism — recursively, to arbitrary depth. Used by e.g. `SearchBox`, `ProductListItem`.
- **The honest constraint:** older container components (`BannerCarouselComponent`, `CMSTabParagraphContainer`) predate this directive and each **hand-parse a space-delimited UID string** from a bespoke property (`banners`, `components`) instead. So nesting is fully supported and unbounded in depth, but there are **two coexisting patterns** and the general one (`composition.inner`) is **under-documented** — building a new container is less ergonomic than it should be.
- **Takeaway:** *composition is first-class; the authoring/ergonomics story is not yet unified.* (Refines §2.7.4.)

**C) Custom components with a free-form payload — supported, build-time mapping constraint**
- The payload is **free-form**: `CmsComponent` has a catch-all `otherProperties?: any`, and teams define their own `extends CmsComponent` interface for typing (examples: CDC/Gigya component, quick-order component). Data reaches the component as a strongly-typed `Observable<T>` via injected `CmsComponentData<T>`. There is **no runtime schema enforcement** — validation is the developer's responsibility.
- **The honest constraint:** the **`typeCode` → Angular component mapping must exist at build time** (directly in `cmsComponents`, or declared in a lazy `featureModules` entry). The CMS can only place component *types* the frontend already knows about. There is **no true on-the-fly/runtime registration** of a brand-new component type without a redeploy.
- **Takeaway:** *arbitrary content payloads: yes. Arbitrary new component types at runtime: no — that's the seam a richer integration would need to move.*

**D) Core Web Vitals hooks exist — but the signal is frontend-configured, not CMS-driven**
- **LCP priority is supported:** `CmsLcpService` marks configured components as LCP-critical (either an explicit `lcpCmsComponents.ids` list or an `idMarker` substring convention), which maps to `fetchpriority="high"` + `loading="eager"` on the images inside them (`MediaComponent`).
- **CLS reservation is partially supported:** `MediaComponent` renders `width`/`height` attributes *if present* on the `Image` model — but the model comment states these **do not originate from the CMS** and must be set manually.
- **The honest constraint:** in both cases the *mechanism* lives in the storefront and the *signal is hardcoded in frontend config*, not delivered by content editors. Which sets up §6.2.

> **Design note:** A single "advanced, and here's the catch" slide — four rows, each "✓ supported … but <constraint>." Keep it candid; the audience is engineers.

---

### 6.2 Ideas — what would be good to have (CMS-side wishlist)

> **Label this slide clearly as forward-looking / not-yet-built.** These are not commitments; they're where the storefront is already capable and the missing piece is **CMS-side data or authoring experience**. The recurring shape: *the frontend can do it — the signal should come from the CMS instead of hardcoded config.*

- **CMS-provided image dimensions → automatic CLS prevention.** If the CMS returned intrinsic width/height (or aspect ratio) per media, `MediaComponent` could reserve space automatically and eliminate Cumulative Layout Shift — instead of requiring manual dimensions today.
- **CMS-driven LCP marking.** Let content editors mark a component as containing LCP-priority content in the CMS, so SSR can set high `fetchpriority` on the right images per page — instead of the current frontend `ids`/`idMarker` configuration that a content change can't reach.
- **On-the-fly custom components.** A path to introduce a new component *type* + payload without a frontend redeploy (today the type→component mapping is build-time). This is where a **richer third-party CMS integration** could open possibilities — dynamic type registration, editor-defined component schemas.
- **A unified, ergonomic nesting/authoring story.** Consolidate the two container patterns (§6.1-B) behind the generic `composition.inner` mechanism, documented, so authoring deeply nested layouts is consistent — and better surfaced in the visual editor.
- **Editing-experience gaps.** The above are also the features that are thin in the visual content editor today (nested-component editing, custom on-the-fly component payloads) — a natural area for improvement, potentially via third-party CMS vendors.

> **Design note:** Frame each as *"storefront-ready → CMS-signal missing."* Keep it visually distinct from §6.1 so nobody mistakes an idea for a shipped feature.

#### Code anchors for Part 6 (engineers)

- **Multi-site:** `BaseSiteService` (`site-context/facade/base-site.service.ts`); `OccEndpointsService.getBaseUrl()` (`occ/services/occ-endpoints.service.ts`) appends `baseSite`.
- **Nesting:** `CmsComponent.composition.inner` (`model/cms.model.ts`) + `InnerComponentsHostDirective` (`inner-components-host.directive.ts`); ad-hoc containers `BannerCarouselComponent`, `tab-paragraph-container.component.ts`.
- **Custom payload:** `CmsComponent.otherProperties` (`model/cms.model.ts`); `CmsComponentData<T>` (`page/model/cms-component-data.ts`); build-time mapping in `CmsConfig.cmsComponents` + lazy `FeatureModuleConfig` (`cms-config.ts`); resolution via `CmsComponentsService.determineMappings()`.
- **CWV — LCP:** `CmsLcpService` (`cms-structure/cms-lcp-context/cms-lcp.service.ts`), `lcp-cms-components.config.ts`, `LcpPresenceMappingService` (`shared/lcp-context/`), `MediaComponent` `fetchPriority` + `effectiveLoadingStrategy`.
- **CWV — CLS:** `Image` model `width`/`height` (`model/image.model.ts`, note the "not from CMS" comment); `MediaService.getWidthAndHeight()`; `media.component.html` `[attr.width]`/`[attr.height]`.
