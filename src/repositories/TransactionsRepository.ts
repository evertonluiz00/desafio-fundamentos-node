import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Resume {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncomes = 0;
    let totalOutcomes = 0;

    const totalTransactions = this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        totalIncomes += transaction.value;
      } else {
        totalOutcomes += transaction.value;
      }
      return totalIncomes - totalOutcomes;
    }, 0);

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalTransactions,
    };

    return balance;
  }

  public getResume(): Resume {
    const transactionsResume = this.all();
    const balanceResume = this.getBalance();

    const resume = {
      transactions: transactionsResume,
      balance: balanceResume,
    };

    return resume;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
