import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'css/style.css';

const map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      m_mono: {
        type: 'raster',
        tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
        tileSize: 256
      }
    },
    layers: [{
      id: 'm_mono',
      type: 'raster',
      source: 'm_mono',
      minzoom: 0,
      maxzoom: 18
    }]
  },
  center: [139.7670, 35.6810],
  zoom: 13
});

map.on('load', () => {
  map.addSource('m_color', {
    type: 'raster',
    tiles: ['https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png'],
    tileSize: 256
  });
  map.addLayer({
    id: 'm_color',
    type: 'raster',
    source: 'm_color',
    minzoom: 0,
    maxzoom: 18
  });

  const mapLayers = {
    m_mono: "MIERUNE MONO",
    m_color: "MIERUNE COLOR"
  };

  const selectLayer = selectedLayer => {
    const visibility = map.getLayoutProperty(selectedLayer, 'visibility')
    Object.entries(mapLayers).forEach(([key, val]) => {
      const link = document.getElementById(key);
      if (key === selectedLayer) {
        link.className = 'active';
        if (visibility !== 'visible') map.setLayoutProperty(key, 'visibility', 'visible');
      } else {
        link.className = '';
        map.setLayoutProperty(key, 'visibility', 'none');
      }
    });
  };

  const menu = document.getElementById('menu');
  Object.entries(mapLayers).forEach(([key, val]) => {
    const link = document.createElement('a');
    link.href = '#';
    link.id = key;
    link.textContent = val;

    link.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      selectLayer(key)
    };
    menu.appendChild(link);
  });

  selectLayer('m_mono')
});

const nc = new mapboxgl.NavigationControl();
map.addControl(nc, 'top-left');
