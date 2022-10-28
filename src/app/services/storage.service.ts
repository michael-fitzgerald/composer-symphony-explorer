import { _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { SymphonyFlyweight } from '../models/SymphonyFlyweight';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getSymphonies() : Promise<SymphonyFlyweight[]>{
    return this.getObject<SymphonyFlyweight[]>('portfolio') || [];
  }

  async saveSymphonies(arr : SymphonyFlyweight[]){
   this.setObject('portfolio', arr);
  }

  getObject<T>(key : string) : T | null { 
    try{
      if(!key) return null;
      key = key.toLowerCase();
      var str = localStorage.getItem(key) || '';
      if(!str) return null;
      return JSON.parse(str) as T;
    }
    catch(e){
      console.error('error encountered while loading portfolio from localstorage');
    }
    return null;
  }

  setObject<T>(key : string, val : T) {
    try{
      if(!key) return;
      key = key.toLowerCase();
      let str = JSON.stringify(val);
      localStorage.setItem(key, str);
    }
    catch(e){
      console.error('error encountered while loading from localstorage');
    }
  }

}
