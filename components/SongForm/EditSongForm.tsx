'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSongById, updateSong } from '../../lib/api';
import { usePlayer } from '../../context/PlayerContext';
import styles from './SongForm.module.css';

interface EditSongFormProps {
  songId: string;
}

export default function EditSongForm({ songId }: EditSongFormProps) {
  const router = useRouter();
  const { refreshPlaylist } = usePlayer();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSubmittingRef = useRef(false);

  useEffect(() => {
    async function load() {
      try {
        const song = await fetchSongById(songId);
        setTitle(song.title);
        setArtist(song.artist);
        setLyrics(song.lyrics ?? '');
      } catch (err) {
        setError("Qo'shiqni yuklashda xatolik");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [songId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSubmittingRef.current) return;

    if (!title.trim() || !artist.trim()) {
      setError("Qo'shiq nomi va ijrochi majburiy");
      return;
    }

    isSubmittingRef.current = true;
    setSubmitting(true);

    try {
      await updateSong(songId, { title, artist, lyrics });
      await refreshPlaylist();
      router.push('/');
    } catch (err) {
      setError("Yangilashda xatolik yuz berdi");
      console.error(err);
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.form}>Yuklanmoqda...</div>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">Qo'shiq nomi</label>
        <input
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="artist">Ijrochi</label>
        <input
          id="artist"
          className={styles.input}
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="lyrics">Lyrics</label>
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
        {submitting ? 'Saqlanmoqda...' : 'Saqlash'}
      </button>
    </form>
  );
}