# AngularJS Simple SEO #

AngularJS Simple SEO provides a way of setting a page title, description, and keywords, while using [AngularUI Router](https://github.com/angular-ui/ui-router). It leverages the powers of custom data attached to state objects. Check [this](https://github.com/angular-ui/ui-router/wiki#attach-custom-data-to-state-objects) out if you're not familiar with this feature of AngularUI Router.

## Get Started ##

1. Install via bower by running  `$ bower install angular-simple-seo` from your terminal.
1. Add `'common.simple-seo'` to your module's list of dependencies.

## Usage ##

>
```javascript
  $stateProvider
    .state('state1', {
      url: '/state1',
      templateUrl: 'partials/state1.html',
      data: {
        simpleSeoTitle: 'state1 - title',
        simpleSeoDescription: 'state1 - description',
        simpleSeoKeywords: 'state1 - keywords'
      }
    })
    .state('state1.list', {
      url: '/list',
      templateUrl: 'partials/state1.list.html',
      data: {
        // The other two properties, description and keywords, are inherited from the parent state.
        simpleSeoTitle: 'state1.list - title'
      }
    })
    .state('state2', {
      url: '/state2',
      templateUrl: 'partials/state2.html',
      data: {
        simpleSeoTitle: 'state2 - title',
        simpleSeoDescription: 'state2 - description',
        simpleSeoKeywords: 'state2 - keywords'
      }
    });
});
```

## TODOs ##

1. Add examples and a more comprehensive usage scenario
1. Make it work with ngRouter
1. Add bower ignore
