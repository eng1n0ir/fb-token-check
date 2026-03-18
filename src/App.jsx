import { useState } from "react";

import JsonView from "react18-json-view";

import "react18-json-view/src/style.css";
import "react18-json-view/src/dark.css";

function App() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkToken = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://graph.facebook.com/v25.0/me/adaccounts?access_token=${token}`,
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Network Error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!result) return "#666";

    if (result.error) return "#ff4d4f";

    return "#52c41a";
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ color: "#1877F2", marginBottom: "8px" }}>
          FB Token Check
        </h1>
        <p style={{ color: "#666", margin: 30 }}>Vite + React API Inspector</p>
      </header>

      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "20px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="Paste your access_token here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px",
            border: "2px solid #eee",
            fontSize: "14px",
            outline: "none",
            transition: "border-color 0.2s",
            width: 500
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1877F2")}
          onBlur={(e) => (e.target.style.borderColor = "#eee")}
        />
        <button
          onClick={checkToken}
          disabled={loading}
          style={{
            padding: "0 28px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#1877F2",
            color: "white",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Requesting..." : "Check Token"}
        </button>
      </div>

      {result && (
        <div
          style={{
            background: "#1e1e1e",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              padding: "12px 20px",
              background: "#2d2d2d",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #3d3d3d",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: getStatusColor(),
                }}
              />
              <span
                style={{ color: "#aaa", fontSize: "12px", fontWeight: "bold" }}
              >
                {result.error ? "ERROR DETECTED" : "SUCCESS"}
              </span>
            </div>
            <button
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(result, null, 2))
              }
              style={{
                background: "transparent",
                color: "#888",
                border: "1px solid #444",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              Copy Raw JSON
            </button>
          </div>

          {/* Pretty JSON View */}
          <div style={{ padding: "20px", fontSize: "14px" }}>
            <JsonView
              src={result}
              theme="dark"
              displayDataTypes={false}
              editable={false}
              onCopy={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
