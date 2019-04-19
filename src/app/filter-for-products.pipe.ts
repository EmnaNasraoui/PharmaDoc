import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterForProducts'
})
export class FilterForProductsPipe implements PipeTransform {

  transform(items: any, filter: any, isAnd: boolean): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isAnd) {
        return items.filter(item =>
            filterKeys.reduce((memo, Name) =>
                (memo && new RegExp(filter[Name], 'gi').test(item[Name])) || filter[Name] === "", true));
      } else {
        return items.filter(item => {
          return filterKeys.some((Price) => {
            console.log(Price);
            return new RegExp(filter[Price], 'gi').test(item[Price]) || filter[Price] === "";
          });
        });
      }
    } else {
      return items;
    }
  }

}
