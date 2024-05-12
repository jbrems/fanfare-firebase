import styles from './PhotoAlbum.module.css'
import SaveAlbumButton from './SaveAlbumButton'

export type Album = {
  id: string
  title: string
  url: string
  image: string
  date: string
  group: 'FF' | 'MM' | 'MR'
}

export default function PhotoAlbum({ album, exists = false }: { album: Album, exists: boolean }) {
  return <div className={styles.album}>
    <img src={album.image} aria-hidden />
    <div className={styles.info}>
      <span className={styles.title}>{album.title}</span>
      <span><a href={album.url} target="_blank">{album.url}</a></span>
      <span>{album.date} {album.group}</span>
      {!exists && <SaveAlbumButton album={album} />}
    </div>
  </div>
}