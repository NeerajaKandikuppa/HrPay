export class BankAccountsPage {

  constructor(page) {
	this.page = page

	// Navigation elements
	this.payrollSetup_menu = page.getByRole('link', { name: /Payroll Setup/i })
	this.bankAccounts_link = page.getByRole('link', { name: /Bank Accounts/i })

	// Add button
	this.add_button = page.getByRole('button', { name: /Add/i })

	// Form fields
	this.name_input = page.getByLabel(/Name/i)
	this.operatingCountry_dropdown = page.getByLabel(/Operating Country/i)
	this.institutionNumber_input = page.getByLabel(/Institution Number/i)
	this.branchNumber_input = page.getByLabel(/Branch Number/i)
	this.accountNumber_input = page.getByLabel(/Account Number/i)

	// Save button
	this.save_button = page.getByRole('button', { name: /Save/i })

	// Success message
	this.successMessage = page.getByRole('status')
  }

  async navigateToPayrollSetup() {
	// Click on Payroll Setup in the main menu
	await this.payrollSetup_menu.click()
  }

  async navigateToBankAccounts() {
	// Click on Bank Accounts link
	await this.bankAccounts_link.click()
	// Wait for page to load
	await this.page.waitForLoadState('networkidle')
  }

  async clickAddButton() {
	await this.add_button.click()
	// Wait for form to load
	await this.page.waitForLoadState('networkidle')
  }

  async fillBankAccountForm(accountData) {
	// Fill account name
	if (accountData.name) {
	  await this.name_input.fill(accountData.name)
	}

	// Select operating country
	if (accountData.operatingCountry) {
	  await this.operatingCountry_dropdown.click()
	  await this.page.getByRole('option', { name: new RegExp(accountData.operatingCountry, 'i') }).click()
	}

	// Fill institution number
	if (accountData.institutionNumber) {
	  await this.institutionNumber_input.fill(accountData.institutionNumber)
	}

	// Fill branch number
	if (accountData.branchNumber) {
	  await this.branchNumber_input.fill(accountData.branchNumber)
	}

	// Fill account number
	if (accountData.accountNumber) {
	  await this.accountNumber_input.fill(accountData.accountNumber)
	}
  }

  async saveBankAccount() {
	await this.save_button.click()
	// Wait for save operation to complete
	await this.page.waitForLoadState('networkidle')
  }

  async getSuccessMessage() {
	// Wait for success message and return its text
	await this.successMessage.waitFor({ state: 'visible', timeout: 5000 })
	return await this.successMessage.textContent()
  }

  async addBankAccount(accountData) {
	// Complete workflow: click Add, fill form, save
	await this.clickAddButton()
	await this.fillBankAccountForm(accountData)
	await this.saveBankAccount()
  }

}
