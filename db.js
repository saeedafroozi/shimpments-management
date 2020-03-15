 const faker=require('faker');
let generateShipments = () => {
    let shipments = [];

    for (let i = 0; i < 500; i++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();

        shipments.push(
            {
                "id": `S${i}`,
                "name": faker.name.title(),
                "cargo": [{
                    "type": faker.finance.transactionType(),
                    "description": faker.lorem.text(),
                    "volume": faker.random.number()
                }, {
                    "type": faker.finance.transactionType(),
                    "description": faker.lorem.text(),
                    "volume": faker.random.number()
                }],
                "mode": faker.name.title(),
                "type": faker.name.jobType(),
                "destination": faker.lorem.text(),
                "origin": faker.company.companyName(),
                "services": [{
                    "type": faker.company.companySuffix()
                }],
                "total": faker.random.number(),
                "status": faker.finance.mask(),
                "userId": `U${i}`
            }
        );
    }

    return { "shipments": shipments }
}

module.exports = generateShipments