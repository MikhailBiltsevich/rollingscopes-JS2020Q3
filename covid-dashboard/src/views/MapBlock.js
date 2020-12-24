import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';

import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';

export default function createMap(STORAGE, tab = 'Confirmed') {
  const map = am4core.create('map', am4maps.MapChart);
  map.geodata = am4geodataWorldLow;
  map.projection = new am4maps.projections.Miller();

  const label = map.createChild(am4core.Label);
  label.text = `Last Updated at: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
  label.fontSize = 12;
  label.align = 'left';
  label.valign = 'bottom';
  label.fill = am4core.color('#bdbdbd');
  label.padding(10, 10, 10, 10);
  label.marginLeft = 30;
  label.marginBottom = 10;
  label.background.strokeOpacity = 0;
  label.background.fillOpacity = 0;

  const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ['AQ'];

  const measelsSeries = map.series.push(new am4maps.MapPolygonSeries());
  measelsSeries.tooltip.background.fillOpacity = 0.5;
  measelsSeries.tooltip.autoTextColor = false;
  measelsSeries.tooltip.label.fill = am4core.color('#fff');
  measelsSeries.tooltip.dy = -5;

  const { template } = polygonSeries.mapPolygons;

  polygonSeries.calculateVisualCenter = true;
  template.propertyFields.id = 'id';
  template.tooltipPosition = 'fixed';
  template.fillOpacity = 1;

  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.fill = am4core.color('#222');

  const hs = polygonTemplate.states.create('hover');
  hs.properties.fill = am4core.color('#555');

  map.zoomControl = new am4maps.ZoomControl();

  const homeButton = new am4core.Button();
  homeButton.events.on('hit', () => {
    map.goHome();
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
  homeButton.marginBottom = 10;
  homeButton.parent = map.zoomControl;
  homeButton.insertBefore(map.zoomControl.plusButton);

  let text;
  let color;
  switch (tab) {
    case 'New Confirmed':
      text = 'newConfirmed';
      color = '#e60000';
      break;
    case 'Confirmed':
      text = 'totalConfirmed';
      color = '#e60000';
      break;
    case 'New Deaths':
      text = 'newDeaths';
      color = '#5c5c5c';
      break;
    case 'Deaths':
      text = 'totalDeaths';
      color = '#5c5c5c';
      break;
    case 'New Recovered':
      text = 'newRecovered';
      color = '#70a800';
      break;
    case 'Recovered':
      text = 'totalRecovered';
      color = '#70a800';
      break;
    default:
      text = 'totalConfirmed';
      color = '#e60000';
      break;
  }
  const data = {};
  STORAGE.countries.filter((country) => country.summaryStat).map(
    // eslint-disable-next-line no-return-assign
    (country) => data[country.ISO2] = country.summaryStat[text],
  );

  polygonSeries.events.on('inited', () => {
    polygonSeries.mapPolygons.each((mapPolygon) => {
      const count = data[mapPolygon.id];
      if (count > 0) {
        const polygon = measelsSeries.mapPolygons.create();
        // eslint-disable-next-line max-len
        polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, (Math.log(count) * Math.LN10) / 12));
        polygon.tooltipText = `${mapPolygon.dataItem.dataContext.name}: ${count}`;
        polygon.fill = am4core.color(color);
        polygon.opacity = 0.5;
        // eslint-disable-next-line no-param-reassign
        mapPolygon.dummyData = polygon;
        polygon.events.on('over', () => {
          // eslint-disable-next-line no-param-reassign
          mapPolygon.isHover = true;
        });
        polygon.events.on('out', () => {
          // eslint-disable-next-line no-param-reassign
          mapPolygon.isHover = false;
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        mapPolygon.tooltipText = `${mapPolygon.dataItem.dataContext.name}: no data`;
        // eslint-disable-next-line no-param-reassign
        mapPolygon.fillOpacity = 0.9;
      }
    });
  });
}
