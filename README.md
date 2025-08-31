# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Clone reposetory, in bash cd address-checker and then run `npm install` to install project dependencies 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Approach

- Created a dynamic form for validating one or multiple addresses.
- Handled cases like empty fields, invalid addresses, and multiple dynamic fields.
- Displayed validation messages to the user for success or errors.
- Used React `useState` to manage address fields and validation results.
- Implemented responsive design
- Performed API-based address validation with a helper function (`validateAddress`).
- Wrote unit tests using React Testing Library and `user-event` to:
  - Simulate user input
  - Test adding/removing dynamic fields
  - Verify validation messages
 
## Improments

- Add a translations file to support multiple languages.
- Extend address validation to handle international addresses, not just Norway.
- Create the app without CRA for a custom Webpack/Babel setup.
- Implement more detailed search validation.
- Improve performance by optimizing component rendering and validation flow.
- Replace MUI with custom components for better performance and full control over UI.
