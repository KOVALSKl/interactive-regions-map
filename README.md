# interactive-regions-map

Embed Interactive Regions Map to your Vue Project

## Description

This package will allow you to embed an interactive map of the regions in your Vue project
using Vue Components.

To create the map, the <a href="https://d3js.org/"><b>D3</b></a> 
library is used to draw <b>SVG</b> for the region elements.

## Installation

Install latest version
```shell
npm i interactive-regions-map
```

Install a specific version
```shell
npm i interactive-regions-map@<version>
```

## Project usage

### Components

<b>RegionsMap</b> - The Regions Map Component creates an SVG element with a map using the d3.js library. 
Each region is a Map Region component.

<b>Props</b>:

| Name | Description | Default | Required |
|:---:|:---:|:---:|:---:|
| width | Width of main svg component | 900px | - |
| height | Height of main svg component | 900px | - |
| regions | JSON object that stores region data | - | + |
| regionsIndexes | JSON object that stores indexes of region to optimize their search | null | - |
| mapProjection | Custom map projection based on d3 mercators objects, using to manipulate your map | null | - |
| animationDurationTime | Oh wow, just duration time for your animations on map | 1500 | - |

The <b>regions</b> prop has a geo.json structure, so your object should look like this:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            79.28348571016096,
            41.11592858806762
          ],
          [
            99.18614471851964,
            37.86845149053465
          ]
        ],
        "type": "LineString"
      }
    }
  ]
}
```
Inside the <b>features</b> list we store the region data. 
The <b>feature</b> object can store some data, you can place it inside the <b>properties</b> field;

The <b>regionsIndexes</b> prop is self-made json object to optimize search of the regions.
It should look like this:

```json
{
    "b974a86e44204511941d76c579b37c3e": {"index": 0},
    "6d195052b15345d5bf94e74ab2bac308": {"index": 1}, 
    "8d5317628bf14bdea2d3871d05b2b5fc": {"index": 2}
}
```

The keys of the object are the region id's.


<b>MapRegion</b> - The Map Region Component is a nested component that is part of the svg-element map.

<b>Props</b>:

| Name | Description | Default | Required |
|:---:|:---:|:---:|:---:|
| d | Coordinates of the region rendering | - | + |
| data | Information about the region | - | + |
| onclick | Method that is invoked after click | - | + |

<b>RegionInfo</b> - The Region Info Component is a component that visualize the data of the selected region,
which is stored inside the Map Region Component using <b>data</b> prop.

<b>Props</b>:

| Name | Description | Default | Required |
|:---:|:---:|:---:|:---:|
| regionData | Data which stored inside clicked region | - | + |

<b>Emits</b>:

This component emits events with default handlers that can be updated

| Name | Description | Effect |
|:---:|:---:|:---:|
| nextRegion | This event occurs after clicking the "Next" button | Change selected region - forward |
| previousRegion | This event occurs after clicking the "Previous" button | Change selected region - backward |
 

<b>Where can I find the JSON file with the coordinates of my country or anything else?</b>

Here the links:

1. <a href="https://d3js.org/">D3</a> - The library to draw svg elements using JavaScript
2. <a href="https://gadm.org/download_country.html">GADM</a> - The data of the country's regions and not only them 
(use <b>level1</b> from GeoJSON to build a map of the regions, and use map into the package)
3. <a href="https://geojson.io/#map=2/0/20">geojson</a> - powered by <b>mapbox</b>



### About

<a href="https://interactive-regions-map.netlify.app">Here's</a> 
an example of how the package works

The project is under development, follow the changes and offer solutions on my 
<a href="https://github.com/KOVALSKl/interactive-regions-map.git">GitHub</a> <3

