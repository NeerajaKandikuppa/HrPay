export class LoginPage {

constructor(page) {

this.page = page

this.companyId_textbox = page.getByRole('textbox', { name: 'Company ID' })
this.continueToUsername_button = page.getByRole('button', { name: 'Continue to username' })
this.username_textbox = page.getByRole('textbox', { name: 'Username' })
this.continueToPassword_button = page.getByRole('button', { name: 'Continue to password' })
this.password_textbox = page.getByRole('textbox', { name: 'Password' })
this.login_button = page.getByRole('button', { name: 'Log in' })
}

async gotostaging() {

await this.page.goto('https://stage.dayforcehcm.com/mydayforce/login.aspx')
}

async login(companyid, username, password) {

		await this.companyId_textbox.fill(companyid)
		await this.continueToUsername_button.click()
		await this.username_textbox.fill(username)
		await this.continueToPassword_button.click()
		await this.password_textbox.fill(password)
		await this.login_button.click()
}


}