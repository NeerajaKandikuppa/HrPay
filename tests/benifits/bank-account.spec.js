// spec: Create test to add bank account in Dayforce
// seed: tests/payroll/add-bank-account.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { BankAccountsPage } from '../../pages/bankAccounts';

test.describe('Payroll Setup - Bank Accounts', () => {
  test('Add Bank Account', async ({ page }) => {
	// 1. Login to Dayforce staging environment
	const login = new LoginPage(page);
	await login.gotostaging();
	await login.login('sipartnerdeloitteca01stage', 'Neeraja.Kandikuppa', 'Dayforce@123');

	// 2. Navigate to Payroll Setup
	const bankAccounts = new BankAccountsPage(page);
	await bankAccounts.navigateToPayrollSetup();

	// 3. Navigate to Bank Accounts
	await bankAccounts.navigateToBankAccounts();

	// 4. Click Add button
	await bankAccounts.clickAddButton();

	// 5. Fill bank account form with test data
	const accountData = {
	  name: 'testaccount',
	  operatingCountry: 'Canada',
	  institutionNumber: '003',
	  branchNumber: '01904',
	  accountNumber: '12345'
	};
	await bankAccounts.fillBankAccountForm(accountData);

	// 6. Save the new bank account
	await bankAccounts.saveBankAccount();

	// 7. Verify success message appears
	const successMessage = await bankAccounts.getSuccessMessage();
	expect(successMessage).toBeTruthy();
	expect(successMessage.toLowerCase()).toContain('success');
  });
});
