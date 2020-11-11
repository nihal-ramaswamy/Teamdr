const fs = require('fs');
const path = require('path');

exports.removeFile = async (fileLocation, filePath = 'public/') => {
    try {
        const fileName = fileLocation.substring(22, fileLocation.length);
        fs.unlinkSync(path.join(filePath, fileName));
    }
    catch (e) {
        throw e;
    }
}