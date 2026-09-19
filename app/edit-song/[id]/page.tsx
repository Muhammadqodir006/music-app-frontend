import EditSongForm from "@/components/SongForm/EditSongForm";

export default async function EditSongPage({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    const {id} = await params;
    return <EditSongForm songId={id} />;
}