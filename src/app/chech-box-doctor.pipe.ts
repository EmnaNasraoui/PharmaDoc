import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chechBoxDoctor'
})
export class ChechBoxDoctorPipe implements PipeTransform {

  transform(value: any[], searchJson: any) {


    if (searchJson.specialty.length === 0) {
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
      let specialty;
      if (searchJson.specialty.length !== 0) {
        specialty = searchJson.specialty.includes(it.specialty);
      } else {
        specialty = true;
      }

      return specialty;
    });
  }

}
