angular.module('delimiterApp', [])
    .directive('delimiterBoxBefore', function () {
        return {
            link: function (scope, element, attr, ctrl) {
                scope.beforeInputList = [];
                if (scope.answer != null && scope.answer != undefined && scope.answer != '') {
                    for (var index = 0; index < scope.boxBeforeDelimiter; index++) {
                        if (index < scope.boxBeforeDelimiter) {
                            scope.beforeInputList.push({
                                index: index,
                                value: scope.answer[index]
                            });
                        }
                    }
                } else {
                    for (var index = 0; index < scope.boxBeforeDelimiter; index++) {
                        if (index < scope.boxBeforeDelimiter) {
                            scope.beforeInputList.push({
                                index: index,
                                value: ''
                            });
                        }
                    }
                }
            },
            template: '\
        <input type="text" ng-repeat="index in beforeInputList" class="border-all" id="{{\'boxBefore-\'+$index}}"\
        ng-keyup="autoTab(\'boxBefore-\'+$index,$last)" ng-model="index.value" ng-keypress="index.value = \'\'" ng-required="isRequired == \'true\'"\
        ng-disabled="isDisabled == \'true\'" />'
        }
    })
    .directive('delimiterBoxAfter', function () {
        return {
            link: function (scope, element, attr, ctrl) {
                scope.afterInputList = [];
                if (scope.answer != null && scope.answer != undefined && scope.answer != '') {
                    for (var index = 0; index < scope.boxAfterDelimiter; index++) {
                        if (index < scope.boxAfterDelimiter) {
                            scope.afterInputList.push({
                                index: index,
                                value: scope.answer[index + parseInt(scope.boxBeforeDelimiter) + 1]
                            });
                        }
                    }
                } else {
                    for (var index = 0; index < scope.boxAfterDelimiter; index++) {
                        if (index < scope.boxAfterDelimiter) {
                            scope.afterInputList.push({
                                index: index,
                                value: ''
                            });
                        }
                    }
                }
            },
            template: '\
            <input type="text" ng-repeat="indexAfter in afterInputList" class="border-all" id="{{\'boxAfter-\'+$index}}"\
            ng-keyup="autoTab(\'boxAfter-\'+$index,$last)" ng-model="indexAfter.value" ng-keypress="indexAfter.value = \'\'" ng-required=" isRequired == \'true\'"\
             ng-disabled="isDisabled == \'true\'" />'
        }
    })
    .directive('delimiterBox', function () {
        return {
            restrict: 'A',
            scope: {
                delimiter: '@delimiter',
                boxBeforeDelimiter: '@boxBefore',
                boxAfterDelimiter: '@boxAfter',
                isRequired: '@isRequired',
                isDisabled: '@isDisabled',
                answer: '=answer',
                submitAnswer: '&submitAnswer'
            },
            link: function (scope, element, attr, ctrl) {
                if (scope.delimiter != null && scope.delimiter != undefined && scope.delimiter.length > 0) {
                    var answerLength = parseInt(scope.boxBeforeDelimiter) + parseInt(scope.boxAfterDelimiter) + scope.delimiter.length;

                    scope.autoTab = function (objId, isLast) {
                        var idInteger = parseInt(objId.split('-')[1]);
                        idInteger++;
                        if (!isLast) {
                            $('#' + objId.split('-')[0] + '-' + idInteger).focus();
                        } else {
                            if (objId.split('-')[0] == 'boxBefore') {
                                $('#boxAfter-0').focus();
                            }
                        }
                        var digitBeforeBox = '',
                            digitAfterBox = '';
                        for (var index = 0; index < scope.boxBeforeDelimiter || index < scope.boxAfterDelimiter; index++) {
                            if (index < scope.boxBeforeDelimiter) {
                                digitBeforeBox = digitBeforeBox + scope.beforeInputList[index].value
                            }
                            if (index < scope.boxAfterDelimiter) {
                                digitAfterBox = digitAfterBox + scope.afterInputList[index].value
                            }
                        }
                        scope.answer = digitBeforeBox + scope.delimiter + digitAfterBox
                        if (answerLength == scope.answer.length) {
                            var immediateID = window.setTimeout(function () {
                                scope.submitAnswer();
                            })
                        }
                    }
                } else {
                    var answerLength = parseInt(scope.boxBeforeDelimiter);

                    scope.autoTab = function (objId, isLast) {
                        var idInteger = parseInt(objId.split('-')[1]);
                        idInteger++;
                        if (!isLast) {
                            $('#' + objId.split('-')[0] + '-' + idInteger).focus();
                        }
                        var digitBeforeBox = '';
                        for (var index = 0; index < scope.boxBeforeDelimiter; index++) {
                            if (index < scope.boxBeforeDelimiter) {
                                digitBeforeBox = digitBeforeBox + scope.beforeInputList[index].value
                            }
                        }
                        scope.answer = digitBeforeBox
                        if (answerLength == scope.answer.length) {
                            var immediateID = window.setTimeout(function () {
                                scope.submitAnswer();
                            })
                        }
                    }
                }
            },
            template: '\
              <div  class="deliminater-box">\
              <span delimiter-box-before></span>\
              <label ng-show="delimiter" ng-bind="delimiter"></label>\
              <span ng-show="delimiter" delimiter-box-after></span>\
              </div>\      '
        }
    });