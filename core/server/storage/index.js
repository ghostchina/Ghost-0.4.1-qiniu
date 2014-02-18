var errors = require('../errorHandling'),
    storage;

var upyunConfig  = require('../config/')().qiniu;

function get_storage() {
    // TODO: this is where the check for storage plugins should go
    // Local file system is the default
    var storageChoice = upyunConfig? 'qiniu':'localfilesystem';

    if (storage) {
        return storage;
    }

    try {
        // TODO: determine if storage has all the necessary methods
        storage = require('./' + storageChoice);
    } catch (e) {
        errors.logError(e);
    }
    return storage;
}

module.exports.get_storage = get_storage;