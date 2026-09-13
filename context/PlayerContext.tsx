"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Song } from "@/types/song";
import { fetchSongs } from "@/lib/api";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface PlayerContextValue {
    playlist: Song[];
    loading: boolean;
    error: string | null;
    refreshPlaylist: ()=> Promise<void>;
    currentSong: Song | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    playSong: (index: number) => void;
    togglePlayPause: () => void;
    next: ()=> void;
    prev: () => void;
    seek: (time: number) => void; 
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({children}: {children: ReactNode}) {
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshPlaylist = async () => {
        try {
            setLoading(true);
            const songs = await fetchSongs();
            setPlaylist(songs);
            setError(null);
        }catch(err) {
            setError("Qo\'shiq ro\'yhatini yuklashda xatolik yuz berdi");
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshPlaylist();
    }, []);

    const player = useAudioPlayer(playlist);

    return (
        <PlayerContext.Provider
        value={{
            playlist,
            loading,
            error,
            refreshPlaylist,
            ...player,
        }}
        >{children}</PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayer faqat PlayerProvider ichida  ishlatilishi kerak");
    }
    return context;
}