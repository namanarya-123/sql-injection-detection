// backend/utils/detectSQLInjection.js
// A simple regex-based SQL injection detector for the scan route.

export function detectSQLInjection(query) {
  if (!query || typeof query !== 'string') {
    return {
      malicious: false,
      severity: 'Low',
      confidence: '0%',
      detectedPatterns: [],
    };
  }

  // Normalize whitespace and compare patterns case-insensitively.
  const normalizedQuery = query.trim().replace(/\s+/g, ' ');

  const signatures = [
    {
      label: 'OR 1=1',
      regex: /\bOR\s+1\s*=\s*1\b/i,
      severity: 'High',
    },
    {
      label: 'UNION SELECT',
      regex: /\bUNION\s+SELECT\b/i,
      severity: 'Critical',
    },
    {
      label: 'DROP TABLE',
      regex: /\bDROP\s+TABLE\b/i,
      severity: 'Critical',
    },
    {
      label: 'DELETE FROM',
      regex: /\bDELETE\s+FROM\b/i,
      severity: 'Critical',
    },
    {
      label: 'INSERT INTO',
      regex: /\bINSERT\s+INTO\b/i,
      severity: 'Medium',
    },
    {
      label: 'UPDATE SET',
      regex: /\bUPDATE\b[\s\S]{0,100}?\bSET\b/i,
      severity: 'Medium',
    },
    {
      label: '-- comment',
      regex: /--/,
      severity: 'High',
    },
    {
      label: 'semicolon',
      regex: /;/,
      severity: 'Medium',
    },
  ];

  const detectedPatterns = signatures
    .filter((signature) => signature.regex.test(normalizedQuery))
    .map((signature) => signature.label);

  const malicious = detectedPatterns.length > 0;

  const severity = (() => {
    if (!malicious) {
      return 'Low';
    }

    if (detectedPatterns.some((pattern) => ['DROP TABLE', 'UNION SELECT', 'DELETE FROM'].includes(pattern))) {
      return 'Critical';
    }

    if (detectedPatterns.some((pattern) => ['OR 1=1', '-- comment'].includes(pattern))) {
      return 'High';
    }

    return 'Medium';
  })();

  const baseConfidence = {
    Critical: 92,
    High: 82,
    Medium: 68,
    Low: 12,
  }[severity];

  const extraConfidence = Math.min(detectedPatterns.length * 4, 100 - baseConfidence);
  const confidenceScore = baseConfidence + extraConfidence;

  return {
    malicious,
    severity,
    confidence: `${confidenceScore}%`,
    detectedPatterns,
  };
}
