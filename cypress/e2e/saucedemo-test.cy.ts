import { User } from "../models/saucedemo";
import { LoginPage } from "../page-object/saucedemo/login-page";

describe('Sauce demo', () => {


    const userList: User[] = [
        {userName: "HarryPotter", password: "password1"},
        {userName: "HermioneGranger", password: "password2"},
        {userName: "RonWeasley", password: "password3"},
        {userName: "AlbusDumbledore", password: "password4"},
        {userName: "SeverusSnape", password: "password5"},
        {userName: "RubeusHagrid", password: "password6"},
        {userName: "DracoMalfoy", password: "password7"},
        {userName: "SiriusBlack", password: "password8"},
        {userName: "RemusLupin", password: "password9"},
        {userName: "MinervaMcGonagall", password: "password10"},
        {userName: "GellertGrindelwald", password: "password11"},
        {userName: "Voldemort", password: "password12"},
        {userName: "LunaLovegood", password: "password13"},
        {userName: "NevilleLongbottom", password: "password14"},
        {userName: "GinnyWeasley", password: "password15"},
        {userName: "FredWeasley", password: "password16"},
        {userName: "GeorgeWeasley", password: "password17"},
        {userName: "CedricDiggory", password: "password18"},
        {userName: "ChoChang", password: "password19"},
        {userName: "NymphadoraTonks", password: "password20"}
    ];

    const login = new LoginPage();
    

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    afterEach(() => {
        cy.wait(500);
    });

    userList.forEach((value) => {
        it(`login failed with user -> ${value.userName}`, () => {

        login.InvalidUser(value.userName, value.password)

        });
    });
});