export interface Song {
    id: string;
    title: string;
    artist: string;
    fileUrl: string;
    lyrics: string | null;
    duration: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSongPayload {
    title: string;
    artist: string;
    lyrics?: string;
    audio: File;
}
