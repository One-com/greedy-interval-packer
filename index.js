module.exports = function greadyIntervalPacker(intervals) {
    if (!Array.isArray(intervals)) {
        throw new Error('The interval packer requires an array of objects with start and end properties.');
    }

    return [];
};
