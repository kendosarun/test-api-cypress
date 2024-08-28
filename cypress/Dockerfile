FROM cypress/included:latest

WORKDIR /app

COPY package.json /app
COPY tsconfig.json /app
COPY cypress.config.ts /app
COPY cypress/ /app/cypress



RUN yarn install


CMD ["npx", "cypress", "run", "--config", "video=false", "--spec", "cypress/e2e/apple-api.cy.ts"]

# test