import styles from './off-the-clock.module.css'

const tiles = [
  {
    title: 'Hand-built ceramics',
    caption: 'Wonky mugs and chunky vases formed during Sunday studio hours.',
    accent: '#F5C15C',
  },
  {
    title: 'Type spec explorations',
    caption: 'Custom ligatures and stretched glyphs built inside Glyphs Mini.',
    accent: '#7CD0FF',
  },
  {
    title: 'Night ride photos',
    caption: '35mm snaps from late rides through Brunswick and Fitzroy.',
    accent: '#F48FB1',
  },
  {
    title: 'Analog collages',
    caption: 'Paper, glue, and a collection of vintage science magazines.',
    accent: '#6EE7B7',
  },
  {
    title: 'Sound system sketches',
    caption: 'Concept art for a modular speaker inspired by Brutalist forms.',
    accent: '#C4B5FD',
  },
  {
    title: 'Material swatch wall',
    caption: 'A rotating curation of textures, fabrics, and screen prints.',
    accent: '#FDBA74',
  },
  {
    title: 'Generative doodles',
    caption: 'Creative coding loops built with p5.js to unwind after work.',
    accent: '#FDE047',
  },
  {
    title: 'Travel notebooks',
    caption: 'Field notes and storyboard thumbnails from recent trips.',
    accent: '#FBCFE8',
  },
]

export default function Page() {
  return (
    <main className={styles.offClockPage}>
      <section className={styles.hero}>
        <p className={styles.heroKicker}>Off the clock</p>
        <h1 className={styles.heroTitle}>
          The slower, messier projects that keep the design muscles stretching.
        </h1>
        <p className={styles.heroSubtext}>
          A rotating bento board of analog hobbies, crafty experiments, and digital doodles.
          Hover a tile to peek at what each slot will eventually host.
        </p>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.bentoGrid}>
          {tiles.map((tile, index) => (
            <div
              key={tile.title}
              className={`${styles.bentoTile} ${styles[`tileSpan${(index % 5) + 1}`]}`}
            >
              <div
                className={styles.tileBackdrop}
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${tile.accent} 0%, rgba(10,10,10,0.6) 65%)`,
                }}
              />
              <div className={styles.tileMeta}>
                <span className={styles.tileIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.tileTitle}>{tile.title}</span>
              </div>
              <div className={styles.tileCaption}>
                <p>{tile.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
