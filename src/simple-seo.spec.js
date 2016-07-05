(function () {
  'use strict';

  describe('simpleSeoService - ', function () {
    var $document = window.$(document);

    describe('when the 3 seo tags (title, meta description and meta keywords) do not exist on the page - ', function () {
      var simpleSeoService;

      beforeEach(function () {
        $document.find('head > title').remove();
        $document.find('head > meta[name="description"]').remove();
        $document.find('head > meta[name="keywords"]').remove();

        module('common.simple-seo');

        inject(function (_simpleSeoService_) {
          simpleSeoService = _simpleSeoService_;
        });
      });

      it('it creates the missing title tag and sets its content correctly', function () {
        simpleSeoService.title = 'My awesome title';

        expect(simpleSeoService.title).toEqual('My awesome title');
        expect($document.find('head > title').text()).toEqual('My awesome title');

        simpleSeoService.title = 'Another awesome title';

        expect(simpleSeoService.title).toEqual('Another awesome title');
        expect($document.find('head > title').text()).toEqual('Another awesome title');
      });

      it('it creates the missing meta description tag and sets its content correctly', function () {
        simpleSeoService.description = 'My awesome description';

        expect(simpleSeoService.description).toEqual('My awesome description');
        expect($document.find('head > meta[name="description"]').attr('content')).toEqual('My awesome description');

        simpleSeoService.description = 'Another awesome description';

        expect(simpleSeoService.description).toEqual('Another awesome description');
        expect($document.find('head > meta[name="description"]').attr('content')).toEqual('Another awesome description');
      });

      it('it creates the missing meta keywords tag and sets its content correctly', function () {
        simpleSeoService.keywords = 'awesome, simple, seo';

        expect(simpleSeoService.keywords).toEqual('awesome, simple, seo');
        expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('awesome, simple, seo');

        simpleSeoService.keywords = 'another awesome, simple, seo';

        expect(simpleSeoService.keywords).toEqual('another awesome, simple, seo');
        expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('another awesome, simple, seo');
      });
    });

    describe('while navigating between states - ', function () {
      var $rootScope, $state, simpleSeoService;

      beforeEach(function () {
        module('common.simple-seo');
      });

      describe('and there are no nested states - ', function () {
        beforeEach(function () {
          module(function ($stateProvider) {
            $stateProvider
              .state('state-one', {
                url: '/',
                template: 'state one',
                data: {
                  simpleSeoTitle: 'state one - title',
                  simpleSeoDescription: 'state one - description',
                  simpleSeoKeywords: 'state one - keywords'
                }
              })
              .state('state-two', {
                url: '/two',
                template: 'state two',
                data: {
                  simpleSeoTitle: 'state two - title',
                  simpleSeoDescription: 'state two - description',
                  simpleSeoKeywords: 'state two - keywords'
                }
              });
          });

          inject(function (_$rootScope_, _$state_, _simpleSeoService_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            simpleSeoService = _simpleSeoService_;
          });
        });

        it('it sets the 3 seo tags correctly', function () {
          $state.go('state-two');
          $rootScope.$digest();
          expect(simpleSeoService.title).toEqual('state two - title');
          expect($document.find('head > title').text()).toEqual('state two - title');
          expect(simpleSeoService.description).toEqual('state two - description');
          expect($document.find('head > meta[name="description"]').attr('content')).toEqual('state two - description');
          expect(simpleSeoService.keywords).toEqual('state two - keywords');
          expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('state two - keywords');

          $state.go('state-one');
          $rootScope.$digest();
          expect(simpleSeoService.title).toEqual('state one - title');
          expect($document.find('head > title').text()).toEqual('state one - title');
          expect(simpleSeoService.description).toEqual('state one - description');
          expect($document.find('head > meta[name="description"]').attr('content')).toEqual('state one - description');
          expect(simpleSeoService.keywords).toEqual('state one - keywords');
          expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('state one - keywords');
        });
      });

      describe('and there are nested states - ', function () {
        beforeEach(function () {
          module(function ($stateProvider) {
            $stateProvider
              .state('state-one', {
                url: '/',
                template: 'state one',
                data: {
                  simpleSeoTitle: 'state one - title',
                  simpleSeoDescription: 'state one - description',
                  simpleSeoKeywords: 'state one - keywords'
                }
              })
              .state('state-one.child', {
                url: '/state-one-child',
                template: 'state one child',
                data: {
                  simpleSeoTitle: 'state one child - title',
                }
              })
              .state('state-two', {
                url: '/two',
                template: 'state two',
                data: {
                  simpleSeoTitle: 'state two - title'
                }
              });
          });

          inject(function (_$rootScope_, _$state_, _simpleSeoService_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            simpleSeoService = _simpleSeoService_;
          });
        });

        it('it sets the 3 seo tags correctly by inheriting from its parent', function () {
          $state.go('state-one');
          $rootScope.$digest();
          expect(simpleSeoService.title).toEqual('state one - title');
          expect($document.find('head > title').text()).toEqual('state one - title');
          expect(simpleSeoService.description).toEqual('state one - description');
          expect($document.find('head > meta[name="description"]').attr('content')).toEqual('state one - description');
          expect(simpleSeoService.keywords).toEqual('state one - keywords');
          expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('state one - keywords');

          $state.go('state-one.child');
          $rootScope.$digest();
          expect(simpleSeoService.title).toEqual('state one child - title');
          expect($document.find('head > title').text()).toEqual('state one child - title');
          expect(simpleSeoService.description).toEqual('state one - description');
          expect($document.find('head > meta[name="description"]').attr('content')).toEqual('state one - description');
          expect(simpleSeoService.keywords).toEqual('state one - keywords');
          expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('state one - keywords');

          $state.go('state-two');
          $rootScope.$digest();
          expect(simpleSeoService.title).toEqual('state two - title');
          expect($document.find('head > title').text()).toEqual('state two - title');
          expect(simpleSeoService.description).toEqual('');
          expect($document.find('head > meta[name="description"]').attr('content')).toEqual('');
          expect(simpleSeoService.keywords).toEqual('');
          expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('');

          $state.go('state-one.child');
          $rootScope.$digest();
          expect(simpleSeoService.title).toEqual('state one child - title');
          expect($document.find('head > title').text()).toEqual('state one child - title');
          expect(simpleSeoService.description).toEqual('state one - description');
          expect($document.find('head > meta[name="description"]').attr('content')).toEqual('state one - description');
          expect(simpleSeoService.keywords).toEqual('state one - keywords');
          expect($document.find('head > meta[name="keywords"]').attr('content')).toEqual('state one - keywords');
        });
      });
    });
  });
})();
