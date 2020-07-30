import React from 'react';
import { ScatterPlot } from '@nivo/scatterplot';

const Scatterplot = ({ graphData, minAxis }) => (
	<>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-evenly',
				flexFlow: 'wrap',
				marginTop: 20,
				fontFamily: 'sans-serif',
				fontSize: 13
			}}
		>
			{graphData.map(data => (
				<div key={data.id} style={{ display: 'flex', alignItems: 'center' }}>
					<span
						style={{
							background: data.color,
							borderRadius: '50%',
							display: 'block',
							width: 12,
							height: 12,
							margin: '5px 7px 2px 10px'
						}}
					></span>
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
						style={{
							whiteSpace: 'pre',
							display: 'flex',
							alignItems: 'center'
						}}
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
		/>
	</>
);

export default Scatterplot;
