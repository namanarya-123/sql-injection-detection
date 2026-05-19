import AttackLog from '../models/AttackLog.js';
import ScanHistory from '../models/ScanHistory.js';
import { detectSQLInjection } from '../utils/detectSQLInjection.js';

export async function scanQuery(req, res, next) {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query text is required' });
    }

    const result = detectSQLInjection(query);
    await ScanHistory.create({ userId: req.user.id, query, result });

    if (result.malicious) {
      await AttackLog.create({ query, severity: result.severity, confidence: result.confidence, malicious: true, ipAddress: req.ip });
    }

    res.json({ query, result });
  } catch (error) {
    next(error);
  }
}

export async function getHistory(req, res, next) {
  try {
    const history = await ScanHistory.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json({ history });
  } catch (error) {
    next(error);
  }
}
