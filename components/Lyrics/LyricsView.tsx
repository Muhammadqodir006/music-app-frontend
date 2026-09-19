"use client";

import { usePlayer } from "@/context/PlayerContext";
import styles from "./LyricsView.module.css";

export default function LyricsView() {
    const {currentSong} = usePlayer();

    if(!currentSong) {
        return (
            <div className={styles.container}>
                <p className={styles.empty}>Hech qanday qo'shiq tanlanmagan</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{currentSong.title}</h1>
                <p className={styles.artist}>{currentSong.artist}</p>
            </div>

            {currentSong.lyrics ? (
                <p className={styles.lyrics}>{currentSong.lyrics}</p>
            ) : (
                <p className={styles.empty}>Bu qo'shiq uchun lyrics kiritilmagan</p>
            )}
        </div>
    );
}