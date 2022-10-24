import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { AssetDetails } from '../models/AssetFlyweight';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {

  constructor(private http : HttpClient) {
    
  }

  private storedAssets: { [ticker: string]: AssetDetails } = {};

  async getAssetDetails(ticker : string) : Promise<AssetDetails> {
    var that = this;
    return new Promise<AssetDetails>(async function(resolve, reject){

      if(!ticker){
        reject();
        return;
      }

      ticker = ticker.toLowerCase();

      if(that.storedAssets[ticker]){
        resolve(that.storedAssets[ticker]);
        return;
      }
      //TODO remove dependency on this random free proxy I found..
      that.http.get('https://thingproxy.freeboard.io/fetch/https://stockmarketmba.com/analyze.php?s=' + ticker,
      {responseType: 'text'})
      .subscribe({
        next : function(succ : any) {

          let parsedDoc = $('<html></html').html(succ);

          let nameInfoContainer = parsedDoc.find('#tabs-1 > div.row.clearfix > div.col-md-8 > h3');

          let assetInfoHtml = parsedDoc.find('#tabs-1 > div.row.clearfix > div.col-md-4').html();
          let assetInfoContainer = $('<div>'+assetInfoHtml+'</div>');
          assetInfoContainer.find('form').remove(); //filter out the garbage.

          let assetInfoText = assetInfoContainer.html();

          let categoryMatches : any;
          let categories : string[] = [];
          let categoryRegex = /Category(?:1|2|3):(?:&nbsp;){2}<a.*?>(.*)<\/a>/g;
          while ((categoryMatches = categoryRegex.exec(assetInfoText)) !== null) {
           
            categories.push(categoryMatches?.[1]);
          }

          debugger;
          let ret : AssetDetails = {
              Name : '',
              Category1 : categories?.[0],
              Category2 : categories?.[1],
              Category3 : categories?.[2],
              LeverageRatio : 1,
              Industry : '',
              Sector : ''
          };
          that.storedAssets[ticker] = ret;
          resolve(ret);
        }, error : function(err){
            reject(err);
      }});
      
    });
  }
}
