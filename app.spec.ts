import { test, expect } from '@playwright/test';

test.describe('Sample Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the sample application before running each test
    await page.goto('/');
  });

  test('should toggle Random Mode and observe node selection', async ({ page }) => {
    // Toggle Random Mode on
    await page.click('[data-cy=random-mode-toggle]');
    
    // Perform and verify random selection
    // This requires specific implementation details based on the UI
    
    // Toggle Random Mode off
    await page.click('[data-cy=random-mode-toggle]');
    
    // Perform and verify manual selection
  });

  test('should refresh random nodes when the refresh icon is clicked', async ({ page }) => {
    // Toggle Random Mode on
    await page.click('[data-cy=random-mode-toggle]');
    
    // Click the refresh icon
    await page.click('[data-cy=refresh-icon]');
    
    // Verify nodes are refreshed
    // Implementation details needed
  });

  test('should select From and To nodes correctly', async ({ page }) => {
    // Toggle Random Mode off
    await page.click('[data-cy=random-mode-toggle]');
    
    // Select a From node
    await page.click('[data-cy=from-node]');
    
    // Select a To node
    await page.click('[data-cy=to-node]');
    
    // Verify selections
    const fromNode = await page.locator('[data-cy=from-node]').evaluate(node => node.className);
    const toNode = await page.locator('[data-cy=to-node]').evaluate(node => node.className);
    
    expect(fromNode).toContain('selected');
    expect(toNode).toContain('selected');
  });

  test('should calculate the path between selected nodes', async ({ page }) => {
    // Assume nodes are already selected as From and To
    await page.click('[data-cy=calculate-path-button]');
    
    // Check the path results
    await expect(page.locator('[data-cy=path-results]')).toBeVisible();
  });

  test('should display results correctly after path calculation', async ({ page }) => {
    // Verify that the path results are displayed correctly
    await expect(page.locator('[data-cy=path-results]')).toContainText('Path');
  });

  test('should clear the current selection when Clear button is clicked', async ({ page }) => {
    // Click the Clear button
    await page.click('[data-cy=clear-button]');
    
    // Verify that the selection is cleared
    const fromNodeClass = await page.locator('[data-cy=from-node]').evaluate(node => node.className);
    const toNodeClass = await page.locator('[data-cy=to-node]').evaluate(node => node.className);
    
    expect(fromNodeClass).not.toContain('selected');
    expect(toNodeClass).not.toContain('selected');
  });

  test('should adhere to UI design specifications', async ({ page }) => {
    // Verify UI elements match the design specifications
    // Example: Check colors, fonts, layout
    const bodyFontFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    await expect(bodyFontFamily).toBe('Arial, sans-serif');
    
    await expect(page.locator('[data-cy=header]')).toBeVisible();
    // Add more assertions based on design specifications
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test responsiveness on different screen sizes
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('body')).toBeVisible();

    await page.setViewportSize({ width: 414, height: 736 }); // iPhone 6+
    await expect(page.locator('body')).toBeVisible();
  });

  test('should test the echo API results used in the application', async ({ page }) => {
    // Intercept API requests and verify response
    await page.route('**/api/path', route => {
      route.fulfill({
        json: { path: 'Mocked Path Data' },
      });
    });

    // Trigger the API call
    await page.click('[data-cy=calculate-path-button]');
    
    const pathResults = await page.locator('[data-cy=path-results]').textContent();
    expect(pathResults).toContain('Mocked Path Data');
  });

  test('should not produce console errors or warnings', async ({ page }) => {
    let errorDetected = false;
    let warningDetected = false;

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errorDetected = true;
      }
      if (msg.type() === 'warning') {
        warningDetected = true;
      }
    });

    // Perform actions to verify console output
    await page.click('[data-cy=calculate-path-button]');
    
    expect(errorDetected).toBe(false);
    expect(warningDetected).toBe(false);
  });
});
