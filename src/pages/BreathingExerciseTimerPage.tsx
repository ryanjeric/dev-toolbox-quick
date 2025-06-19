import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BreathingTechnique {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  description: string;
}

const techniques: BreathingTechnique[] = [
  {
    name: "4-7-8 Technique",
    inhale: 4,
    hold: 7,
    exhale: 8,
    description: "Calming technique for anxiety and sleep"
  },
  {
    name: "Box Breathing",
    inhale: 4,
    hold: 4,
    exhale: 4,
    description: "Navy SEALs technique for focus and calm"
  },
  {
    name: "4-4-4 Breathing",
    inhale: 4,
    hold: 0,
    exhale: 4,
    description: "Simple equal breathing for stress relief"
  },
  {
    name: "Belly Breathing",
    inhale: 6,
    hold: 0,
    exhale: 6,
    description: "Deep diaphragmatic breathing for relaxation"
  }
];

export default function BreathingExerciseTimerPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>(techniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(selectedTechnique.inhale);
  const [totalCycles, setTotalCycles] = useState(0);
  const [sessionDuration, setSessionDuration] = useState([5]); // minutes
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (currentPhase === 'inhale') {
              if (selectedTechnique.hold > 0) {
                setCurrentPhase('hold');
                return selectedTechnique.hold;
              } else {
                setCurrentPhase('exhale');
                return selectedTechnique.exhale;
              }
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return selectedTechnique.exhale;
            } else {
              // Complete cycle
              setTotalCycles(cycles => cycles + 1);
              setCurrentPhase('inhale');
              return selectedTechnique.inhale;
            }
          }
          return prev - 1;
        });

        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentPhase, selectedTechnique]);

  useEffect(() => {
    // Auto-stop after session duration
    if (sessionTime >= sessionDuration[0] * 60 && isActive) {
      handleStop();
      toast({
        title: "Session Complete!",
        description: `Great job! You completed ${totalCycles} breathing cycles in ${sessionDuration[0]} minutes.`,
      });
    }
  }, [sessionTime, sessionDuration, isActive, totalCycles, toast]);

  useEffect(() => {
    // Handle ambient sound
    if (isActive && soundEnabled && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn('Could not play ambient sound:', error);
        // Optionally show a toast notification
        toast({
          title: "Audio Notice",
          description: "Ambient sound couldn't play automatically. You may need to interact with the page first.",
          variant: "default",
        });
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to beginning
    }
  }, [isActive, soundEnabled, toast]);

  const handleStart = () => {
    setIsActive(true);
    setSessionTime(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(selectedTechnique.inhale);
    setTotalCycles(0);
    setSessionTime(0);
  };

  const handleTechniqueChange = (value: string) => {
    const technique = techniques.find(t => t.name === value);
    if (technique) {
      setSelectedTechnique(technique);
      setCurrentPhase('inhale');
      setTimeLeft(technique.inhale);
      setIsActive(false);
      setTotalCycles(0);
      setSessionTime(0);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'from-blue-500 to-blue-700';
      case 'hold':
        return 'from-indigo-500 to-indigo-700';
      case 'exhale':
        return 'from-teal-500 to-teal-700';
    }
  };

  const getCircleScale = () => {
    const progress = (selectedTechnique[currentPhase] - timeLeft) / selectedTechnique[currentPhase];
    
    if (currentPhase === 'inhale') {
      return 0.3 + (progress * 0.7); // Scale from 0.3 to 1.0 for dramatic expansion
    } else if (currentPhase === 'exhale') {
      return 1.0 - (progress * 0.7); // Scale from 1.0 to 0.3 for dramatic contraction
    } else {
      return 1.0; // Hold at full size
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Breathing Exercise Timer
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="flex items-center gap-2"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Practice mindful breathing with guided visual cues and timing
        </p>

        <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* Controls */}
          <Card className={`${isFullscreen ? 'lg:col-span-1' : 'lg:col-span-1'}`}>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Breathing Technique</label>
                <Select value={selectedTechnique.name} onValueChange={handleTechniqueChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {techniques.map((technique) => (
                      <SelectItem key={technique.name} value={technique.name}>
                        {technique.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedTechnique.description}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Session Duration: {sessionDuration[0]} minutes
                </label>
                <Slider
                  value={sessionDuration}
                  onValueChange={setSessionDuration}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ambient Sound</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pattern</h3>
                <div className="text-xs text-muted-foreground">
                  Inhale: {selectedTechnique.inhale}s
                  {selectedTechnique.hold > 0 && ` • Hold: ${selectedTechnique.hold}s`}
                  • Exhale: {selectedTechnique.exhale}s
                </div>
              </div>

              <div className="flex gap-2">
                {!isActive ? (
                  <Button onClick={handleStart} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={handlePause} variant="outline" className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleStop} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Breathing Animation */}
          <Card className={`${isFullscreen ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
                {/* Breathing Circle - eXHALeR style */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-80 h-80 rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 ease-in-out flex items-center justify-center shadow-lg border-4 border-white/20 animate-pulse`}
                    style={{
                      transform: `scale(${getCircleScale()})`,
                      animation: 'pulse 3s ease-in-out infinite',
                    }}
                  >
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold mb-4">{getPhaseText()}</div>
                      <div className="text-6xl font-mono font-light">{timeLeft}</div>
                    </div>
                  </div>
                </div>

                {/* Phase Instructions */}
                <div className="text-center max-w-md">
                  <div className="text-lg text-muted-foreground leading-relaxed">
                    {currentPhase === 'inhale' && "Slowly breathe in through your nose"}
                    {currentPhase === 'hold' && "Hold your breath gently"}
                    {currentPhase === 'exhale' && "Slowly breathe out through your mouth"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Session Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalCycles}</div>
                  <div className="text-sm text-muted-foreground">Cycles Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{formatTime(sessionTime)}</div>
                  <div className="text-sm text-muted-foreground">Session Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{formatTime(sessionDuration[0] * 60 - sessionTime)}</div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hidden audio element for ambient sounds */}
        <audio
          ref={audioRef}
          preload="metadata"
          src="/ambient-sound.mp3"
          loop
        />
      </div>
    </div>
  );
}
