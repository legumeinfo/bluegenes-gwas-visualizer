import React from 'react';
import { ScatterPlot } from '@nivo/scatterplot';

const Scatterplot = ({ graphData }) => (
	<ScatterPlot
		data={graphData}
		height={window.innerHeight - 150}
		width={window.innerWidth - 50}
		margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
		xScale={{ type: 'linear' }}
		yScale={{ type: 'linear' }}
		useMesh={false}
		zoomable={true}
		axisTop={null}
		axisRight={null}
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
		legends={[
			{
				anchor: 'bottom-right',
				direction: 'column',
				justify: false,
				translateX: 130,
				translateY: 0,
				itemWidth: 100,
				itemHeight: 12,
				itemsSpacing: 5,
				itemDirection: 'left-to-right',
				symbolSize: 12,
				symbolShape: 'circle',
				effects: [
					{
						on: 'hover',
						style: {
							itemOpacity: 1
						}
					}
				]
			}
		]}
	/>
);

export default Scatterplot;
