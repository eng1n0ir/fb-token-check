import { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkToken = async () => {
    if (!token) return alert('Please enter a token');
    
    setLoading(true);
    setResult(null);

    try {
      const url = `https://graph.facebook.com/v25.0/me/adaccounts?access_token=${token}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to fetch data', details: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>FB Access Token Checker</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter access_token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ width: '400px', padding: '10px', marginRight: '10px' }}
        />
        <button 
          onClick={checkToken} 
          disabled={loading}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Check Token'}
        </button>
      </div>

      <hr />

      ### Result
      <div style={{ 
        background: '#f4f4f4', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px',
        minHeight: '100px',
        whiteSpace: 'pre-wrap'
      }}>
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p style={{ color: '#666' }}>No data yet. Enter a token and click check.</p>
        )}
      </div>
    </div>
  );
}

export default App;
