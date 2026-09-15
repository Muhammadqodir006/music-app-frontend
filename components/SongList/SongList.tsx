"use client";

import { usePlayer } from "@/context/PlayerContext";
import {deleteSong as deleteSongApi} from "../../lib/api";
import SongCard from "./SongCard";
import styles from "./SongList.module.css";

export default function SongList() {
    const {playlist, currentSong, playSong, refreshPlaylist, loading} = usePlayer();

    const handleDelete = async (id: string) => {
        if(!confirm("Qo'shiqni o'chirmoqchimisiz?")) return;
        await deleteSongApi(id)
        await refreshPlaylist();
    };

    if(loading) {
        return <div className={styles.container}>Yuklanmoqda...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Qo'shiqlarim</h1>

            {playlist.length === 0 ? (
                <p className={styles.empty}>Hali qo'shiq qo'shilmagan</p>
            ): (
                playlist.map((song, index) => (
                    <SongCard
                    key={song.id}
                    song={song}
                    index={index}
                    isActive={currentSong?.id === song.id}
                    onPlay={() => playSong(index)}
                    onDelete={() => handleDelete(song.id)} />
                ))
            )}
        </div>
    )
}