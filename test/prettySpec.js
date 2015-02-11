describe('ngPrettyJson', function () {
    var testDirective,
        noop = angular.noop,
        scope,
        fixture = function fixture($compile, $rootScope, $timeout) {
            scope = $rootScope.$new();
            scope.obj = obj;
            scope.badjson = noop;
            scope.json = {
                json: obj
            };

            /**
             * Compiles markup and compares resulting output to expected.s
             * @param {string} markup Markup to compile
             * @param {number} [nodeCount] Number of <span> nodes expected; defaults to 0
             */
            return function tester(markup, nodeCount) {
                var elt = angular.element(markup);
                elt = $compile(elt)(scope); // Compile the directive                
                scope.$digest(); // Update the HTML

                // $timeout.flush(2000);                
                
                angular.element(document.body).append(elt);

                var selCount =  elt.find('pre').children('span').length;
                // console.log(selCount);

                expect(selCount).toBe(nodeCount || 0);
                //expect(element[0].tagName).toBe('PRE');
                return elt;
            };
        },

        obj;

    beforeEach(module('ngPrettyJson'));

    beforeEach(inject(function ($injector) {
        obj = {a: 1, 'b': 'foo', c: [noop, false, null, {d: {e: 1.3e5}}]};
        testDirective = $injector.invoke(fixture);
    }));

    describe('prettyJson directive', function () {
        it('ignores empty (undefined) JSON', function () {
            testDirective('<pre json="badjson" pretty-json></pre>');
        });

        it('creates an instance with default values', function () {
            testDirective('<pre json="json" pretty-json id="toto"></pre>', 24);
        });

        it('uses prettyJson attribute', function () {
            testDirective('<pre pretty-json="json"></pre>', 24);
        });

        it('creates an instance with default values w/o presence of "json" key in obj', function () {
            testDirective('<pre pretty-json="obj"></pre>', 24);
        });

        it('creates an instance with default values, using element syntax', function () {
            testDirective('<pretty-json json="json"></pretty-json>', 24);
        });

        it('ignores updates to the root object if it has a json property', function () {
            var element = testDirective('<pre pretty-json="json"></pre>', 24);
            scope.$apply("json.f = 'bar'");
            expect(element.find('pre').children('span').length).toBe(24);
        });

        it('zaps markup if empty', function () {
            var element = testDirective('<pre pretty-json="json"></pre>', 24);
            delete scope.json.json;
            scope.$apply();
            expect(element.find('pre').children('span').length).toBe(0);
        });
    });

    describe('makeEntities function', function () {
        it('makes entities', inject(function (ngPrettyJsonFunctions) {
            var foo = '<g>&</g>';
            expect(foo.replace(ngPrettyJsonFunctions.rx.entities,
                ngPrettyJsonFunctions.makeEntities)).toBe('&lt;g&gt;&amp;&lt;/g&gt;');
        }));
    });

    describe('markup function', function () {
        it('marks up properly', inject(function (ngPrettyJsonFunctions) {
            var foo = JSON.stringify(obj);
            expect(foo.replace(ngPrettyJsonFunctions.rx.json, ngPrettyJsonFunctions.markup)).toBe('{<span class="key">"a":</span><span class="number">1</span>,<span class="key">"b":</span><span class="string">"foo"</span>,<span class="key">"c":</span>[<span class="null">null</span>,<span class="boolean">false</span>,<span class="null">null</span>,{<span class="key">"d":</span>{<span class="key">"e":</span><span class="number">130000</span>}}]}');
        }));
    });

});
