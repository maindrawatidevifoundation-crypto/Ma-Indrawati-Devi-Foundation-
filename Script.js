const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

const list = document.getElementById("memberList");
const form = document.getElementById("joinForm");

// Load members
async function loadMembers() {
  try {
    const res = await fetch(BACKEND_URL + "/members");
    const data = await res.json();

    list.innerHTML = "";
    data.forEach(m => {
      const li = document.createElement("li");
      li.textContent = `${m.name} | ${m.interest} | ID: ${m.memberId}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading members", err);
  }
}

// Join NGO
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    interest: document.getElementById("interest").value
  };

  try {
    const res = await fetch(BACKEND_URL + "/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.success) {
      alert("Joined Successfully! Member ID: " + data.memberId);
      form.reset();
      loadMembers();
    } else {
      alert(data.message || "Error");
    }
  } catch (err) {
    console.error(err);
  }
});

// Load on start
loadMembers();

