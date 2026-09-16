'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSong } from '../../lib/api';
import { usePlayer } from '../../context/PlayerContext';
import styles from './SongForm.module.css';

export default function SongForm() {
  const router = useRouter();
  const { refreshPlaylist } = usePlayer();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !artist.trim()) {
      setError("Qo'shiq nomi va ijrochi majburiy");
      return;
    }
    if (!audioFile) {
      setError('Audio fayl tanlanmagan');
      return;
    }

    try {
      setSubmitting(true);
      await createSong({ title, artist, lyrics, audio: audioFile });
      await refreshPlaylist();
      router.push('/');
    } catch (err) {
      setError("Qo'shishda xatolik yuz berdi");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">Qo'shiq nomi</label>
        <input
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Without Me"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="artist">Ijrochi</label>
        <input
          id="artist"
          className={styles.input}
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Eminem"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="audio">Audio fayl (mp3)</label>
        <input
          id="audio"
          className={styles.input}
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="lyrics">Lyrics (ixtiyoriy)</label>
        <textarea
          id="lyrics"
          className={styles.textarea}
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Qo'shiq matnini shu yerga joylashtiring..."
        />
      </div>

      {error && <span className={styles.error}>{error}</span>}

      <button className={styles.submitButton} type="submit" disabled={submitting}>
        {submitting ? 'Yuklanmoqda...' : "Qo'shish"}
      </button>
    </form>
  );
}