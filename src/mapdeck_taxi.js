import React from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import { INITIAL_VIEW_STATE, MAPBOX_ACCESS_TOKEN } from './utils';

export default function MapDeckTaxi({data}) {
    const layers = new ScatterplotLayer({
        id: 'scatterplot-layer',
        data,
        pickable: true,
        opacity: 1,
        stroked: true,
        filled: true,
        radiusScale: 30,
        radiusMinPixels: 3,
        radiusMaxPixels: 100,
        getPosition: d => d,
        getFillColor: [255,0,1],
        // getLineColor: d => [0, 0, 0]
    });
    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[layers]}
            >
                <StaticMap preventStyleDiffing={true} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            </DeckGL>
        </>
    );
}
