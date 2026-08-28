import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login'


test('test @demo', async ({ page }) => {
  
const Login = new LoginPage(page);

  await Login.gotostaging()
  await Login.login('sipartnerdeloitteca01stage', 'neeraja.kandikuppa', 'Dayforce@123')

});