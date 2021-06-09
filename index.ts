import * as fs from "fs";

interface JSONOpts {
  fileName: string;
}

const jsonVal = function (fileContent) {
  try {
    JSON.parse(fileContent);
  } catch (e) {
    return false;
  }
  return true;
};

class TrashDb {
  public options: object;
  public file: any;
  public fileName: string;
  public dataStorage: object = {};

  constructor(options: JSONOpts) {
    this.options = options;
    this.fileName = options.fileName;
    let fileData;
    fileData = fs.readFileSync(__dirname + "/" + options.fileName, "utf8");
    if (!options.fileName.endsWith(".json")) {
      throw new Error("trash.db - you need a .json file format.");
    }
    if (jsonVal(fileData)) this.dataStorage = JSON.parse(fileData);
  }
  public set(key: any, value: any) {
    if (!this.dataStorage[key]) {
      const data = this.dataStorage;
      data[key] = value;
      fs.writeFileSync("test.json", JSON.stringify(data));
      return data[key];
    }
    this.dataStorage[key] = value;
    return this.dataStorage[key];
  }
  public delete(key: string) {
    delete this.dataStorage[key]
    fs.writeFileSync("test.json", JSON.stringify(this.dataStorage));
    console.log(this.dataStorage);

  }
  public deleteAll() {
    for(const item in this.dataStorage) {
      delete this.dataStorage[item];
    }
    fs.writeFileSync("test.json", JSON.stringify(this.dataStorage));
  }
  public get(key: string) {
    return this.dataStorage[key] ?? null;
  }
  public has(key: string) {
    return this.dataStorage.hasOwnProperty(key);
  }
}

const db = new TrashDb({ fileName: "test.json" });
db.deleteAll()
