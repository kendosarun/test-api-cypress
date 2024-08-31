import { AppleIPhoneMenu, AppleLandingPage } from "../page-object/action-apple";

describe('Basic Cypress', () => {

    const endpointLanding = `https://www.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=th_TH`;
    const endpointIphoneTab = 'https://www.apple.com/th/shop/mcm/product-price?parts=IPHONE15PRO_MAIN,IPHONE15_MAIN,IPHONE14_MAIN,IPHONE13_MAIN,IPHONESE3_MAIN';

    // const appleJsonFile = `response-body-apple.json`;

    const homepage = new AppleLandingPage(endpointLanding);
    const iPhoneTab = new AppleIPhoneMenu(endpointIphoneTab);

    beforeEach(() => {
        cy.visit('https://www.apple.com/th/');
    });

    afterEach(() => {
        cy.wait(2000);
    });

    it.skip('Assertion API 1', () => {

        homepage.LandingPage(0, 'label', 'ค้นหาร้าน');
        homepage.LandingPage(1, 'label', 'อุปกรณ์เสริม');
        homepage.LandingPage(2, 'label', 'AirPods');

    });

    it('user navigate to IPhone Menu and validate Product & Price should be correct', () => {

        iPhoneTab.ClickIPhoneTab(/^iPhone/);

        iPhoneTab.CheckIPhoneProduct('0', /iPhone 15 Pro/, /41,900$/);
        iPhoneTab.CheckIPhoneProduct('1', /iPhone 15/, /32,900$/);
        iPhoneTab.CheckIPhoneProduct('2', /iPhone 14/, /29,900$/);
        iPhoneTab.CheckIPhoneProduct('3', /iPhone 13/, /24,900$/);

        iPhoneTab.AssertNameProduct(`IPHONE14_MAIN`, 'name', 'iPhone 14' as string);
        iPhoneTab.AssertPriceProduct(`IPHONE14_MAIN`, 'value', 29900.00 as number)

        iPhoneTab.AssertNameProduct(`IPHONE15PRO_MAIN`, 'name', 'iPhone 15 Pro' as string);
        iPhoneTab.AssertPriceProduct(`IPHONE15PRO_MAIN`, 'value', 41900.00 as number)

    });
});