import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkBoxFiltre'
})
export class CheckBoxFiltrePipe implements PipeTransform {

  transform(value: any[], searchJson: any) {

    if (searchJson.Product_Category.length === 0) {
      return value;
    }

    Array.prototype['equals'] = function (array) {
      if (!array) {
        return false;
      }
      for (let i = 0, l = this.length; i < l; i++) {
        if (array.includes(this[i])) {
          return true;
        }
      }
      return false;
    };

    return value.filter(it => {
      let Product_Category;
      if (searchJson.Product_Category.length !== 0) {
        Product_Category = searchJson.Product_Category.includes(it.Product_Category);
      } else {
        Product_Category = true;
      }

      return Product_Category;
    });
  }

}
