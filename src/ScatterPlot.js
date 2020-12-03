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
	min: Math.round(minAxis.minX) - 5,
	max: Math.round(minAxis.maxX) + 5
    }}
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
	    <span
	className="node-color"
	style={{ background: node.style.color }}
	    ></span>
	    <span>
	    <strong>{node.data.serieId}: </strong>
	    {node.data.tooltip}
	</span>
	    </div>
	    <div>
	    <strong>Marker Position: </strong>
	    {node.data.x}
	</div>
	    <div>
	    <strong>log10(p-value): </strong>
	    {node.data.y}
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
