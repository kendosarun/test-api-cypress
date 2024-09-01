import { AppleIPhoneMenu, AppleLandingPage } from "../page-object/action-apple";

describe('Basic Cypress', () => {

    const endpointLanding = `https://www.apple.com/search-services/suggestions/defaultlinks/?src=globalnav&locale=th_TH`;
    const endpointIphoneTab = 'https://www.apple.com/th/shop/mcm/product-price?parts=IPHONE15PRO_MAIN,IPHONE15_MAIN,IPHONE14_MAIN,IPHONE13_MAIN,IPHONESE3_MAIN';

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

        iPhoneTab.checkIPhoneProduct('0', /iPhone 15 Pro/, /41,900$/);
        iPhoneTab.checkIPhoneProduct('1', /iPhone 15/, /32,900$/);
        iPhoneTab.checkIPhoneProduct('2', /iPhone 14/, /29,900$/);
        iPhoneTab.checkIPhoneProduct('3', /iPhone 13/, /24,900$/);

        iPhoneTab.responseNameProduct(`IPHONE14_MAIN`, 'name', 'iPhone 14' as string);
        iPhoneTab.responsePriceProduct(`IPHONE14_MAIN`, 'value', 29900.00 as number)

        iPhoneTab.responseNameProduct(`IPHONE15PRO_MAIN`, 'name', 'iPhone 15 Pro' as string);
        iPhoneTab.responsePriceProduct(`IPHONE15PRO_MAIN`, 'value', 41900.00 as number);

        iPhoneTab.clickBuyLink('iphone 15');

        // select color -> 1 blue, 2 red, 3 yellow, 4 green, 5 black
        //select memory is number -> 128, 256, 512
        iPhoneTab.selectSpecIPhone15(
            'plus',
            2,
            512,
            false
        );

        iPhoneTab.clickCheckoutButton();

        iPhoneTab.verifyProductOnCheckOutPage(/iPhone 15 ความจุ 128GB สีชมพู/);

    });
});