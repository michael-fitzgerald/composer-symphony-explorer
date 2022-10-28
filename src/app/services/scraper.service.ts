import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { AssetDetails } from '../models/AssetFlyweight';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {

  private storedAssets: { [ticker: string]: AssetDetails } = {};

  constructor(private http : HttpClient, private storageService : StorageService) {
    this.storedAssets = storageService.getObject('assetLookup') || {};
  }


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
      that.http.get('https://proxy.cors.sh/https://stockmarketmba.com/analyze.php?s=' + ticker,
      {responseType: 'text'})
      .subscribe({
        next : function(succ : any) {

          let testNodes = $.parseHTML(succ);
          let parsedDoc = $(testNodes.filter(node => $(node).hasClass('container-fluid'))[0]);
         
          let nameInfoContainer = parsedDoc.find('#tabs-1 > div.row.clearfix > div.col-md-8 > h3');

          let assetLink = nameInfoContainer.find('a').remove().attr('href');
          let assetName = nameInfoContainer.text().trim();

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

          let levMatch = /Leverage factor:(?:&nbsp;){2}([-\d.]+)/g.exec(assetInfoText);

          let sectorMatch = /sector:(?:&nbsp;){2}(.*?)<br>/gi.exec(assetInfoText);
          let industryMatch = /industry:(?:&nbsp;){2}(.*?)<br>/gi.exec(assetInfoText);
         
          let ret : AssetDetails = {
              Name : assetName,
              Category1 : categories?.[0],
              Category2 : categories?.[1],
              Category3 : categories?.[2],
              LeverageRatio : parseFloat(levMatch?.[1] || '1'),
              Sector : sectorMatch?.[1],
              Industry : industryMatch?.[1],
              Link : assetLink
          };
          that.storedAssets[ticker] = ret;
          that.storageService.setObject('assetLookup', that.storedAssets);
          resolve(ret);
        }, error : function(err){
            reject(err);
      }});
      
    });
  }
}
