import { test, expect } from '@playwright/test';

test.describe('User Form Component', () =>
{
    test.beforeEach(async ({ page }) =>
    {
        await page.goto('http://localhost:4200'); // Adjust URL as needed
    });

    test('should render the form', async ({ page }) =>
    {
        await expect(page.locator('h2')).toHaveText('User Feedback Form');
    });

    test('should show validation errors', async ({ page }) =>
    {
        // Try to submit without filling out the form
        await page.click('button[type="submit"]');

        // Check for validation error messages
        await expect(page.locator('p.text-red-500')).toHaveCount(3);
    });

    test('should submit form successfully', async ({ page }) =>
    {
        // Fill out the form
        await page.fill('input[formControlName="name"]', 'John Doe');
        await page.fill('input[formControlName="email"]', 'john@example.com');
        await page.fill('textarea[formControlName="message"]', 'This is a test message for E2E testing');

        // Submit the form
        await page.click('button[type="submit"]');

        // Check if submission appears in the recent submissions list
        const submissions = page.locator('div.bg-gray-100');
        await expect(submissions).toHaveCount(1);
        await expect(submissions.first()).toContainText('John Doe');
    });

    test('should limit submissions to 5', async ({ page }) =>
    {
        // Submit multiple forms
        for (let i = 0; i < 6; i++)
        {
            await page.fill('input[formControlName="name"]', `User ${i}`);
            await page.fill('input[formControlName="email"]', `user${i}@example.com`);
            await page.fill('textarea[formControlName="message"]', `Test message ${i}`);
            await page.click('button[type="submit"]');
        }

        // Verify only 5 submissions are shown
        const submissions = page.locator('div.bg-gray-100');
        await expect(submissions).toHaveCount(5);
    });
});