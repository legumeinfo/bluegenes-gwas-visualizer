import React, { useEffect, useState } from 'react';
import { queryData } from './query';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		let { value } = entity;
		queryData({
			serviceUrl: serviceUrl,
			geneId: value
		}).then(data => setData(data));
	}, []);
	return (
		<div className="rootContainer">
			{data.length ? <h1>Your Data Viz Here</h1> : <h1>Loading</h1>}
		</div>
	);
};

export default RootContainer;
