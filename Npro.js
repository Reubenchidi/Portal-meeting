

// Switch Pages
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// ================= Notices =================

// Load notices from localStorage
function loadNotices() {
  const noticeList = document.getElementById('notice-list');
  noticeList.innerHTML = "";

  const notices = JSON.parse(localStorage.getItem('notices')) || [];

  notices.forEach((notice, index) => {
    const card = document.createElement('div');
    card.classList.add('notice-card');
    card.innerHTML = `
      <h3>${notice.title}</h3>
      <p><strong>Date:</strong> ${notice.date}</p>
      <p><strong>Time:</strong> ${notice.time}</p>
      <p><strong>Venue:</strong> ${notice.venue}</p>
      <a href="${notice.link}" target="_blank" class="join-btn">Join Meeting</a>
      <p><strong>Host:</strong> ${notice.host}</p>
      <p><strong>Participants:</strong></p>
      <ul>${notice.participants.split(',').map(p => `<li>${p.trim()}</li>`).join('')}</ul>
      <p><strong>Time Keeper:</strong> ${notice.timekeeper}</p>
    `;
    noticeList.appendChild(card);
  });
}

// Handle Notice form submit
document.getElementById('notice-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const newNotice = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    venue: document.getElementById('venue').value,
    link: document.getElementById('link').value,
    host: document.getElementById('host').value,
    participants: document.getElementById('participants').value,
    timekeeper: document.getElementById('timekeeper').value
  };

  const notices = JSON.parse(localStorage.getItem('notices')) || [];
  notices.push(newNotice);
  localStorage.setItem('notices', JSON.stringify(notices));

  loadNotices();
  this.reset();
  showPage('notice');
});

// ================= Members =================

function loadMembers() {
  const memberList = document.getElementById('member-list');
  memberList.innerHTML = "";

  const members = JSON.parse(localStorage.getItem('members')) || [];

  members.forEach((member, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${member.name} – ${member.role}
      <button class="remove-btn" onclick="removeMember(${index})">Remove</button>
    `;
    memberList.appendChild(li);
  });
}

// Add Member
document.getElementById('member-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('member-name').value;
  const role = document.getElementById('member-role').value;

  const members = JSON.parse(localStorage.getItem('members')) || [];
  members.push({ name, role });
  localStorage.setItem('members', JSON.stringify(members));

  loadMembers();
  this.reset();
});

// Remove Member
function removeMember(index) {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  members.splice(index, 1);
  localStorage.setItem('members', JSON.stringify(members));
  loadMembers();
}

// ================= INIT =================
window.onload = function() {
  loadNotices();
  loadMembers();
};