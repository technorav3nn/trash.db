import { readFileSync, statSync, writeFileSync } from "fs";

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
  public fileName : string;
  public dataStorage : object = {}
  
  constructor(options: JSONOpts) {
    this.options = options;
    this.fileName = options.fileName
    let fileData;
    fileData = readFileSync(__dirname + "/" + options.fileName, "utf8")
    console.log(fileData)
  
    if(!options.fileName.endsWith(".json")) {
      throw new Error("trash.db - you need a .json file format.")
    }    
    if(jsonVal(fileData)) this.dataStorage = JSON.parse(fileData)
  }
  public get(key: string) {
    return this.dataStorage[key] ?? null
  }
  public set(key: string, value: any) {
    if(!this.dataStorage[key]) {
      writeFileSync(this.fileName, JSON.stringify({key : value}), {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
      })
      console.log('wrote file')
      console.log(this.fileName)
    } 
  }
  public has(key: string) {}
}

const db = new TrashDb({ fileName: "test.json" })

db.set('hello', 'sdasd')

