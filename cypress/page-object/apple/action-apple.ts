export class AppleLandingPage {
  endpoint: string;
  filePath: string;

  constructor(endpoint: string, filePath: string) {
    this.endpoint = endpoint;
    this.filePath = filePath;
  }

  specificResponse(arrayNumber: number, key: string, value: string) {
    cy.request("GET", `${this.endpoint}`).then((response) => {
      expect(response.status).to.eq(200);

      expect(
        response.body.results[0].sectionResults[arrayNumber]
      ).to.have.property(key, value);
    });
  }

  validateMenuResponseBody() {
    cy.fixture(this.filePath).then((jsonFile) => {
      cy.request("GET", `${this.endpoint}`).then((response) => {
        expect(response.status).to.eq(200);

        const omitFieldIdFromJsonFile = Cypress._.omit(jsonFile, "id");
        const omitFieldIdFromResponse = Cypress._.omit(response.body, "id");

        expect(omitFieldIdFromResponse).to.deep.equal(omitFieldIdFromJsonFile);
      });
    });
  }
}

export class AppleIPhoneMenu {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  clickIPhoneTab(tabName: RegExp) {
    cy.get('[data-globalnav-item-name="iphone"]').contains(tabName);
    cy.get('[data-globalnav-item-name="iphone"]').click();
  }

  checkIPhoneProduct(idx: string, name: RegExp, price: RegExp) {
    cy.get(
      `#gallery-item-${idx} > div.product-tile-header > div.product-tile-product-id.product-tile-padding > h3 > p`
    ).contains(name);
    cy.get(
      `#gallery-item-${idx} > p.product-tile-price.product-tile-padding.has-dynamic-content > span`
    ).contains(price);
  }

  verifyURLAndTitlePage(url: string, title: string) {
    cy.url().should("include", url);
    cy.title().should("include", title);
  }

  responseNameProduct(
    property: string,
    key: string,
    nameOrPrice: string | number
  ) {
    cy.request("GET", `${this.endpoint}`).then(
      (value) => {
        expect(value.status).to.eq(200);
        expect(value.body.items[property]).to.have.property(key, nameOrPrice);
      }
    );
  }

  responsePriceProduct(
    property: string,
    key: string,
    nameOrPrice: string | number
  ) {
    cy.request("GET", `${this.endpoint}`).then(
      (value) => {
        expect(value.status).to.eq(200);
        expect(value.body.items[property].price).to.have.property(
          key,
          nameOrPrice
        );
      }
    );
  }

  clickBuyLink(locatorProduct: string) {
    cy.get(`[data-analytics-title="buy - ${locatorProduct}"]`).click();
  }

  selectSpecIPhone15(
    product: string,
    color: number,
    memory: number,
    appleCare: boolean
  ) {
    console.log(appleCare);
    if ((product = "Plus")) {
      cy.get(`[data-autom="pricedimensionScreensize6_7inch"]`).click({
        force: true,
      });
    } else {
      cy.get(`[data-autom="dimensionScreensize6_1inch"]`).click({
        force: true,
      });
    }

    // select color -> 1 blue, 2 red, 3 yellow, 4 green, 5 black
    cy.get(`:nth-child(${color}) > .colornav-link > .colornav-swatch`).click();

    if (memory === 128) {
      cy.get(`[data-autom="pricedimensionCapacity128gb"]`)
        .should("exist")
        .click({ force: true });
    } else if (memory === 256) {
      cy.get('[data-autom="pricedimensionCapacity256gb"]')
        .should("exist")
        .click({ force: true });
    } else {
      cy.get('[data-autom="pricedimensionCapacity512gb"]')
        .should("exist")
        .click({ force: true });
    }

    // cy.contains(memory).click()  สามารถใช้แทน it else ข้างบนไ้ด้


    if (appleCare) {
      cy.get("#applecareplus_59_applecare_59_open").click();
      cy.get(".button-super").click();
    } else {
      cy.get("#applecareplus_59_noapplecare_label").click();
    }

    cy.get('[data-autom="add-to-cart"]').should("be.enabled").click();
  }

  clickCheckoutButton() {
    cy.get(`[data-autom="proceed"]`).should("be.enabled").click();
  }

  verifyProductOnCheckOutPage(item: RegExp) {
    cy.get('[data-autom="bag-item-name"]').contains(item);
  }
}
