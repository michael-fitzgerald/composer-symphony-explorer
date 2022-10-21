import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SymphonyFlyweight } from '../models/SymphonyFlyweight';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private http : HttpClient;

  constructor(private _http : HttpClient) {
    this.http = _http;
  }

  async getSymphony(id:string){
    var that = this;
    return new Promise<SymphonyFlyweight>(function(resolve, reject){
      that.http.get('https://firestore.googleapis.com/v1/projects/leverheads-278521/databases/(default)/documents/symphony/' + id)
      .subscribe({
        next : function(succ : any) {
          let ret : SymphonyFlyweight = {
            Id : id,
            Name : succ["fields"]["name"]["stringValue"],
            ParentId : succ["fields"]["copied-from"]?.["stringValue"]
          }
          resolve(ret);
        }, error : function(err){
            reject(err);
      }});
      
    });
  }
  
}
