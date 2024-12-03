const data = [
  { name: "Mon", total: 4 },
  { name: "Tue", total: 3 },
  { name: "Wed", total: 2 },
  { name: "Thu", total: 5 },
  { name: "Fri", total: 3 },
  { name: "Sat", total: 4 },
  { name: "Sun", total: 3 },
];

export function ProgressDashboard() {
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderBottom: "2px solid #dee2e6",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px" }}>Weekly Study Progress</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Your study hours for the past week
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Day</th>
            <th style={thStyle}>Hours Studied</th>
          </tr>
        </thead>
        <tbody>
          {data.map((day) => (
            <tr key={day.name}>
              <td style={tdStyle}>{day.name}</td>
              <td style={tdStyle}>{day.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
