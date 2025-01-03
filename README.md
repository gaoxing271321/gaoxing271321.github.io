<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>元旦倒计时</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            background: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #countdown {
            font-size: 3em;
            margin-top: 20px;
        }
        canvas {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <div id="countdown"></div>
    <canvas id="fireworksCanvas"></canvas>

    <script>
        const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Firework {
            constructor(x, y, vx, vy, color, radius) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.color = color;
                this.radius = radius;
                this.alpha = 1;
                this.decay = 0.02;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
                if (this.alpha < 0) {
                    this.alpha = 0;
                }
                this.radius -= 0.1;
                if (this.radius < 0) {
                    this.radius = 0;
                }
            }
            draw(ctx) {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        class FireworksSystem {
            constructor() {
                this.fireworks = [];
                this.colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF6'];
            }
            create(x, y) {
                const particles = 50;
                for (let i = 0; i < particles; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 3 + 2;
                    const vx = Math.cos(angle) * speed;
                    const vy = Math.sin(angle) * speed;
                    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                    const radius = Math.random() * 3 + 2;
                    this.fireworks.push(new Firework(x, y, vx, vy, color, radius));
                }
            }
            update() {
                for (let i = 0; i < this.fireworks.length; i++) {
                    this.fireworks[i].update();
                    if (this.fireworks[i].alpha === 0) {
                        this.fireworks.splice(i, 1);
                        i--;
                    }
                }
            }
            draw(ctx) {
                this.fireworks.forEach(firework => firework.draw(ctx));
            }
        }

        const fireworksSystem = new FireworksSystem();

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fireworksSystem.update();
            fireworksSystem.draw(ctx);
            requestAnimationFrame(animate);
        }

        canvas.addEventListener('click', (e) => {
            fireworksSystem.create(e.clientX, e.clientY);
        });

        animate();

        // 倒计时
        function updateCountdown() {
            const targetDate = new Date('January 1, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerHTML = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;

            if (distance < 0) {
                clearInterval(interval);
                document.getElementById('countdown').innerHTML = "元旦到了！";
            }
        }

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
    </script>
</body>
</html>
