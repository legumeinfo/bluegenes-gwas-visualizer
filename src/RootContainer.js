import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import Scatterplot from './ScatterPlot';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		let { value } = entity;
		queryData({
			serviceUrl: serviceUrl,
			geneId: value
		}).then(data => setData(data));
	}, []);

	useEffect(() => {
		const obj = {};
		data.forEach(d => {
			d.results.forEach(r => {
				const { primaryIdentifier } = r.phenotype;
				const { chromosome, chromosomeLocation } = r.marker;
				if (!obj[primaryIdentifier])
					obj[primaryIdentifier] = {
						id: primaryIdentifier,
						data: []
					};
				const allDigits = chromosome.secondaryIdentifier.match(/\d+/g);
				const xAxisVal = allDigits[allDigits.length - 1] * 1 - 1;
				obj[primaryIdentifier].data.push({
					x: xAxisVal + chromosomeLocation.start / chromosome.length,
					y: -1 * Math.log10(r.pValue),
					tooltip: r.marker.primaryIdentifier
				});
			});
		});
		setGraphData([...Object.values(obj)]);
	}, [data]);
	return (
		<div className="rootContainer">
			<span className="chart-title">GWAS Visualizer</span>
			{data.length ? (
				<div className="graph">
					<Scatterplot graphData={graphData} />
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default RootContainer;
