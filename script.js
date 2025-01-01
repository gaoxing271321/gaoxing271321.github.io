function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    setDigit('hours-tens', Math.floor(hours / 10));
    setDigit('hours-ones', hours % 10);
    setDigit('minutes-tens', Math.floor(minutes / 10));
    setDigit('minutes-ones', minutes % 10);
    setDigit('seconds-tens', Math.floor(seconds / 10));
    setDigit('seconds-ones', seconds % 10);
}

function setDigit(id, value) {
    const digitElement = document.getElementById(id);
    digitElement.style.transform = `rotateX(${Math.random() * 360}deg)`;
    setTimeout(() => {
        digitElement.textContent = value;
        digitElement.style.transform = `rotateX(0deg)`;
    }, 300);
}

setInterval(updateTime, 1000);
updateTime();
