import { Song } from '../../types/song';
import styles from './SongCard.module.css';

interface SongCardProps {
  song: Song;
  index: number;
  isActive: boolean;
  onPlay: () => void;
  onDelete: () => void;
}

export default function SongCard({ song, index, isActive, onPlay, onDelete }: SongCardProps) {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`} onClick={onPlay}>
      <span className={styles.index}>{isActive ? '♪' : index + 1}</span>
      <div className={styles.info}>
        <span className={styles.title}>{song.title}</span>
        <span className={styles.artist}>{song.artist}</span>
      </div>
      <button
        className={styles.deleteButton}
        onClick={(e) => {
          e.stopPropagation(); // qatorni bosish (play) triggerlanmasin
          onDelete();
        }}
        aria-label="O'chirish"
      >
        🗑
      </button>
    </div>
  );
}