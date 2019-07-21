const mapParams = {
  m_mono: {
    name: 'MIERUNE MONO',
    type: 'raster',
    tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png']
  },
  m_color: {
    name: 'MIERUNE COLOR',
    type: 'raster',
    tiles: ['https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png']
  },
  o_std: {
    name: 'OpenStreetMap',
    type: 'raster',
    tiles: [
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ]
  }
};

let sources = {};
let layers = [];
Object.entries(mapParams).forEach(([key, params]) => {
  sources[key] = {
    type: params.type,
    tiles: params.tiles,
    tileSize: 256
  };
  layers.push({
    id: key,
    type: params.type,
    source: key,
    minzoom: 0,
    maxzoom: 18
  });
});

export { mapParams, sources, layers };
