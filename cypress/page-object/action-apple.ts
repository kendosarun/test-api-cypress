export class AppleLandingPage {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    LandingPage(arrayNumber: number, key: string, value: string) {
        cy.request('GET', `${this.endpoint}`).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body.results[0].sectionResults[arrayNumber]).to.have.property(key, value);
            
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
    }

    CheckIPhoneProduct(idx: string, name: RegExp, price: RegExp) {

        cy.get(`#gallery-item-${idx} > div.product-tile-header > div.product-tile-product-id.product-tile-padding > h3 > p`).contains(name);
        cy.get(`#gallery-item-${idx} > p.product-tile-price.product-tile-padding.has-dynamic-content > span`).contains(price);
    }

    AssertURLAndTitle(url: string, title: string) {
        
        cy.url().should('include', url);
        cy.title().should('include', title);

    }

    AssertNameProduct(property: string, key: string, nameOrPrice: string|number) {

        cy.request('GET', `${this.endpoint}`).then((value: Cypress.Response<any>) => {
            expect(value.status).to.eq(200);
            expect(value.body.items[property]).to.have.property(key, nameOrPrice);
        });
    }

    AssertPriceProduct(property: string, key: string, nameOrPrice: string|number) {

        cy.request('GET', `${this.endpoint}`).then((value: Cypress.Response<any>) => {
            expect(value.status).to.eq(200);
            expect(value.body.items[property].price).to.have.property(key, nameOrPrice);

        });
    }
}