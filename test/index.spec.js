var intervalPacker = require('..');
var expect = require('unexpected');
describe('gready-interval-packer', function () {
    it('throws when given anything other than an array', function () {
        expect([
            [],
            [undefined],
            ["Hello"],
            [42]
        ], 'to be an array whose items satisfy', function (args) {
            expect(function () {
                intervalPacker.apply(null, args);
            }, 'to throw', 'The interval packer requires an array of objects with start and end properties.');
        });
    });

    describe('given a empty list of intervals', function () {
        it('returns an empty list of partitions', function () {
            expect(intervalPacker([]), 'to be empty');
        });
    });
});
