import inquirer from "inquirer";
class person {
    firstName;
    lastName;
    gender;
    age;
    phoneNumber;
    constructor(firstName, lastName, gender, age, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }
}
class bankAccount {
    accountNumber;
    balance;
    owner;
    constructor(accountNumber, balance, owner) {
        this.accountNumber = accountNumber,
            this.balance = 0,
            this.owner = owner;
    }
    async deposit() {
        const { amount } = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount to deposit"
            }
        ]);
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposit amount ${amount} from account number ${this.accountNumber}`);
        }
        else {
            console.log("Invalid amount");
        }
    }
    async withdraw() {
        const { amount } = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount to Withdraw"
            }
        ]);
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdraw amount ${amount} from account number ${this.accountNumber}`);
        }
        else {
            console.log("Invalid amount");
        }
    }
    async checkBalance() {
        console.log(`Your current balance is ${this.balance} from this ${this.accountNumber}`);
    }
    async ownerInfo() {
        console.log(`${person}`);
    }
}
async function askInfo() {
    console.log("Welcome to my Bank");
    const { firstName, lastName, gender, age, phoneNumber } = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is your first name",
            validate: function (value) {
                if (!value.match(/^[A-Za-z]+$/)) {
                    return "Please enter a valid first name";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "What is your Last name",
            validate: function (value) {
                if (!value.match(/^[A-Za-z]+$/)) {
                    return "Please enter a valid last name";
                }
                return true;
            }
        },
        {
            type: "number",
            name: "age",
            message: "What is your Age",
            validate: function (value) {
                if (isNaN(value) || value <= 0) {
                    return "Please enter a valid age";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "gender",
            message: "What is your Gender",
            validate: function (value) {
                if (!value.match(/^[A-Za-z]+$/)) {
                    return "Please enter a valid gender";
                }
                return true;
            }
        },
        {
            type: "number",
            name: "phoneNumber",
            message: "What is your Phone Number",
            validate: function (value) {
                if (isNaN(value) || value <= 0) {
                    return "Please enter a valid Phone Number";
                }
                return true;
            },
        },
    ]);
    const Person = new person(firstName, lastName, age, gender, phoneNumber);
    // Create bank account for the person
    const account = new bankAccount("1234", 1000, Person);
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an option",
                choices: ["Withdraw", "Deposit", "Check Balance", "Get Owner Info", "Exit"]
            },
        ]);
        switch (action) {
            case "Withdraw":
                await account.withdraw();
                break;
            case "Deposit":
                await account.deposit();
                break;
            case "Check Balance":
                await account.checkBalance();
                break;
            case "Get Owner Info":
                await account.ownerInfo();
                break;
            case "Exit":
                console.log("Exit from banl");
                break;
            default:
                console.log("Invalid information");
        }
    }
}
askInfo();
