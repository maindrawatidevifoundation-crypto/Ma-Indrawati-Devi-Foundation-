const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

let allMembers = [];

// Load members from backend
async function loadMembers() {
  try {
    const res = await fetch(BACKEND_URL + "/members");
    allMembers = await res.json();
    displayMembers(allMembers);
  } catch (err) {
    console.error("Error loading members:", err);
  }
}

// Display members in table
function displayMembers(members) {
  const tbody = document.querySelector("#memberTable tbody");
  tbody.innerHTML = "";
  if (members.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5" style="text-align:center; padding:8px;">No members yet</td>`;
    tbody.appendChild(row);
    return;
  }

  members.forEach(m => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${m.name}</td>
      <td>${m.mobile}</td>
      <td>${m.interest}</td>
      <td>${m.memberId}</td>
      <td>${new Date(m.createdAt).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

// Filter members by interest
document.getElementById("filterInterest").addEventListener("change", (e) => {
  const interest = e.target.value;
  const filtered = interest ? allMembers.filter(m => m.interest === interest) : allMembers;
  displayMembers(filtered);
});

// Download CSV
document.getElementById("downloadCsv").addEventListener("click", () => {
  if (!allMembers.length) return alert("No members to download");
  const csvHeader = "Name,Mobile,Interest,Member ID,Joined At\n";
  const csvRows = allMembers.map(m => 
    `"${m.name}","${m.mobile}","${m.interest}","${m.memberId}","${new Date(m.createdAt).toLocaleString()}"`
  );
  const csvContent = csvHeader + csvRows.join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "NGO_Members.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// Load members on page load
window.onload = loadMembers;
