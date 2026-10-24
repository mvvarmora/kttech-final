const stage = document.getElementById('stage');
const orbit = document.getElementById('orbit');

if (stage && orbit) {
    let target = 0;
    let current = 0;
    let ease = 0.12;

    function update() {
        current += (target - current) * ease;
        orbit.style.transform = `rotateY(${current}deg)`;
        requestAnimationFrame(update);
    }

    update();

    function onMove(e) {
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const center = rect.width / 2;
        const delta = (x - center) / center;
        target = delta * -160;
    }

    function onLeave() {
        target = 0;
    }

    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('touchmove', (e) => {
        if (e.touches[0]) {
            const rect = stage.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const center = rect.width / 2;
            const delta = (x - center) / center;
            target = delta * -160;
        }
    }, { passive: true });
    stage.addEventListener('touchend', onLeave);
}
