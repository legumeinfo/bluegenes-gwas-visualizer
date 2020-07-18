import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import Scatterplot from './ScatterPlot';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		setLoading(true);
		let { value } = entity;
		queryData({
			serviceUrl: serviceUrl,
			geneId: value
		})
			.then(data => {
				setData(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	useEffect(() => {
		const obj = {};
		data.forEach(d => {
			d.results.forEach(r => {
				if (
					!r.marker ||
					!r.pValue ||
					!r.marker.chromosome ||
					!r.marker.chromosomeLocation
				)
					return;
				const { primaryIdentifier } = r.phenotype;
				const { chromosome, chromosomeLocation } = r.marker;
				if (!obj[primaryIdentifier])
					obj[primaryIdentifier] = {
						id: primaryIdentifier,
						data: []
					};
				const allDigits = chromosome.secondaryIdentifier.match(/\d+/g) || [];
				const xAxisVal = allDigits.length
					? allDigits[allDigits.length - 1] * 1 - 1
					: 0;
				obj[primaryIdentifier].data.push({
					x: xAxisVal + chromosomeLocation.start / chromosome.length,
					y: -1 * Math.log10(r.pValue),
					tooltip: r.marker && r.marker.primaryIdentifier
				});
			});
		});
		setGraphData([...Object.values(obj)]);
	}, [data]);
	return (
		<div className="rootContainer">
			<span className="chart-title">GWAS Visualizer</span>
			{!loading ? (
				<div className="graph">
					{graphData.length ? (
						<Scatterplot graphData={graphData} />
					) : (
						<h1>No data found to visualize</h1>
					)}
				</div>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default RootContainer;
