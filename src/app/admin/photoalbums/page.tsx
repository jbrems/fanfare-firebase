import PhotoAlbum, { Album } from "./PhotoAlbum"

export default async function PhotoAlbumsPage() {
  const categories = await fetchCategories()
  const filteredCategories = categories.filter(c => c.nb_images > 1)
  const albums = filteredCategories.map(mapCategoryToAlbum)

  return <div>
    <h1>Fotoalbum beheer</h1>
    <ul>
      {albums.map(album => <PhotoAlbum key={album.id} album={album} />)}
    </ul>
  </div>
}

type PiwigoCategory = {
  id: number
  name: string
  nb_images: number
  url: string
  tn_url: string
}

async function fetchCategories(): Promise<PiwigoCategory[]> {
  const response = await fetch('https://vdhallen.be/photos/ws.php?format=json&method=pwg.categories.getList&recursive=true&public=true&thumbnail_size=medium')
  const results = await response.json()
  return results.result.categories;
}

function mapCategoryToAlbum(c: PiwigoCategory): Album {
  return {
    id: c.name.replaceAll(' ', '-'),
    title: c.name.replace(/^(FF|MM) \d{8} /, ''),
    url: c.url,
    thumbnail: c.tn_url,
    date: c.name.substring(3, 11),
    group: c.name.substring(0, 2) as 'FF' | 'MM'
  }
}
