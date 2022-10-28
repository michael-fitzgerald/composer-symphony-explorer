import { Pipe, PipeTransform } from '@angular/core';
import { SymphonyFlyweight } from '../models/SymphonyFlyweight';

@Pipe({
  name: 'symphonyByAsset'
})
export class SymphonyByAssetPipe implements PipeTransform {

  transform(items: SymphonyFlyweight[], filter: string): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => {
      if(!filter?.length) return true;
      return !!item.Assets.filter(x => x.Ticker.toLowerCase() == filter.toLowerCase())[0]
    });
  }

}
