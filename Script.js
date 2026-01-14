const BACKEND_URL = "https://indufoundation-backend-11.onrender.com";

const list = document.getElementById("memberList");
const form = document.getElementById("joinForm");

async function loadMembers() {
  const res = await fetch(BACKEND_URL + "/members");
  const data = await res.json();
  list.innerHTML = "";

  data.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.name} | ${m.interest} | ID: ${m.memberId}`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: name.value,
    mobile: mobile.value,
    interest: interest.value
  };

  const res = await fetch(BACKEND_URL + "/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  alert("Member ID: " + data.memberId);
  form.reset();
  loadMembers();
});

loadMembers();
