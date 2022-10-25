import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SymphonyFlyweight } from '../models/SymphonyFlyweight';
import { parseEDNString } from 'edn-data'
import { AssetFlyweight } from '../models/AssetFlyweight';
import { ScraperService } from './scraper.service';
import { from, timer, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private sleepRand = async () => new Promise((r) => setTimeout(r, 
    ((Math.random() * 5) + 5) * 1000   //between 5 and 10 seconds
    ));

  constructor(private http : HttpClient, private scraper : ScraperService) {
    
  }

  private extractSymphonyAssets(ednNode : any, arr : AssetFlyweight[]){
    if(!ednNode) return;
    if(ednNode.step == 'asset'){
      let ext = arr.filter(x => x.Ticker == ednNode.ticker)[0];
      if(ext){
        ext.IsInvest = true;
        ext.Name = ednNode.name;
        ext.Price = ednNode.price;
      } else {
        arr.push({
          Name : ednNode.name,
          Ticker : ednNode.ticker,
          Price : ednNode.price,
          IsInvest : true,
          IsCompare : false
        })
      }
    }

    if(ednNode.step == 'if-child' && (ednNode['lhs-val'] || ednNode['rhs-val'])){
      //parse left hand side.
      if(!ednNode['lhs-fixed-value?']){
        let ticker = ednNode['lhs-val'];
      
        var ext = arr.filter(x => x.Ticker == ticker)[0];
        if(ext){
          ext.IsCompare = true;
        } else {
          arr.push({
            Name : '',
            Ticker : ticker,
            IsInvest : false,
            IsCompare : true
          })
        }
      }

      //parse right hand side.

      if(!ednNode['rhs-fixed-value?']){
        let ticker = ednNode['rhs-val'];
      
        var ext = arr.filter(x => x.Ticker == ticker)[0];
        if(ext){
          ext.IsCompare = true;
        } else {
          arr.push({
            Name : '',
            Ticker : ticker,
            IsInvest : false,
            IsCompare : true
          })
        }
      }

    }

    if(ednNode?.children){
      for(let i = 0; i < ednNode.children.length; i++){
        this.extractSymphonyAssets(ednNode?.children[i], arr);
      }
    }
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
        next : async function(succ : any) {
          let ret : SymphonyFlyweight = {
            Id : id,
            Name : succ.fields.name.stringValue,
            ParentId : succ.fields['copied-from']?.stringValue,
            CreateTime : new Date(Date.parse(succ.createTime)),
            UpdateTime : new Date(Date.parse(succ.updateTime)),
            Description : succ.fields.description.stringValue,
            Assets : []
          }
        
          let edn = succ.fields.latest_version_edn.stringValue;
          let symphonyEdn = parseEDNString(edn, { mapAs: 'object', keywordAs: 'string' });
         
          that.extractSymphonyAssets(symphonyEdn, ret.Assets);
          ret.Assets.sort((a, b) => a.Ticker.localeCompare(b.Ticker));

          zip(
            from(ret.Assets),
            timer(0, 150),  //throttle these to every 150ms to avoid rate limit
            (x, i) => x
          ).subscribe({
            next: function(a){
              that.scraper.getAssetDetails(a.Ticker).then(function(detes){
                a.Details = detes;
                if(!a.Name?.length){
                  a.Name = detes.Name;
                }
              }, function(){
                console.warn('Asset detail lookup failed for ' + a?.Ticker);
              });
            }
          })

          resolve(ret);
        }, error : function(err){
            reject(err);
      }});
      
    });
  }
  
}
