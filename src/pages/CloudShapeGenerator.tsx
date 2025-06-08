import { useRef, useEffect } from 'react';
import { createNoise2D } from 'simplex-noise';

interface Point {
  x: number;
  y: number;
}

const CloudShapeGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simplex = createNoise2D();

  const generateCloud = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');  // Sky blue
    gradient.addColorStop(1, '#E0F6FF');  // Light blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate multiple distinct cloud shapes by drawing overlapping circles
    const numClouds = 5;
    for (let i = 0; i < numClouds; i++) {
      const time = Date.now() * 0.0001 + i * 1500; // Vary time for animation and cloud position
      const baseX = (canvas.width / (numClouds + 1)) * (i + 1) + simplex(time * 0.08, i) * 30; // Stagger and add noise to center X
      const baseY = canvas.height * 0.3 + simplex(time * 0.1, i * 0.7) * 50; // Vary base Y position with noise
      const baseSize = 150 + simplex(i * 0.8, time * 0.2) * 40; // Vary base size with noise

      const numCircles = 150; // Further increased number of overlapping circles
      const circleSpread = baseSize * 1.0; // Further increased spread of circles

      // Use a temporary canvas to draw the individual cloud shape for better blending
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');

      if (!tempCtx) return; // Ensure temp context is available

      tempCtx.globalCompositeOperation = 'lighter'; // Blend circles to create fluffy shape

      for (let j = 0; j < numCircles; j++) {
        const circleTime = time + j * 50; // Vary time for each circle
        const circleAngle = (j / numCircles) * Math.PI * 2;

        // Position circles around the base position with noise and spread
        const offsetX = Math.cos(circleAngle) * simplex(circleTime * 0.1, j) * circleSpread * 0.5;
        const offsetY = Math.sin(circleAngle) * simplex(circleTime * 0.1, j * 0.8) * circleSpread * 0.5;

        const circleX = baseX + offsetX + simplex(j, circleTime * 0.05) * 15; // Add more noise for irregularity
        const circleY = baseY + offsetY + simplex(j * 0.7, circleTime * 0.06) * 10; // Add more noise for irregularity

        const circleRadius = baseSize * (0.25 + simplex(j * 0.7, circleTime * 0.2) * 0.1 + Math.random() * 0.2); // Slightly larger base radius and more variation

        // Draw a very soft-edged circle
        const circleGradient = tempCtx.createRadialGradient(circleX, circleY, 0, circleX, circleY, circleRadius * 2.0); // Significantly increased gradient radius for maximum softness
        circleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.015)'); // Very low inner opacity
        circleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Outer transparency

        tempCtx.fillStyle = circleGradient;
        tempCtx.beginPath();
        tempCtx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        tempCtx.fill();
      }

      // Draw the generated cloud shape from the temporary canvas onto the main canvas
      ctx.globalAlpha = 1.0; // Ensure full opacity when drawing temp canvas
      ctx.drawImage(tempCanvas, 0, 0);
       // Add subtle shadow to the final cloud shape
       ctx.shadowColor = 'rgba(0, 0, 0, 0.01)'; // Extremely low shadow opacity
       ctx.shadowBlur = 35; // Further increased blur
       ctx.shadowOffsetY = 18; // Adjusted offset
       ctx.drawImage(tempCanvas, 0, 0); // Redraw to apply shadow
       ctx.shadowColor = 'transparent';
    }

    // Optionally, add a global ambient light gradient or overlay here
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      generateCloud();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial cloud generation and start animation
    generateCloud();
    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [simplex]); // Re-run effect if simplex instance changes (though it won't here)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Cloud Shape Generator</h1>
      <div className="flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="rounded-lg shadow-lg bg-gradient-to-b from-[#87CEEB] to-[#E0F6FF]"
        />
      </div>
    </div>
  );
};

export default CloudShapeGenerator; 