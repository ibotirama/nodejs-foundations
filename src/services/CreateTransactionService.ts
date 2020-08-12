import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}:Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({title, type, value});
    const balance = this.transactionsRepository.getBalance();
    if(transaction.type === 'outcome' && value > balance.total){
      throw Error('It is not possible to create a outcome greater then total balance.');
    }

    const savedTransaction = this.transactionsRepository.create(transaction);
    
    return savedTransaction;
  }
}

export default CreateTransactionService;
