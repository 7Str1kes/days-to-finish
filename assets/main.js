function saveDate() {
    const date = document.getElementById('datePicker').value;
    const time = document.getElementById('timePicker').value;

    if (!date || !time) return alert("Please select both date and time.");

    localStorage.setItem('targetDate', date);
    localStorage.setItem('targetTime', time);

    calculateCountdown();
    renderCalendar();
}

function getTargetDate() {
    const storedDate = localStorage.getItem('targetDate');
    const storedTime = localStorage.getItem('targetTime');

    if (storedDate && storedTime) {
        const [hour, minute] = storedTime.split(':');
        const date = new Date(storedDate);
        date.setHours(parseInt(hour));
        date.setMinutes(parseInt(minute));
        return date;
    }

    const now = new Date();
    return new Date(now.getFullYear(), 5, 20, 15, 0, 0);
}

function calculateCountdown() {
    const now = new Date();
    const endDate = getTargetDate();
    const diff = endDate - now;

    const countdown = document.getElementById('countdown');

    if (diff <= 0) {
        countdown.innerHTML = "🎉 TIME'S UP!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${String(days).padStart(2, '0')}d :
        ${String(hours).padStart(2, '0')}h :
        ${String(minutes).padStart(2, '0')}m :
        ${String(seconds).padStart(2, '0')}s`;
}

function renderCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendar = '<table><tr>';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => calendar += `<th>${day}</th>`);
    calendar += '</tr><tr>';

    for (let i = 0; i < firstDay; i++) calendar += '<td></td>';

    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate();
        calendar += `<td class="${isToday ? 'today' : ''}">${day}</td>`;
        if ((day + firstDay) % 7 === 0) calendar += '</tr><tr>';
    }

    calendar += '</tr></table>';
    document.getElementById('calendar').innerHTML = calendar;
}

document.addEventListener('DOMContentLoaded', () => {
    calculateCountdown();
    renderCalendar();
    setInterval(calculateCountdown, 1000);
});