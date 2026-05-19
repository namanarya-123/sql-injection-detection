(async () => {
  try {
    const base = 'http://localhost:5001';

    // Login with default admin credentials created by server.js
    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Admin123!' }),
    });

    const loginJson = await loginRes.json();
    console.log('LOGIN STATUS', loginRes.status);
    console.log('LOGIN RESPONSE', JSON.stringify(loginJson, null, 2));

    if (!loginJson.token) {
      console.error('No token returned; aborting scan test.');
      process.exit(0);
    }

    const token = loginJson.token;

    // Call scan endpoint with the malicious query
    const scanRes = await fetch(`${base}/api/scan/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: "SELECT * FROM users WHERE username='admin' OR 1=1; --" }),
    });

    const scanJson = await scanRes.json();
    console.log('SCAN STATUS', scanRes.status);
    console.log('SCAN RESPONSE', JSON.stringify(scanJson, null, 2));
  } catch (err) {
    console.error('Error running test:', err);
    process.exit(1);
  }
})();
