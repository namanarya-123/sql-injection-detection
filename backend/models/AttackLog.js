import mongoose from 'mongoose';

const attackLogSchema = new mongoose.Schema({
  query: { type: String, required: true },
  severity: { type: String, required: true },
  confidence: { type: String, required: true },
  malicious: { type: Boolean, default: true },
  ipAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('AttackLog', attackLogSchema);
