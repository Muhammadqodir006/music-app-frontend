import axios from "axios";
import {Song, CreateSongPayload} from "../types/song";

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export async function fetchSongs(): Promise<Song[]> {
    const {data} = await api.get<Song[]>("/api/songs");
    return data;
}

export async function fetchSongById(id: string): Promise<Song> {
    const {data} = await api.get<Song>(`/api/songs/${id}`);
    return data;
}

export async function createSong(payload: CreateSongPayload): Promise<Song> {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("artist", payload.artist);
    if(payload.lyrics) formData.append("lyrics", payload.lyrics);
    formData.append("audio", payload.audio);

    const { data } = await api.post<Song>('/api/songs', formData);
    return data;
}

export async function deleteSong(id: string): Promise<void> {
    await api.delete(`/api/songs/${id}`);
}

export function getFullFileUrl(fileUrl: string): string {
    return `${API_BASE_URL}${fileUrl}`;
}

export async function updateSong(
    id: string,
    payload: {title: string; artist: string; lyrics?: string}
): Promise<Song> {
    const {data} = await api.patch<Song>(`/api/songs/${id}`, payload);
    return data;
}

export default api;