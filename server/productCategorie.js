let Enum = require('enum')


let categorieEnum = new Enum({
  'drug': 1,
  'bio product': 2,
  'aesthetic product': 3,
  'accessory': 4
},
{ ignoreCase: true }
)

let categories = []

categorieEnum.enums.forEach(function (enumItem) {
    categories.push(enumItem.value)
})
let errorMessage = 'user role shall be one of these values: ' + categories

module.exports = {
    categorieEnum: categorieEnum,
  errorMessage: errorMessage,
  categories: categories
}



