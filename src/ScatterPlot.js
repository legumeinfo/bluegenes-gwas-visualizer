import React from 'react';
import { ScatterPlot } from '@nivo/scatterplot';

const Scatterplot = ({ graphData, minAxis }) => (
	<>
	<div className="graph-container">
	{graphData.map(data => (
		<div key={data.id} className="legend-container">
		<span style={{ background: data.color }} className="legend"></span>
		<span>{data.id}</span>
		</div>
	))}
    </div>
	<ScatterPlot
    data={graphData}
    height={window.innerHeight - 150}
    width={window.innerWidth - 50}
    margin={{ top: 30, right: 90, bottom: 60, left: 90 }}
    xScale={{
        type: 'linear',
        min: 1,
        max: 'auto'
    }}
    gridXValues={
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
    // xScale={{
    //     type: 'linear',
    //     min: Math.round(minAxis.minX) - 5,
    //     max: Math.round(minAxis.maxX) + 5
    // }}
    yScale={{
	type: 'linear',
	min: Math.round(minAxis.minY) - 5,
	max: Math.round(minAxis.maxY) + 5
    }}
    useMesh={false}
    axisTop={null}
    axisRight={null}
    nodeSize={15}
    colors={graphData.map(c => c.color)}
    blendMode="multiply"
    tooltip={({ node }) => (
	  <div className="tooltip-container">
	    <div className="tooltip-data">
	      <span className="node-color" style={{ background: node.style.color }}></span>
	      {node.data.serieId}
	    </div>
            <div>
              {node.data.tooltip}
            </div>
	    <div>
              -log10(p)={Number.parseFloat(node.data.y).toPrecision(4)}
            </div>
	  </div>
    )}
    axisBottom={{
	orient: 'bottom',
	tickSize: 5,
	tickPadding: 5,
	tickRotation: 0,
	legend: 'Chromosome',
	legendPosition: 'middle',
	legendOffset: 46
    }}
    axisLeft={{
	orient: 'left',
	tickSize: 5,
	tickPadding: 5,
	tickRotation: 0,
	legend: '-log10(p)',
	legendPosition: 'middle',
	legendOffset: -60
    }}
	/>
	</>
);

export default Scatterplot;
