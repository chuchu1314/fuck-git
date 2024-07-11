import Conf from 'conf'
import gitCommander from '../utils/gitCommander'

export class ConfigSet {
  config: Conf<Record<string, Array<any> | undefined>>
  private _key: string
  constructor(key, value: string[]) {
    this._key = key
    this.clear()
    this.add(value)
  }
  add(value:string | string[]) {
    let list = this.ls()
    if(Array.isArray(value)) {
      list= [...list, ...value]
    } else {
      list= [...list, value]
    }
    list = [...new Set(list)]

    this.config.set(this._key, list)
  }

  ls(){
    const string = this.config.get(this._key)
    return string || []
  }
  
  remove(value) {
    const list = this.ls()
    const newList = list.filter(item => item !== value)
    this.config.set(this._key, newList)
  }

  clear() {
    this.config.set(this._key, [])
  }
  

}

ConfigSet.prototype.config = new Conf({projectName: 'fuck-git'})

export default new ConfigSet('git-command', gitCommander)