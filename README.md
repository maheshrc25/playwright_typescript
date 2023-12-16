# playwright_typescript
Playwright test automation 

**#Installaion**
a) Install node.js
b) Download and install the VS Code IDE.

**#commands to execute the scripts**

Navigate to "Playwright_typescript" folder via cmd and run below commands

1. npm install -D @playwright/test@latest
2. npx playwright test swaglab.spec.ts  --reporter=line,allure-playwright --headed  
3. npx allure generate allure-results -o allure-report
4. npx allure open  allure-report
