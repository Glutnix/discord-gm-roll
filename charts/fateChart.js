const OUTCOMES = {
	YA: 'Yes, and...',
	Y: 'Yes.',
	YB: 'Yes, but...',
	NB: 'No, but...',
	N: 'No.',
	NA: 'No, and...',
};

const eitherWayTable = [
	OUTCOMES.NA,
	OUTCOMES.N,
	OUTCOMES.N,
	OUTCOMES.N,
	OUTCOMES.NB,
	OUTCOMES.YB,
	OUTCOMES.Y,
	OUTCOMES.Y,
	OUTCOMES.Y,
	OUTCOMES.YA,
];

const fateChart = [
	{
		name: 'Extremely Unlikely',
		aliases: ['1', 'XU', 'EU'],
		table: [
			OUTCOMES.NA,
			OUTCOMES.NA,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.NB,
			OUTCOMES.Y,
		],
	},
	{
		name: 'Very Unlikely',
		aliases: ['2', 'VU'],
		table: eitherWayTable,
		diceRolls: 3,
		takeWorst: true,
	},
	{
		name: 'Unlikely',
		aliases: ['3', 'U'],
		table: eitherWayTable,
		diceRolls: 2,
		takeWorst: true,
	},
	{
		name: 'Somewhat Unlikely',
		aliases: ['4', 'SU'],
		table: [
			OUTCOMES.NA,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.NB,
			OUTCOMES.YB,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.YA,
		],
	},
	{
		name: 'Either Way',
		aliases: ['5', 'EW', '50', 'FF'],
		table: eitherWayTable,
	},
	{
		name: 'Somewhat Likely',
		aliases: ['6', 'SL'],
		table: [
			OUTCOMES.NA,
			OUTCOMES.N,
			OUTCOMES.N,
			OUTCOMES.NB,
			OUTCOMES.YB,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.YA,
		],
	},
	{
		name: 'Likely',
		aliases: ['7', 'L'],
		table: eitherWayTable,
		diceRolls: 2,
		takeBest: true,
	},
	{
		name: 'Very Likely',
		aliases: ['8', 'VL'],
		table: eitherWayTable,
		diceRolls: 3,
		takeBest: true,
	},
	{
		name: 'Extremely Likely',
		aliases: ['9', 'XL', 'EL'],
		table: [
			OUTCOMES.N,
			OUTCOMES.YB,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.Y,
			OUTCOMES.YA,
			OUTCOMES.YA,
		],
	},
];

const aliasLookup = fateChart.reduce(
	(lookup, likelihood) => Object.assign(
		lookup,
		likelihood.aliases.reduce(
			(aliasMap, alias) => Object.assign(aliasMap, { [alias.toLowerCase()]: likelihood }),
			{}
		)
	),
	{}
);


module.exports = {
	aliasLookup,
	fateChart,
	OUTCOMES,
};
