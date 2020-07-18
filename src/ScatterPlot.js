import React from 'react';
import { ScatterPlot } from '@nivo/scatterplot';

const Scatterplot = ({ graphData }) => (
	<ScatterPlot
		data={graphData}
		height={window.innerHeight - 150}
		width={window.innerWidth - 50}
		margin={{ top: 100, right: 90, bottom: 60, left: 90 }}
		useMesh={false}
		axisTop={null}
		axisRight={null}
		nodeSize={15}
		colors={{ scheme: 'set1' }}
		blendMode="multiply"
		tooltip={({ node }) => (
			<div
				style={{
					background: 'white',
					color: 'inherit',
					fontSize: 'inherit',
					borderRadius: 2,
					boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px',
					padding: '5px 9px'
				}}
			>
				<div
					style={{ whiteSpace: 'pre', display: 'flex', alignItems: 'center' }}
				>
					<span
						style={{
							display: 'block',
							width: 12,
							height: 12,
							background: node.style.color,
							marginRight: 7
						}}
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
		legends={[
			{
				anchor: 'top-left',
				direction: 'row',
				justify: false,
				translateX: 0,
				translateY: -60,
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
