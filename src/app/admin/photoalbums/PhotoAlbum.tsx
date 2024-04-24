import styles from './PhotoAlbum.module.css'

export type Album = {
  id: string
  title: string
  url: string
  thumbnail: string
  date: string
  group: 'FF' | 'MM' | 'MR'
}

export default function PhotoAlbum({ album }: { album: Album }) {
  return <div className={styles.album}>
    <img src={album.thumbnail} aria-hidden />
    <div className={styles.info}>
      <span className={styles.title}>{album.title}</span>
      <span><a href={album.url}>{album.url}</a></span>
      <span>{album.date} {album.group}</span>
    </div>
  </div>
}