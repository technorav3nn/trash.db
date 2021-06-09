import { stat } from 'fs/promises';
const validateJSON = function (fileContent) {
    try {
        JSON.parse(fileContent);
    }
    catch (e) {
        return false;
    }
    return true;
};
class TrashDb {
    constructor(options) {
        this.options = options;
        stat(options.fileName)
            .then(json => {
            const isJson = validateJSON(json);
            if (isJson) {
                this.file = json;
            }
            else {
                throw new Error("trash.db - invalid json or not json.");
            }
        })
            .catch(err => {
            if (err === null) {
                return console.log(err);
            }
            else if (err === "ENOENT") {
                throw new Error("trash.db - invalid file; doesnt exist");
            }
        });
    }
    get(key) {
    }
    set(key, value) {
    }
    has(key) {
    }
}
const db = new TrashDb({ fileName: "test.json" });
console.log(db.options);
