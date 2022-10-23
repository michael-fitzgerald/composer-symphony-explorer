import { Pipe, PipeTransform } from '@angular/core';
import { AssetFlyweight } from '../models/AssetFlyweight';

@Pipe({
  name: 'asset'
})
export class AssetPipe implements PipeTransform {

  transform(items: AssetFlyweight[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => {
      if(filter.invest){
        return item.IsInvest;
      }
      if(filter.compare){
        return item.IsCompare;
      }
      return true;
    });
}

}
