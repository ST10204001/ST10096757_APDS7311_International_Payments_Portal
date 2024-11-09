import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Link to the User who created the transaction
  userToSendTo: { type: String, required: true }, // Username of recipient
  userAccount: { type: String, required: true }, // User's account confirmation (could be an account number, etc.)
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Timestamp of the transaction
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
