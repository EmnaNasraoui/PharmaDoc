import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrePrice'
})
export class FiltrePricePipe implements PipeTransform {
  minValue: any;
  maxValue: any;

  transform(value: any[], min: any,max: any) {
     return value.filter(obj => obj.Price >= min && obj.Price <= max);
  }

}
