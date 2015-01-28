var intersectsWithSome = require('./intersection').intersectsWithSome;
var byDescStartAndLength = require('./byDescStartAndLength');

module.exports = function greedyIntervalPacker(intervals) {
    if (!Array.isArray(intervals)) {
        throw new Error('The interval packer requires an array of objects with start and end properties.');
    }

    if (intervals.length === 0) {
        return [];
    }

    intervals.forEach(function (interval) {
        if (
            typeof interval !== 'object' ||
            typeof interval.start !== 'number' ||
            typeof interval.end !== 'number' ||
            interval.end <= interval.start
        ) {
            throw new Error('Intervals must be objects with integer properties start and end where start < end.');
        }
    });

    intervals = [].concat(intervals).sort(byDescStartAndLength);

    var partitions = [[]];

    while (intervals.length > 0) {
        var interval = intervals.pop();
        var i = 0;

        while (
            i < partitions.length &&
            intersectsWithSome(partitions[i], interval)
        ) {
            i += 1;
        }
        (partitions[i] = partitions[i] || []).push(interval);
    }

    return partitions;
};
