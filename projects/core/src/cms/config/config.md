# Backend configurability
The system landscape of a Commerce solution exists of various systems. The variety of systems and solutions are typically orchestrated on various application layers, including the frontend. 

Spartacus is by default configured to work with a single backend (SAP Commerce Cloud) to feed in the various streams of data. There are obvious advantages to use SAP Commerce Cloud, but there might be good reasons to switch the an alternative backend.


## An example
An typical example of mutliple systems being wired together can be found on the cart page. The cart is typically driven by multipe streams of content and data:
- cms (page) structure data  
  Allowing to control the page structure in a CMS system.
- cart data  
  Provides cart entries and totals
- promotion data  
  providing promotions details related to the cart
- product data  
  related to cart entries
- merchandizing content  
  ordinary messaging or campaign related content
- up and cross sell  
  product recommendations

This is actuall a relative simple setup for ordinary commerce these days, there are a lot of other busisses which can complicate the integration further more. 
While SAP Commerce Cloud offers a single suite to add all those features, there might be good reasons to use other systems for some of those features. This where configurable backend streams are designed for.


## Multi Source capabilities
In order to be flexible, you can use the following patterns to adapt an alternative backend:
- endpoint configuration
- extendibile adapters
- configurable serializers

### Configurable endpoints

### Extendible loaders

### Adapter


Spartacus both support configurable endpoints as well as so-called adapters, to adapt a third-party system.

To facilitate various systems to contribute to the UI, Spartacus 

Spartacus is designed to leverage various systems, as long as those systems provide an API. In order to allow for a flexible setup, Spart




 by its nature integrate with a large number of systems.
Spartacus is designed to work with multiple data sources, so that the UI can be orchestrated from different backend systems, each contributing to a specific area of the application. For example, when loading the cart page, the stream of data to build the page could exist of multilpe streams of data:
- cms structure to orchestrate the various component on the cart page
- cart data
- promotion data
- product data, related to cart entries
- merchandizing content
- upsell content

Spartacus is configured to work with a single backend (SAP Commerce Cloud) to feed in all those streams. There are a lot of advantages to use an integrated suite for the various streams of content. But there might be good reasons to switch the sources to other backends. 

## Fast setup
Spartacus is driven by a CMS structure. The CMS contains a lot of features to build complicated commerce solutions, using configuration and buinsess tools (SmartEdit). 
 pages, page tempates, content slots and components. The structure offers 

## OCC
The default backend for SAP Hybris Commerce is OOC, which is a rest API. OCC is designed for decoupled clients. 


Additionally, the complexity of the orchestrating structure, which 

could introduce could use other systems to feed the various content streams. 


- merchandizing features (campaign driven upsell), 
 The default implementation is configured to work with Commerce Cloud for loading the structure of the app, merchandizing content, products, and data such as personal profile informatoin, cart, etc. 

Since this requires a complicated setup in the backend, there's a simplfied setup possible, where the setup can be loaded from a simple configuration. This allows for a a grow-path where customers can start simple and whenever they like to take advantage of more diverse features, can introduce features in the backend. 

An example
While commerce has became more of a commodotie, some of the user flows are fairly  straightforward for some of the business, such as retail. The checout page is a good example, where single page, 
