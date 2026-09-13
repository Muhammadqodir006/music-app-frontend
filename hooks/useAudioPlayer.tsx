import { useRef, useState, useEffect, useCallback } from 'react';
import { Song } from '../types/song';
import { getFullFileUrl } from '../lib/api';

export function useAudioPlayer(playlist: Song[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = currentIndex >= 0 ? playlist[currentIndex] : null;

  // Audio elementini bir marta yaratamiz (component qayta render bo'lganda qayta yaratilmasin)
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => next();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // currentSong o'zgarganda audio manbasini yangilaymiz
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    audioRef.current.src = getFullFileUrl(currentSong.fileUrl);
    if (isPlaying) {
      audioRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  const playSong = useCallback(
    (index: number) => {
      if (index < 0 || index >= playlist.length) return;
      setCurrentIndex(index);
      setIsPlaying(true);
    },
    [playlist.length]
  );

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentSong]);

  const next = useCallback(() => {
    if (playlist.length === 0) return;
    const nextIndex = currentIndex + 1 < playlist.length ? currentIndex + 1 : 0;
    playSong(nextIndex);
  }, [currentIndex, playlist.length, playSong]);

  const prev = useCallback(() => {
    if (playlist.length === 0) return;
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : playlist.length - 1;
    playSong(prevIndex);
  }, [currentIndex, playlist.length, playSong]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  return {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    playSong,
    togglePlayPause,
    next,
    prev,
    seek,
  };
}