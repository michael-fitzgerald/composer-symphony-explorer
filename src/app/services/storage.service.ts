import { _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { SymphonyFlyweight } from '../models/SymphonyFlyweight';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getSymphonies(){
    let ret : SymphonyFlyweight[] = [];
    try{
      var str = localStorage.getItem('portfolio') || '';
      if(!str) return ret;
      ret = JSON.parse(str) as SymphonyFlyweight[];
    }
    catch(e){
      console.error('error encountered while loading portfolio from localstorage');
    }
    return ret;
  }

  saveSymphonies(arr : SymphonyFlyweight[]){
    try{
      let str = JSON.stringify(arr);
      localStorage.setItem('portfolio', str);
    }
    catch(e){
      console.error('error encountered while loading from localstorage');
    }
  }

}
