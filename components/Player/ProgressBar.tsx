import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
    if(isNaN(seconds)) return "0.00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ProgressBar({currentTime, duration, onSeek}: ProgressBarProps) {
    return (
        <div className={styles.container}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <input
            type="range"
            className={styles.bar}
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))} />
            <span className={styles.time}>{formatTime(duration)}</span>
        </div>
    )
}