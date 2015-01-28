function intersects(x, y) {
    return (x.start < y.end && y.start < x.end) || x.start === y.start;
}

function intersectsWithSome(intervals, interval) {
    function intersectWithInterval(other) {
        return intersects(interval, other);
    }
    return intervals.some(intersectWithInterval);
}

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

    intervals = [].concat(intervals).sort(function (a, b) {
        var c = b.start - a.start;
        if (c !== 0) { return c; }
        return (a.end - a.start) - (b.end - b.start);
    });

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
