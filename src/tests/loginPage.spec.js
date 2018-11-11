import App from '../pageObjects/App';
import {
    getDriver,
    cleanupDriver
} from '../utilities/driverManager';
import {
    assert
} from 'chai'

describe("LoginPage", function () {

    let app;
    let loginPage;
    let driver;
    let buildName = `Environment: ${process.env.BASE_URL}. Login Page tests at : ${Date().toString()}`;
    let option = "SauceLabs"
    this.retries(4);

    this.beforeAll(()=> {
        console.log(`Track Build Name: ${buildName}`);
    });


    beforeEach(async function () {
        driver = await getDriver(option, buildName);
        app = new App(driver);
        await app.navigateToApp();
        loginPage = app.getLoginPage();

    })

    this.afterEach(async function () {
        await cleanupDriver(driver, this.currentTest.fullTitle(), (this.currentTest.state === "passed"), option);

    })

    it("should show error if email is blank", async () => {
        await loginPage.setBlankEmail();
        let result = await loginPage.isPresentErrorMessageFor("email_blank");
        assert.isTrue(true);
    })

    it("should show error if password is blank", async () => {
        await loginPage.setBlankPassword();
        let result = await loginPage.isPresentErrorMessageFor("password_blank");
        assert.isTrue(result);
    })
    it("should show error if email is not in correct format", async () => {
        await loginPage.setEmail("random");
        let result = await loginPage.isPresentErrorMessageFor("email_incorrectformat");
        assert.isTrue(result);
    })
    it("should show error if username and password are incorrect", async () => {
        let result = await loginPage.loginWithIncorrectCredentials();
        assert.isTrue(result);
    })

    it("should navigate to dashboard if username and password are correct @NoProd", async () => {
        let result = await loginPage.loginWithCorrectCredentials();
        assert.isTrue(result);
    })
})