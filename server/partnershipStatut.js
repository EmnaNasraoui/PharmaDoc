let Enum = require('enum')

let PartnerShipStatusEnum = new Enum({
    'pending': 1,
    'affected': 2,
    'rejected': 3
},
    { ignoreCase: true }
)

let errorMessage = 'PartnerShip status shall be one of these values: '
PartnerShipStatusEnum.enums.forEach(function (enumItem) {
    errorMessage += enumItem.value + '-'
})

module.exports = {
    PartnerShipStatusEnum: PartnerShipStatusEnum,
    errorMessage: errorMessage
}
