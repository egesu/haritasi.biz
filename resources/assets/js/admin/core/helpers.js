export function getDiff(cleanData, datesToConvert) {
    var dirtyData = angular.copy(this),
        diff = {},
        i;
    cleanData = angular.copy(cleanData);

    for (i in dirtyData) {
        if (Object.prototype.hasOwnProperty(i)) continue;
        if (typeof dirtyData[i] === 'object' && dirtyData[i] instanceof Blob) {
            diff[i] = dirtyData[i];
        } else if (!angular.equals(dirtyData[i], cleanData[i])) {
            diff[i] = typeof(dirtyData[i]) === 'undefined' ? null : dirtyData[i];
        }
    }

    if (angular.isArray(datesToConvert) && datesToConvert.length > 0) {
        for (i in diff) {
            if (datesToConvert.indexOf(i) !== -1) {
                diff[i] = moment(diff[i]).format('YYYY-MM-DD');
            }
        }
    }

    return diff;
}

export function shorten(limit) {
    var self = this;
    if (self.length <= limit) {
        return self + '';
    } else {
        return self.substr(0, limit - 3) + '...';
    }
};
