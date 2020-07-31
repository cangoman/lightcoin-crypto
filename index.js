
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    if (this.transactions.length === 0) return 0;
    let total = 0;
    for (let i of this.transactions) {
      total += i.value;
    }
    return total;
  }

  addTransation(transaction) {
      this.transactions.push(transaction);
  }
}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed())
      return false;
    this.time = new Date();
    this.account.addTransation(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }



}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}







// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log('Starting balance of myAccount: ', myAccount.balance);
//console.log(myAccount.balance);
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Balance after 1 transaction: ', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Balance after 2 transactions: ', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Balance after 3 transactions: ', myAccount.balance);
//console.log(t2);




