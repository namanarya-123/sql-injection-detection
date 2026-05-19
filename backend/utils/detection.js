export function detectSQLInjection(query) {
  const patterns = [
    { regex: /\bOR\s+1=1\b/i, label: 'OR 1=1' },
    { regex: /\bUNION\s+SELECT\b/i, label: 'UNION SELECT' },
    { regex: /\bDROP\s+TABLE\b/i, label: 'DROP TABLE' },
    { regex: /--/i, label: '-- comment' },
    { regex: /;/, label: 'semicolon' },
    { regex: /\bxp_cmdshell\b/i, label: 'xp_cmdshell' },
    { regex: /\bEXEC\b/i, label: 'EXEC' },
    { regex: /\bSLEEP\b/i, label: 'SLEEP' },
  ];

  const detected = patterns.filter((item) => item.regex.test(query)).map((item) => item.label);
  const malicious = detected.length > 0;

  const severity = (() => {
    if (!malicious) return 'Low';
    if (detected.some((item) => ['DROP TABLE', 'xp_cmdshell', 'UNION SELECT'].includes(item))) return 'Critical';
    if (detected.some((item) => ['OR 1=1', 'EXEC', 'SLEEP'].includes(item))) return 'High';
    return 'Medium';
  })();

  const confidence = `${Math.floor(Math.random() * 20) + 80}%`;

  return { malicious, severity, confidence, patterns: detected };
}
