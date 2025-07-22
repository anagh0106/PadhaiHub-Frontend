import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
    const canvasRef = useRef(null);
    const animationRef = useRef();
    const particlesRef = useRef([]);
    const iconsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const educationalIcons = [
            "📚", "🎓", "📝", "🧮", "⚗️",
            "🔬", "📐", "🖊️", "💡", "🧪"
        ];

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < 50; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                    hue: Math.random() * 60 + 200,
                });
            }
        };

        const initIcons = () => {
            iconsRef.current = [];
            for (let i = 0; i < 8; i++) {
                iconsRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 20 + 15,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 2,
                    opacity: Math.random() * 0.15 + 0.05,
                    icon: educationalIcons[Math.floor(Math.random() * educationalIcons.length)],
                });
            }
        };

        initParticles();
        initIcons();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            iconsRef.current.forEach((icon) => {
                icon.x += icon.speedX;
                icon.y += icon.speedY;
                icon.rotation += icon.rotationSpeed;

                if (icon.x < -50) icon.x = canvas.width + 50;
                if (icon.x > canvas.width + 50) icon.x = -50;
                if (icon.y < -50) icon.y = canvas.height + 50;
                if (icon.y > canvas.height + 50) icon.y = -50;

                ctx.save();
                ctx.translate(icon.x, icon.y);
                ctx.rotate((icon.rotation * Math.PI) / 180);
                ctx.globalAlpha = icon.opacity;
                ctx.font = `${icon.size}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(icon.icon, 0, 0);
                ctx.restore();
            });

            particlesRef.current.forEach((p1, i) => {
                particlesRef.current.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(220, 70%, 60%, ${(150 - dist) / 150 * 0.1})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
        />
    );
}
