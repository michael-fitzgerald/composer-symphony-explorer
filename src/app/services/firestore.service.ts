import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SymphonyFlyweight } from '../models/SymphonyFlyweight';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private http : HttpClient;
  private sleepRand = async () => new Promise((r) => setTimeout(r, 
    ((Math.random() * 5) + 5) * 1000   //between 5 and 10 seconds
    ));

  constructor(private _http : HttpClient) {
    this.http = _http;
  }



  async getSymphony(id:string){
    var that = this;
    return new Promise<SymphonyFlyweight>(async function(resolve, reject){

      if(!id){
        reject();
        return;
      }

      await that.sleepRand();

      that.http.get('https://firestore.googleapis.com/v1/projects/leverheads-278521/databases/(default)/documents/symphony/' + id)
      .subscribe({
        next : function(succ : any) {
          let ret : SymphonyFlyweight = {
            Id : id,
            Name : succ.fields.name.stringValue,
            ParentId : succ.fields['copied-from']?.stringValue,
            CreateTime : new Date(Date.parse(succ.createTime)),
            UpdateTime : new Date(Date.parse(succ.updateTime)),
            Description : succ.fields.description.stringValue
          }
          resolve(ret);
        }, error : function(err){
            reject(err);
      }});
      
    });
  }
  
}
