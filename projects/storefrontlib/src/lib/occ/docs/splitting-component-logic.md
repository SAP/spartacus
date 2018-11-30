#  Splitting component logic to services

To make extensibility easier for customers, we want to split as much logic as we can from component implementation to separate service, so:
1. Generally follow Angular Coding guideliness (Style 05-15): 
	
	Do limit logic in a component to only that required for the view. All other logic should be delegated to services.
	
	Why? 
	- Logic in a service can more easily be isolated in a unit test, while the calling logic in the component can be easily mocked.
	- Removes dependencies and hides implementation details from the component.
    - Keeps the component slim, trim, and focused.

2. If component depends on more than one service, those dependencies can be delegated to component's specific service.

    Example: _SearchBoxComponent_ and related _SearchBoxComponentService_

    - SearchBoxComponent depends only on SearchBoxComponentService
    - Customer can easily customise SearchBoxComponentService which gives them fexibility to change logic of the component, without extending default one (which is burdensome)
    - Customer can easily create his own component and reuse exiting logic/data using default service  
    - Customer can easily wrap our default component into his own higher order component, and override any injected service
    
