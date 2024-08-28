import { AppleIPhoneMenu, AppleLandingPage } from "../page-object/action-apple";

describe('Basic Cypress', () => {

    const endpointLanding = `https://www.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=th_TH`;
    const endpointIphoneTab = 'https://www.apple.com/th/shop/mcm/product-price?parts=IPHONE15PRO_MAIN,IPHONE15_MAIN,IPHONE14_MAIN,IPHONE13_MAIN,IPHONESE3_MAIN';

    const appleJsonFile = `response-body-apple.json`;

    const homepage = new AppleLandingPage(endpointLanding);
    const iPhoneTab = new AppleIPhoneMenu(endpointIphoneTab);

    beforeEach(() => {
        cy.visit('https://www.apple.com/th/');
    });

    afterEach(() => {
        cy.wait(2000);
    });

    it('Assertion API 1', () => {

        homepage.LandingPage(0, 'label', 'ค้นหาร้าน');
        homepage.LandingPage(1, 'label', 'อุปกรณ์เสริม');
        homepage.LandingPage(2, 'label', 'AirPods');

    });

    it('Assertion API 2', () => {

        iPhoneTab.ClickIPhoneTab(/^iPhone/);

        iPhoneTab.AssertNameProduct(`IPHONE14_MAIN`, 'name', 'iPhone 14' as string);
        iPhoneTab.AssertPriceProduct(`IPHONE14_MAIN`, 'value', 29900.00 as number)

        iPhoneTab.AssertNameProduct(`IPHONE15PRO_MAIN`, 'name', 'iPhone 15 Pro' as string);
        iPhoneTab.AssertPriceProduct(`IPHONE15PRO_MAIN`, 'value', 41900.00 as number)

    });
});