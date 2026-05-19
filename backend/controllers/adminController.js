import AttackLog from '../models/AttackLog.js';
import BlockedIP from '../models/BlockedIP.js';

export async function getLogs(req, res, next) {
  try {
    const logs = await AttackLog.find().sort({ createdAt: -1 }).limit(100);
    res.json({ logs });
  } catch (error) {
    next(error);
  }
}

export async function getAnalytics(req, res, next) {
  try {
    const logs = await AttackLog.find();
    const severityCounts = logs.reduce((acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    }, {});

    const monthlyScans = [...Array(6)].map((_, index) => ({
      month: new Date(new Date().setMonth(new Date().getMonth() - (5 - index))).toLocaleString('default', { month: 'short' }),
      value: Math.max(0, Math.floor(Math.random() * 30) + index * 5),
    }));

    const totalLogs = logs.length;
    const blockedIPs = await BlockedIP.countDocuments();
    const criticalCount = severityCounts.Critical || 0;

    res.json({
      totalLogs,
      blockedIPs,
      criticalCount,
      severityBreakdown: [
        { name: 'Low', value: severityCounts.Low || 0 },
        { name: 'Medium', value: severityCounts.Medium || 0 },
        { name: 'High', value: severityCounts.High || 0 },
        { name: 'Critical', value: severityCounts.Critical || 0 },
      ],
      monthlyScans,
    });
  } catch (error) {
    next(error);
  }
}

export async function blockIp(req, res, next) {
  try {
    const { ip, reason } = req.body;
    if (!ip) {
      return res.status(400).json({ message: 'IP address is required' });
    }

    await BlockedIP.create({ ip, reason: reason || 'Suspicious activity detected' });
    res.status(201).json({ message: 'IP blocked successfully' });
  } catch (error) {
    next(error);
  }
}
