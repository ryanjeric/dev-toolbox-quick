import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, TreePine, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GrassBlade {
  id: number;
  x: number;
  height: number;
  swayAmount: number;
  swaySpeed: number;
  swayOffset: number;
  isHovered: boolean;
  clusterId: number;
}

interface GrassCluster {
  id: number;
  x: number;
  blades: GrassBlade[];
}

const TouchTheGrass = () => {
  const [grassClusters, setGrassClusters] = useState<GrassCluster[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Initialize grass clusters
  useEffect(() => {
    const generateGrassClusters = () => {
      const clusters: GrassCluster[] = [];
      const numClusters = 40; // Increased from 20 to 40 clusters
      
      for (let i = 0; i < numClusters; i++) {
        // Add some randomness to cluster positions for more natural distribution
        const baseX = (i / numClusters) * 100;
        const randomOffset = (Math.random() - 0.5) * 2; // Random offset between -1 and 1
        const clusterX = Math.max(0, Math.min(100, baseX + randomOffset));
        
        const numBlades = 4 + Math.floor(Math.random() * 5); // Increased to 4-8 blades per cluster
        const blades: GrassBlade[] = [];
        
        for (let j = 0; j < numBlades; j++) {
          blades.push({
            id: i * 100 + j,
            x: j * 1.5 - (numBlades * 1.5) / 2, // Adjusted spacing between blades
            height: 70 + Math.random() * 100, // Increased height range to 70-170px
            swayAmount: 5 + Math.random() * 10,
            swaySpeed: 0.5 + Math.random() * 1.5,
            swayOffset: Math.random() * Math.PI * 2,
            isHovered: false,
            clusterId: i,
          });
        }
        
        clusters.push({
          id: i,
          x: clusterX,
          blades,
        });
      }
      
      setGrassClusters(clusters);
    };

    generateGrassClusters();
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setGrassClusters(prevClusters => 
        prevClusters.map(cluster => ({
          ...cluster,
          blades: cluster.blades.map(blade => ({
            ...blade,
            swayOffset: blade.swayOffset + blade.swaySpeed * 0.02,
          }))
        }))
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      timer = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1;
          if (newTime % 30 === 0) {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive]);

  const toggleActivity = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeSpent(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGrassHover = (clusterId: number, bladeId: number, isHovered: boolean) => {
    setGrassClusters(prevClusters =>
      prevClusters.map(cluster =>
        cluster.id === clusterId
          ? {
              ...cluster,
              blades: cluster.blades.map(blade =>
                blade.id === bladeId ? { ...blade, isHovered } : blade
              ),
            }
          : cluster
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900 dark:to-green-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <TreePine className="text-green-600 dark:text-green-400" />
            Touch the Grass
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Take a moment to relax and interact with this digital grass field. 
            Hover over the grass to make it sway more dramatically.
          </p>
          
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={toggleActivity}
              variant={isActive ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isActive ? "Stop" : "Start"} Session
            </Button>
          </div>

          {isActive && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                <Wind className="h-5 w-5" />
                <span>Time spent: {formatTime(timeSpent)}</span>
              </div>
              <Progress value={(timeSpent % 30) * (100 / 30)} className="h-2" />
            </div>
          )}
        </Card>

        <div 
          ref={containerRef}
          className="relative h-[400px] bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-800 dark:to-green-800 rounded-lg overflow-hidden"
        >
          {/* Sky elements */}
          <motion.div
            className="absolute top-4 left-4"
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sun className="h-12 w-12 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute top-8 right-8"
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Cloud className="h-16 w-16 text-white" />
          </motion.div>

          {/* Grass field */}
          <div className="absolute bottom-0 w-full h-[200px]">
            {grassClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="absolute bottom-0"
                style={{ left: `${cluster.x}%` }}
              >
                {cluster.blades.map((blade) => (
                  <motion.div
                    key={blade.id}
                    className="absolute bottom-0 w-2 bg-green-500 dark:bg-green-600 origin-bottom cursor-pointer transition-all duration-300"
                    style={{
                      left: `${blade.x}%`,
                      height: `${blade.height}px`,
                      rotate: blade.isHovered 
                        ? Math.sin(blade.swayOffset) * blade.swayAmount * 3
                        : Math.sin(blade.swayOffset) * blade.swayAmount,
                    }}
                    onMouseEnter={() => handleGrassHover(cluster.id, blade.id, true)}
                    onMouseLeave={() => handleGrassHover(cluster.id, blade.id, false)}
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                    animate={{
                      rotate: blade.isHovered 
                        ? Math.sin(blade.swayOffset) * blade.swayAmount * 3
                        : Math.sin(blade.swayOffset) * blade.swayAmount
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Encouraging messages */}
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 px-6 py-3 rounded-full shadow-lg"
            >
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                Great job! Remember to take real breaks too! 🌱
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TouchTheGrass; 