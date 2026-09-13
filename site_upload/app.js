const cfg = window.SALON_CONFIG;
const $ = id => document.getElementById(id);

function fillBooking(){
  $('petType').innerHTML = cfg.petTypes.map(x=>`<option>${x}</option>`).join('');
  $('service').innerHTML = cfg.services.map(x=>`<option>${x}</option>`).join('');
  const d = new Date(); d.setDate(d.getDate()+1);
  $('date').min = d.toISOString().slice(0,10);
}
function openBooking(){ $('bookingModal').classList.add('open'); $('bookingModal').setAttribute('aria-hidden','false'); fillBooking(); document.body.style.overflow='hidden'; }
function closeBooking(){ $('bookingModal').classList.remove('open'); $('bookingModal').setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
$('bookingModal').addEventListener('click',e=>{if(e.target.id==='bookingModal')closeBooking();});

function buildMessage(){
  const date = new Date($('date').value+'T12:00:00');
  const dateText = date.toLocaleDateString('ru-RU',{day:'2-digit',month:'2-digit',year:'numeric'});
  return `Здравствуйте! Хочу записаться в груминг-салон.

🐾 Питомец: ${$('petType').value}
🐶 Порода: ${$('breed').value}
✂️ Услуга: ${$('service').value}
📅 Желаемая дата: ${dateText}
🕐 Пожелания по времени: ${$('comment').value || 'не указаны'}
👤 Имя: ${$('clientName').value}
📞 Телефон: ${$('phone').value || 'не указан'}

Подскажите, пожалуйста, можно выбрать удобное время?`;
}

$('bookingForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const message = buildMessage();
  try{ await navigator.clipboard.writeText(message); }catch{}
  // VK deep-link with a prefilled message. If the client/device ignores msg, text is already copied.
  const url = `${cfg.vkMessagesUrl}&msg=${encodeURIComponent(message)}`;
  $('copyStatus').textContent = 'Готовый текст записи скопирован. Сейчас откроются сообщения сообщества VK.';
  setTimeout(()=>window.location.href=url,350);
});

const reviews = [
  ['Отзыв 01 — Инкогнито 0446.png','Инкогнито 0446'],
  ['Отзыв 02 — Наталья Никифорова.png','Наталья Никифорова'],
  ['Отзыв 03 — Надежда Терехина.png','Надежда Терехина'],
  ['Отзыв 04 — Оксана Ш..png','Оксана Ш.'],
  ['Отзыв 05 — 233336 Сахарова.png','233336 Сахарова'],
  ['Отзыв 06 — Алексей Могилёв.png','Алексей Могилёв'],
  ['Отзыв 07 — Светлана Савельева.png','Светлана Савельева'],
  ['Отзыв 08 — Юлия Курилова.png','Юлия Курилова']
];
$('reviewGrid').innerHTML = reviews.map(([file,name])=>`
  <article class="review-card">
    <img loading="lazy" src="assets/reviews/${encodeURIComponent(file)}" alt="Отзыв клиента ${name}">
    <div class="stars">★★★★★</div>
    <div style="padding:0 8px 14px;font-size:13px;color:#5f574f">${name}</div>
  </article>`).join('');
