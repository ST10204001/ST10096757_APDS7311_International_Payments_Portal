// models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userToSendTo: { type: String, required: true },
  userAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  swiftCode: { type: String, required: false },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
