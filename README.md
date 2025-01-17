# Employee_Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
The Employee_Tracker is a command-line application designed to manage a company's employee database. This application allows users to view and manage departments, roles, and employees within the company. It provides functionalities to add, update, and delete departments, roles, and employees, as well as view employees by manager or department, and calculate the utilized budget for a department. This application is built using Node.js, Inquirer, and PostgreSQL.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation
To install and set up this project, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/AshB88/Employee_Tracker.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd Employee_Tracker
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```
    This will install the necessary packages required for the application.

## Usage

1. **Run the application**:

    ```bash
    npm start
    ```
    This will start the command-line application.

2. **Select an action**:

    Once the application has started, you will be presented with the main menu. Use the arrow keys to navigate through the list of available actions and press Enter to make a selection.

3. **Follow the prompts**:

    Depending on the selected action, you will be prompted to provide additional information.

4. **Repeat or exit**:

    After following the promts, you will be returned to the main menu to select another action or exit the application.

5. **Important Notes**:

    When deleting a department, you must first delete the employees and then the roles associated with that department. Similarly, if deleting a role, the employees associated with that role must also first be deleted.

**Walkthrough**:  
 A demonstration of the application in use can be found [here](https://drive.google.com/file/d/1mMlmI6IcqoYhlG_OeL85Tp55BBnBA6PF/view?usp=sharing).

## Contributing
Contributions are welcome and appreciated! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request to the `main` branch of the original repository.

Please ensure that your contributions adhere to the project's coding standards and conventions.

## License
This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Questions
GitHub: [GitHub Profile](https://github.com/AshB88)  
Please email me at ashleighb.jjd@gmail.com if you have any questions.