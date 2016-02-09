angular.module('kanban', ['ngResource', 'angular-sortable-view']);
angular.module('kanban').value('apiUrl', 'http://localhost:52991/api');
angular.module('kanban').controller('IndexController', function ($scope, $resource, apiUrl) {
    var CardsResource = $resource(apiUrl + '/cards/:CardID', { CardID: '@CardID' }, {
        'cards': {
            method: 'GET',
            url: apiUrl + '/lists/:ListID/cards',
            isArray: true
        }
    });

    var ListResource = $resource(apiUrl + '/lists/:ListID', { ListID: '@ListID' },
        {
            'update': { method: 'PUT' }
        });

    var CResource = $resource(apiUrl + '/cards/:CardID', { CardID: '@CardID' },
    {
        'update': { method: 'PUT' }
    });

    $scope.data = {
        newList: {},
        newCard: {}
    }

    $scope.addList = function () {
        ListResource.save($scope.data.newList, function (data) {
            $scope.data.newList = {};
            activate();
        });
    };

    $scope.addCard = function (list) {
        list.newCard.ListID = list.ListID;
        CardsResource.save(list.newCard, function (data) {
            activate();
        });
    };

    $scope.delList = function (list) {
        list.$remove(function (data) {
            activate();
        });
    };

    $scope.delCard = function (card) {
        card.$remove(function (data) {
            activate();
        });
    };

    $scope.saveList = function (list) {
        list.$update(function () {
            activate();
        });
    };

    $scope.saveCard = function (card) {
        CResource.update(card, function (data) {
            activate();
        });
    };

    function activate() {
        ListResource.query(function (data) {
            $scope.data.lists = data;

            $scope.data.lists.forEach(function (list) {
                list.cards = CardsResource.cards({ ListID: list.ListID });
            });
        });
    }

    activate();

});