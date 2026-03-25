"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  speed: number;
  progress: number;
}

export function useTextToSpeech() {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    isSupported: false,
    speed: 1,
    progress: 0,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textRef = useRef<string>("");

  useEffect(() => {
    setState((s) => ({
      ...s,
      isSupported: typeof window !== "undefined" && "speechSynthesis" in window,
    }));
  }, []);

  const cleanText = useCallback((text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^[•☐▶]+\s*/gm, "")
      .replace(/^#+\s*/gm, "")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, " ")
      .trim();
  }, []);

  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Daniel", "Google", "Natural", "Enhanced"];
    for (const name of preferred) {
      const found = voices.find(
        (v) => v.name.includes(name) && v.lang.startsWith("en")
      );
      if (found) return found;
    }
    return voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!state.isSupported) return;
      window.speechSynthesis.cancel();

      const cleaned = cleanText(text);
      textRef.current = cleaned;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = state.speed;
      utterance.voice = getVoice();

      utterance.onboundary = (e) => {
        if (e.charIndex !== undefined && cleaned.length > 0) {
          setState((s) => ({
            ...s,
            progress: Math.round((e.charIndex / cleaned.length) * 100),
          }));
        }
      };

      utterance.onend = () => {
        setState((s) => ({
          ...s,
          isPlaying: false,
          isPaused: false,
          progress: 100,
        }));
      };

      utterance.onerror = () => {
        setState((s) => ({
          ...s,
          isPlaying: false,
          isPaused: false,
          progress: 0,
        }));
      };

      utteranceRef.current = utterance;
      setState((s) => ({ ...s, isPlaying: true, isPaused: false, progress: 0 }));
      window.speechSynthesis.speak(utterance);
    },
    [state.isSupported, state.speed, cleanText, getVoice]
  );

  const pause = useCallback(() => {
    if (state.isPlaying && !state.isPaused) {
      window.speechSynthesis.pause();
      setState((s) => ({ ...s, isPaused: true }));
    }
  }, [state.isPlaying, state.isPaused]);

  const resume = useCallback(() => {
    if (state.isPaused) {
      window.speechSynthesis.resume();
      setState((s) => ({ ...s, isPaused: false }));
    }
  }, [state.isPaused]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState((s) => ({
      ...s,
      isPlaying: false,
      isPaused: false,
      progress: 0,
    }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setState((s) => ({ ...s, speed }));
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    setSpeed,
  };
}
