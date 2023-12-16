# playwright_typescript
Playwright test automation 

#commands to execute the scripts

1. npm install -D @playwright/test@latest
2. npx playwright test swaglab.spec.ts  --reporter=line,allure-playwright --headed  
3. npx allure generate allure-results -o allure-report
4. npx allure open  allure-report
