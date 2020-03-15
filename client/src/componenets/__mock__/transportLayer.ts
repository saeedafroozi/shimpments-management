const faker = require('faker');
export default class TransportLayer implements ITransportLayer {
    getServerData(url: string, changePagination: boolean = true): Promise<ResponseResult> {
        return new Promise((resolve, reject) => {

            const mocks: Shipment[] = [];
            mocks.push({
                id: `S${2}`,
                name: faker.name.title(),
                cargo: [{
                    type: faker.finance.transactionType(),
                    description: faker.lorem.text(),
                    volume: faker.random.number()
                }, {
                    type: faker.finance.transactionType(),
                    description: faker.lorem.text(),
                    volume: faker.random.number()
                }],
                mode: faker.name.title(),
                type: faker.name.jobType(),
                destination: faker.lorem.text(),
                origin: faker.company.companyName(),
                services: [{
                    type: faker.company.companySuffix()
                }],
                total: faker.random.number(),
                status: faker.finance.mask(),
                userId: `U${3}`
            });

            resolve({
                value: mocks,
                total: mocks.length
            });

        });
    }
}
