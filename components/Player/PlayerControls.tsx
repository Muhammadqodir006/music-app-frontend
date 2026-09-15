import styles from "./PlayerControls.module.css";

interface PlayerControlsProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function PlayerControls({
    isPlaying,
    onTogglePlay,
    onNext,
    onPrev,
}: PlayerControlsProps) {
    return(
        <div className={styles.controls}>
            <button className={styles.button} onClick={onPrev} aria-label="Oldingi qo'shiq">⏮</button>
            <button className={styles.playButton} onClick={onTogglePlay} aria-label={isPlaying ? "Pauza" : "Ijro Etish"}>
                {isPlaying ? "⏸" : "▶"}
            </button>
            <button className={styles.button} onClick={onNext} aria-label="Keyingi qo'shiq"> ⏭</button>
        </div>
    );
}