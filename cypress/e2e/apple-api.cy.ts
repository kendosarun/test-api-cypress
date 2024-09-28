import { AppleIPhoneMenu, AppleLandingPage } from "../page-object/apple/action-apple";

describe('Basic Cypress', () => {

    const endpointLanding = `https://www.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=th_TH`;
    const endpointIphoneTab = 'https://www.apple.com/th/shop/mcm/product-price?parts=IPHONE16PRO,IPHONE16,IPHONE15_MAIN,IPHONE14_MAIN,IPHONESE3_MAIN';

    const appleJsonFile = `response-body-apple.json`;

    const homepage = new AppleLandingPage(endpointLanding, appleJsonFile);
    const iPhoneTab = new AppleIPhoneMenu(endpointIphoneTab);

    beforeEach(() => {
        cy.visit('https://www.apple.com/th/');
    });

    afterEach(() => {
        cy.wait(2000);
    });

    it('verify API response Apple Menu in Homepage', () => {

        homepage.specificResponse(0, 'label', 'ค้นหาร้าน');
        homepage.specificResponse(1, 'label', 'อุปกรณ์เสริม');
        homepage.specificResponse(2, 'label', 'AirPods');

        homepage.validateMenuResponseBody();

    });

    it('user navigate to IPhone Menu and validate Product & Price should be correct', () => {

        iPhoneTab.clickIPhoneTab(/^iPhone/);

        iPhoneTab.verifyURLAndTitlePage('https://www.apple.com/th/iphone/', 'iPhone - Apple (TH)');

        // iPhoneTab.checkIPhoneProduct('0', /iPhone 15 Pro/, /41,900$/);
        // iPhoneTab.checkIPhoneProduct('1', /iPhone 15/, /32,900$/);
        // iPhoneTab.checkIPhoneProduct('2', /iPhone 14/, /29,900$/);
        // iPhoneTab.checkIPhoneProduct('3', /iPhone 13/, /24,900$/);

    
        // iPhoneTab.responseNameProduct(`IPHONE14_MAIN`, 'name', 'iPhone 14');
        // iPhoneTab.responsePriceProduct(`IPHONE14_MAIN`, 'value', 29900.00 as number)

        iPhoneTab.responseNameProduct(`IPHONE16PRO`, 'name', 'iPhone 16 Pro' as string);
        iPhoneTab.responsePriceProduct(`IPHONE16PRO`, 'value', 39900.00 as number);

        iPhoneTab.clickBuyLink('iphone 16 pro');

        // select color -> 1 pink, 2 gray, 3 white, 4 gold
        //select memory is number -> 128, 256, 512
        iPhoneTab.selectSpecIPhone16Pro(
            'ProMax',
            2,
            512,
            true
        );

        iPhoneTab.clickCheckoutButton();

        iPhoneTab.verifyProductOnCheckOutPage(/iPhone 16 Pro Max 512GB สีไทเทเนียมธรรมชาติ/);

    });

    it('user search keyword with `Android` in Apple page', () => {

        cy.get(`#globalnav-menubutton-link-search`).click();

        cy.wait(1000);

        cy.get('#globalnav-submenu-search > div > div > form > div.globalnav-searchfield-wrapper > input.globalnav-searchfield-input').type('Android{enter}');

        cy.url().should('include','/search/Android?');

        cy.title().should('include', 'Android - Apple (TH)');
        // cy.title().contains('Android - Apple (TH)');
    });
});