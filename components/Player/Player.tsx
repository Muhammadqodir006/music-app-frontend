"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import styles from "./Player.module.css";

export default function Player() {
    const {currentSong, isPlaying, currentTime, duration, togglePlayPause, next, prev, seek} = usePlayer();

    if(!currentSong) {
        return (
            <div className={styles.player}>
                <span className={styles.empty}>Qo'shiq tanlanmagan</span>
            </div>
        );
    }

    return (
        <div className={styles.player}>
            <div className={styles.songInfo}>
                <span className={styles.title}>{currentSong.title}</span>
                <span className={styles.artist}>{currentSong.artist}</span>
            </div>

            <PlayerControls isPlaying={isPlaying} onTogglePlay={togglePlayPause} onNext={next}
            onPrev={prev}/>

            <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />

            <Link href="/lyrics" className={styles.lricsButton} aria-label="Lyrics">📝</Link>
        </div>
    );
}