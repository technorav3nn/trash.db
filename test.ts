import TrashDb from './index'

const db = new TrashDb({ fileName : 'db.json'})

db.deleteAll()