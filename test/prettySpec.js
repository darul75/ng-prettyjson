describe('test valid json', function () {
	var $ngCompile, $ngRootScope;

	beforeEach(module('ngPrettyJson'));

	beforeEach(inject(function ($compile, $rootScope) {
		
		$ngCompile = $compile;
		$ngRootScope = $rootScope;

		var obj = {a:1, 'b':'foo', c:[false,null, {d:{e:1.3e5}}]};
		$ngRootScope.json = { json: obj };
		$ngRootScope.badjson = function() {};

	}));

	it('creates an instance of pretty', function () {
		var element = $ngCompile('<pre json="badjson" pretty-json />')($ngRootScope);
		
		expect(element.find('span').length).toBe(0);
	});

	it('creates an instance with default values', function () {
		var element = $ngCompile('<pre json="json" pretty-json />')($ngRootScope);		
		$ngRootScope.$apply();

		expect(element.find('span').length).toBe(10);		
	});
});