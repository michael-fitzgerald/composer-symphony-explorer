import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetFlyweight } from 'src/app/models/AssetFlyweight';
import { SymphonyFlyweight } from 'src/app/models/SymphonyFlyweight';

@Component({
  selector: 'app-symphony-view-node',
  templateUrl: './symphony-view-node.component.html',
  styleUrls: ['./symphony-view-node.component.less']
})
export class SymphonyViewNodeComponent implements OnInit {

  @Input() node! : SymphonyFlyweight;
  @Input() portfolioView : boolean = false;

  @Output() deleted = new EventEmitter<string>();

  fullDisplayedColumns: string[] = [
    'ticker', 
    'name',
    'leverage',
    'category1',
    'category2', 
    'category3', 
    // 'sector', 
    // 'industry'
  ];

  liteDisplayedColumns: string[] = [
    'ticker', 
    'name'
  ];
  displayedColumns : string[] = [];

  constructor() { }

  ngOnInit(): void {
      this.displayedColumns = this.portfolioView ? this.liteDisplayedColumns : this.fullDisplayedColumns;
  }

  isNewAsset (row : any, investable : boolean) : boolean {
      if(!this.node.Parent?.Assets?.length) return false;
      let asset = row as AssetFlyweight;
      let prev = this.node.Parent.Assets.filter(x => x.Ticker == asset.Ticker && 
        ((investable && x.IsInvest) || (!investable && x.IsCompare)))[0];
      return !prev;
  }

  getDeletedAssets(investable : boolean) : AssetFlyweight[]{
    let ret : AssetFlyweight[] = [];
    if(!this.node.Parent?.Assets?.length) return ret; // there is no parent, return empty set
    for(let pa of this.node.Parent?.Assets.filter(x =>  ((investable && x.IsInvest) || (!investable && x.IsCompare)))){
      //foreach parent asset
        let current = this.node.Assets.filter(x => x.Ticker == pa.Ticker &&
          ((investable && x.IsInvest) || (!investable && x.IsCompare))
          )[0];
        if(!current){
          //asset not found in the current node. 
          ret.push(pa);
        }
        
    }
    return ret;
  }

  deleteSymphony (){
    this.deleted.emit(this.node.Id);
  }



}
