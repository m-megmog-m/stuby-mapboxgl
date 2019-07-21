import mapboxgl from 'mapbox-gl';
import { mapParams, sources, layers } from 'js/map_params';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'css/style.css';

const map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources,
    layers
  },
  center: [139.7670, 35.6810],
  zoom: 13
});

map.on('load', () => {
  const selectLayer = selectedLayer => {
    const visibility = map.getLayoutProperty(selectedLayer, 'visibility')
    Object.entries(mapParams).forEach(([key, params]) => {
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
  Object.entries(mapParams).forEach(([key, params]) => {
    const link = document.createElement('a');
    link.href = '#';
    link.id = key;
    link.textContent = params.name;

    link.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      selectLayer(key)
    };
    menu.appendChild(link);
  });

  selectLayer('m_mono')
});

const navigator = new mapboxgl.NavigationControl();
map.addControl(navigator, 'top-left');

const scaler = new mapboxgl.ScaleControl({
  maxwidth: 300,
  unit: 'metric'
});
map.addControl(scaler);
