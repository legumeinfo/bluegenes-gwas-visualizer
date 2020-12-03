const soymineQuery = gwasId => ({
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
	    op: 'ONE OF',
	    values: gwasId
	}
    ]
});

const queryData = ({ gwasId, serviceUrl, imjsClient = imjs }) => {
    const query = soymineQuery;
    const service = new imjsClient.Service({
	root: serviceUrl
    });
    return new Promise((resolve, reject) => {
	service
	    .records(query(gwasId))
	    .then(res => {
		// if (res.length === 0) reject('No data found!');
		resolve(res);
	    })
	    .catch(() => reject('No data found!'));
    });
};

export { queryData };
