import { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

import './FallingText.css';

const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

const normalizeWord = word =>
  word
    .toLowerCase()
    .replace(/[^a-z0-9ąćęłńóśżźüäöß\-]/gi, '');

const FallingText = ({
  text,
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'hover',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.56,
  fontSize = '2rem',
  mouseConstraintStiffness = 0.9,
}) => {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const wordRefs = useRef([]);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const animationRef = useRef(null);

  const highlightSet = useMemo(() => new Set(highlightWords.map(normalizeWord)), [highlightWords]);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    wordRefs.current = wordRefs.current.slice(0, words.length);
  }, [words.length]);

  const cleanupPhysics = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (runnerRef.current) {
      Runner.stop(runnerRef.current);
      runnerRef.current = null;
    }

    if (engineRef.current) {
      Composite.clear(engineRef.current.world, false);
      Engine.clear(engineRef.current);
      engineRef.current = null;
    }

    mouseConstraintRef.current = null;
  }, []);

  const startPhysics = useCallback(() => {
    if (engineRef.current) return;

    const container = containerRef.current;
    const target = targetRef.current;
    const elements = wordRefs.current.filter(Boolean);

    if (!container || !target || elements.length === 0) {
      return;
    }

    const containerRect = target.getBoundingClientRect();
    const baseWidth = containerRect.width || container.offsetWidth;
    const baseHeight = containerRect.height || container.offsetHeight;
    const safeWidth = baseWidth > 0 ? baseWidth : container.offsetWidth || container.clientWidth || 320;
    const safeHeight = baseHeight > 0 ? baseHeight : container.offsetHeight || container.clientHeight || 240;

    target.style.position = 'relative';
    target.style.display = 'inline-block';
    target.style.minWidth = `${safeWidth}px`;
    target.style.minHeight = `${safeHeight}px`;

    const engine = Engine.create();
    engine.gravity.y = gravity;
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;

    const wordBodies = elements.map(element => {
      const rect = element.getBoundingClientRect();
      const width = rect.width || element.offsetWidth || 16;
      const height = rect.height || element.offsetHeight || 16;
      const x = rect.left - containerRect.left + width / 2;
      const y = rect.top - containerRect.top + height / 2;

      element.style.position = 'absolute';
      element.style.left = `${x - width / 2}px`;
      element.style.top = `${y - height / 2}px`;
      element.style.margin = '0';
      element.style.transformOrigin = 'center';
      element.style.pointerEvents = 'auto';

      if (wireframes) {
        element.style.outline = '1px dashed rgba(0, 255, 255, 0.4)';
        element.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
      }

      const body = Bodies.rectangle(x, y, Math.max(width, 14), Math.max(height, 14), {
        restitution: 0.25,
        friction: 0.15,
        frictionAir: 0.02,
      });

      return { body, element, width, height };
    });

    const ground = Bodies.rectangle(safeWidth / 2, safeHeight + 80, safeWidth + 160, 160, {
      isStatic: true,
    });
    const leftWall = Bodies.rectangle(-60, safeHeight / 2, 120, safeHeight * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(safeWidth + 60, safeHeight / 2, 120, safeHeight * 2, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall, ...wordBodies.map(item => item.body)]);

    const mouse = Mouse.create(container);
    mouse.pixelRatio = window.devicePixelRatio || 1;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    Runner.run(runner, engine);

    const update = () => {
      wordBodies.forEach(({ body, element, width, height }) => {
        element.style.left = `${body.position.x - width / 2}px`;
        element.style.top = `${body.position.y - height / 2}px`;
        element.style.transform = `rotate(${body.angle}rad)`;
      });

      animationRef.current = requestAnimationFrame(update);
    };

    update();
  }, [gravity, mouseConstraintStiffness, wireframes]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const handleTrigger = () => startPhysics();

    if (trigger === 'hover') {
      container.addEventListener('mouseenter', handleTrigger);
    } else if (trigger === 'click') {
      container.addEventListener('click', handleTrigger);
    } else if (trigger === 'load') {
      startPhysics();
    }

    return () => {
      if (trigger === 'hover') {
        container.removeEventListener('mouseenter', handleTrigger);
      }
      if (trigger === 'click') {
        container.removeEventListener('click', handleTrigger);
      }
    };
  }, [startPhysics, trigger]);

  useEffect(() => () => cleanupPhysics(), [cleanupPhysics]);

  const fontSizeValue = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

  return (
    <div className="falling-text-container" ref={containerRef} style={{ backgroundColor }}>
      <div className="falling-text-target" ref={targetRef} style={{ fontSize: fontSizeValue }}>
        {words.map((word, index) => {
          const normalized = normalizeWord(word);
          const isHighlighted = highlightSet.has(normalized);
          const className = ['word', isHighlighted ? highlightClass : null].filter(Boolean).join(' ');

          return (
            <span
              key={`${word}-${index}`}
              className={className}
              ref={element => {
                wordRefs.current[index] = element;
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

FallingText.propTypes = {
  text: PropTypes.string.isRequired,
  highlightWords: PropTypes.arrayOf(PropTypes.string),
  highlightClass: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click', 'load']),
  backgroundColor: PropTypes.string,
  wireframes: PropTypes.bool,
  gravity: PropTypes.number,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mouseConstraintStiffness: PropTypes.number,
};

export default FallingText;
