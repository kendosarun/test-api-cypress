describe('Basic Cypress', () => {
    // Template Strings use back-ticks (``) 
    const endpoint = `https://www.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=th_TH`;

    const endpointIphone = 'https://www.apple.com/th/shop/mcm/product-price?parts=IPHONE15PRO_MAIN,IPHONE15_MAIN,IPHONE14_MAIN,IPHONE13_MAIN,IPHONESE3_MAIN';

    const appleJsonFile = `response-body-apple.json`;

    beforeEach(() => {
        cy.visit('https://www.apple.com/th/');
    });

    afterEach(() => {
        cy.wait(2000);
    });

    it('Assertion API 1', () => {

        // Template Literals
        cy.request('GET', `${endpoint}`).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body.results[0].sectionResults[0]).to.have.property('label', 'ค้นหาร้าน');
            expect(response.body.results[0].sectionResults[0]).to.have.property('url', 'https://www.apple.com/th/retail/');

            expect(response.body.results[0].sectionResults[1]).to.have.property('label', 'อุปกรณ์เสริม');
            expect(response.body.results[0].sectionResults[1]).to.have.property('url', 'https://www.apple.com/th/shop/goto/accessories/apple_accessories');

            expect(response.body.results[0].sectionResults[2]).to.have.property('label', 'AirPods');
            expect(response.body.results[0].sectionResults[2]).to.have.property('url', 'https://www.apple.com/th/airpods/');
            
        });

    });

    it('Assertion API 2', () => {

        cy.fixture(appleJsonFile).then((expectedResponseBody) => {
            // Template Literals
            cy.request('GET', `${endpoint}`).then((response) => {
                expect(response.status).to.eq(200);
                // Remove the 'id' field from both actual and expected responses
                const actualResponseWithoutId = Cypress._.omit(response.body, 'id');
                const expectedResponseWithoutId = Cypress._.omit(expectedResponseBody, 'id');

                expect(actualResponseWithoutId).to.deep.equal(expectedResponseWithoutId);
            });
        });

        cy.get('[data-globalnav-item-name="mac"]').contains(/^Mac$/);

        cy.get('[data-globalnav-item-name="iphone"]').click();

        cy.request('GET', `${endpointIphone}`).then((value: Cypress.Response<any>) => {
            expect(value.status).to.eq(200);

            expect(value.body.items.IPHONE14_MAIN).to.have.property('name', 'iPhone 14');
            expect(value.body.items.IPHONE14_MAIN.price).to.have.property('value', 29900.00);

            expect(value.body.items.IPHONE15PRO_MAIN).to.have.property('name', 'iPhone 15 Pro');
            expect(value.body.items.IPHONE15PRO_MAIN.price).to.have.property('value', 41900.00);
        })

    });
});