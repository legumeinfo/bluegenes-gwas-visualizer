import React, { useEffect, useState } from 'react';
import { queryData } from './query';

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
				const xAxisVal = allDigits[allDigits.length - 1] * 1;
				obj[primaryIdentifier].data.push({
					x: -1 * Math.log10(r.pValue),
					y: xAxisVal + chromosomeLocation.start / chromosome.length
				});
			});
		});
		setGraphData([...Object.values(obj)]);
	}, [data]);
	return (
		<div className="rootContainer">
			{data.length && graphData.length ? (
				<h1>Your Data Viz Here</h1>
			) : (
				<h1>Loading</h1>
			)}
		</div>
	);
};

export default RootContainer;
