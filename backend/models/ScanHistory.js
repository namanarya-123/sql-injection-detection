import mongoose from 'mongoose';

const scanHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  query: { type: String, required: true },
  result: {
    malicious: { type: Boolean, required: true },
    severity: { type: String, required: true },
    confidence: { type: String, required: true },
    patterns: { type: [String], default: [] },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ScanHistory', scanHistorySchema);
