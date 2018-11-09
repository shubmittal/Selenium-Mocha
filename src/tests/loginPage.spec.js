import App from '../pageObjects/App';
import {getDriver, cleanupDriver} from '../utilities/driverManager';
import {expect, assert} from 'chai'


describe("LoginPage", ()=> {

    let app;
    let loginPage;
    let driver;
    beforeEach(async()=> {
        driver =await getDriver();        
        app =  new App(driver);
        app.navigateToApp();
        loginPage =  app.getLoginPage();
           })
    
    afterEach(async()=> {
        await cleanupDriver(driver)
    })

    it("should show error if email is incorrect", async()=> {
        await loginPage.setBlankEmail();
        let result = await loginPage.isPresentErrorMessageFor("email_blank");
       assert.isTrue(result);
    })

    it("should show error if email is blank", async()=> {
        await loginPage.setBlankPassword();
        let result = await loginPage.isPresentErrorMessageFor("password_blank");
       assert.isTrue(result);
    })
    it("should show error if password is blank", async()=> {
        await loginPage.setEmail("asss");
        let result = await loginPage.isPresentErrorMessageFor("email_incorrectformat");
       assert.isTrue(result);
    })
    it("should show error if username and password are incorrect", async()=> {
       let result = await loginPage.loginWithIncorrectCredentials();
       assert.isTrue(result);
    })

    it("should navigate to dashboard if username and password are correct", async()=> {
        let result = await loginPage.loginWithCorrectCredentials();
        assert.isTrue(result);
     })
})