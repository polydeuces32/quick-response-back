'use client';

import { useEffect, useRef, useState } from 'react';
import type Matter from 'matter-js';
import type { Body, Engine, IMouseEvent, MouseConstraint, Render } from 'matter-js';
import { Word } from '@/types/word';

type MatterNS = typeof Matter;

type WordBody = Body & { wordData?: Word };

// Dynamic import for Matter.js to avoid SSR issues
let matterSingleton: MatterNS | null = null;

interface PhysicsWordCanvasProps {
  words: Word[];
  onWordClick?: (word: Word) => void;
  className?: string;
}

export default function PhysicsWordCanvas({ words, onWordClick, className = '' }: PhysicsWordCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;

    // Dynamically import Matter.js
    const initPhysics = async () => {
      try {
        if (!matterSingleton) {
          const matterModule = await import('matter-js');
          matterSingleton = matterModule.default;
        }
        const Matter = matterSingleton;

        // Create engine
        const engine = Matter.Engine.create();
        engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      canvas: canvasRef.current!,
      engine: engine,
      options: {
        width: canvasRef.current!.offsetWidth,
        height: canvasRef.current!.offsetHeight,
        wireframes: false,
        background: 'transparent',
        showAngleIndicator: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showBroadphase: false,
        showBounds: false,
        showAxes: false,
        showPositions: false,
        showIds: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false,
        showDebug: false,
        pixelRatio: window.devicePixelRatio || 1,
      }
    });
    renderRef.current = render;

    // Create ground
    const ground = Matter.Bodies.rectangle(
      canvasRef.current!.offsetWidth / 2,
      canvasRef.current!.offsetHeight + 25,
      canvasRef.current!.offsetWidth,
      50,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    // Create walls
    const leftWall = Matter.Bodies.rectangle(
      -25,
      canvasRef.current!.offsetHeight / 2,
      50,
      canvasRef.current!.offsetHeight,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    const rightWall = Matter.Bodies.rectangle(
      canvasRef.current!.offsetWidth + 25,
      canvasRef.current!.offsetHeight / 2,
      50,
      canvasRef.current!.offsetHeight,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    // Create ceiling
    const ceiling = Matter.Bodies.rectangle(
      canvasRef.current!.offsetWidth / 2,
      -25,
      canvasRef.current!.offsetWidth,
      50,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    // Add all bodies to the world
    Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Create word bodies
    const wordBodies: WordBody[] = [];
    words.forEach((word) => {
      const x = Math.random() * (canvasRef.current!.offsetWidth - 200) + 100;
      const y = Math.random() * 200 + 50;

      const body = Matter.Bodies.rectangle(x, y, 200, 60, {
        render: {
          fillStyle: '#e63946',
          strokeStyle: '#000',
          lineWidth: 2,
        },
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.01,
      }) as WordBody;
      body.wordData = word;
      wordBodies.push(body);
    });

    Matter.World.add(engine.world, wordBodies);

    // Add mouse control
    const mouse = Matter.Mouse.create(canvasRef.current!);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Add click detection
    const onMousedown = (event: IMouseEvent<MouseConstraint>) => {
      const bodies = Matter.Query.point(wordBodies, event.mouse.position);
      if (bodies.length > 0) {
        const body = bodies[0] as WordBody;
        if (body?.wordData && onWordClick) {
          onWordClick(body.wordData);
        }
      }
    };
    Matter.Events.on(mouseConstraint, 'mousedown', onMousedown);

    // Run the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    setIsInitialized(true);

      } catch (error) {
        console.error('Error initializing Matter.js:', error);
      }
    };

    initPhysics();

    // Cleanup
    return () => {
      if (renderRef.current && matterSingleton) {
        matterSingleton.Render.stop(renderRef.current);
      }
      if (engineRef.current && matterSingleton) {
        matterSingleton.Engine.clear(engineRef.current);
      }
    };
  }, [words, onWordClick, isInitialized]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && renderRef.current) {
        renderRef.current.canvas.width = canvasRef.current.offsetWidth;
        renderRef.current.canvas.height = canvasRef.current.offsetHeight;
        renderRef.current.options.width = canvasRef.current.offsetWidth;
        renderRef.current.options.height = canvasRef.current.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{ background: 'transparent' }}
      />
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Loading physics...</p>
            <p className="text-xs text-gray-500 mt-2">If this does not go away, check the browser console for errors</p>
          </div>
        </div>
      )}
    </div>
  );
}
