const query = geneId => ({
	from: 'GWAS',
	select: [
		'results.study.primaryIdentifier',
		'results.phenotype.primaryIdentifier',
		'results.marker.primaryIdentifier',
		'results.pValue',
		'results.marker.chromosome.secondaryIdentifier',
		'results.marker.chromosomeLocation.start',
		'results.marker.chromosome.length'
	],
	joins: ['results.study', 'results.phenotype', 'results.marker'],
	where: [
		{
			path: 'id',
			op: '=',
			value: geneId,
			code: 'A'
		}
	]
});

const queryData = ({ geneId, serviceUrl, imjsClient = imjs }) => {
	const service = new imjsClient.Service({
		root: serviceUrl
	});
	return new Promise((resolve, reject) => {
		service
			.records(query(geneId))
			.then(res => {
				// if (res.length === 0) reject('No data found!');
				resolve(res);
			})
			.catch(() => reject('No data found!'));
	});
};

export { queryData };
