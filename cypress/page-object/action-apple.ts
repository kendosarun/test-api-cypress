export class AppleLandingPage {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    LandingPage(arrayNumber: number, key: string, value: string) {
        cy.request('GET', `${this.endpoint}`).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body.results[0].sectionResults[arrayNumber]).to.have.property(key, value);

            // expect(response.body.results[0].sectionResults[0]).to.have.property('label', 'ค้นหาร้าน');
            // expect(response.body.results[0].sectionResults[0]).to.have.property('url', 'https://www.apple.com/th/retail/');

            // expect(response.body.results[0].sectionResults[1]).to.have.property('label', 'อุปกรณ์เสริม');
            // expect(response.body.results[0].sectionResults[1]).to.have.property('url', 'https://www.apple.com/th/shop/goto/accessories/apple_accessories');

            // expect(response.body.results[0].sectionResults[2]).to.have.property('label', 'AirPods');
            // expect(response.body.results[0].sectionResults[2]).to.have.property('url', 'https://www.apple.com/th/airpods/');
            
        });
    }
}

export class AppleIPhoneMenu {

    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    ClickIPhoneTab(tabName: RegExp) {

        cy.get('[data-globalnav-item-name="iphone"]').contains(tabName);
        cy.get('[data-globalnav-item-name="iphone"]').click();

        // cy.fixture(appleJsonFile).then((expectedResponseBody) => {
        //     // Template Literals
        //     cy.request('GET', `${endpoint}`).then((response) => {
        //         expect(response.status).to.eq(200);
        //         // Remove the 'id' field from both actual and expected responses
        //         const actualResponseWithoutId = Cypress._.omit(response.body, 'id');
        //         const expectedResponseWithoutId = Cypress._.omit(expectedResponseBody, 'id');

        //         expect(actualResponseWithoutId).to.deep.equal(expectedResponseWithoutId);
        //     });
        // });
    }

    AssertNameProduct(property: any, key: string, nameOrPrice: string|number) {

        cy.request('GET', `${this.endpoint}`).then((value: Cypress.Response<any>) => {
            expect(value.status).to.eq(200);
            expect(value.body.items[property]).to.have.property(key, nameOrPrice);

            // expect(value.body.items.IPHONE14_MAIN).to.have.property('name', 'iPhone 14');
            // expect(value.body.items.IPHONE14_MAIN.price).to.have.property('value', 29900.00);

            // expect(value.body.items.IPHONE15PRO_MAIN).to.have.property('name', 'iPhone 15 Pro');
            // expect(value.body.items.IPHONE15PRO_MAIN.price).to.have.property('value', 41900.00);
        });
    }

    AssertPriceProduct(property: any, key: string, nameOrPrice: string|number) {

        cy.request('GET', `${this.endpoint}`).then((value: Cypress.Response<any>) => {
            expect(value.status).to.eq(200);
            expect(value.body.items[property].price).to.have.property(key, nameOrPrice);

        });
    }
}