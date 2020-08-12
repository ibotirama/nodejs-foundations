import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionType {
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private sumBalance({ type }: TransactionType) {
    return this.transactions.reduce((acc: number, curr: Transaction) =>
      curr.type === type ? acc + curr.value : acc, 0
    );
  }

  public getBalance(): Balance {
    const income: number = this.sumBalance({ type: 'income' });
    const outcome: number = this.sumBalance({ type: 'outcome' });

    return { income, outcome, total: income - outcome };
  }

  public create({title, value, type}:Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
