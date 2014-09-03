var productsData = [
	{
		'name' : 'intramicine',
		'type' : 'antibio',
		'labo' : 'ceva',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'ovin', 'caprin', 'porcin', 'canin'],
		'composition' : {'benzylpenicilline' : 114, 'dihydrostreptomycine' : 200}
	},
	{
		'name' : 'cortexiline',
		'type' : 'antibio',
		'labo' : 'merial',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'canin'],
		'composition' : {'benzylpenicilline' : 114, 'neomycine' : 120}
	},
	{
		'name' : 'stop m',
		'type' : 'antibio',
		'labo' : 'boehringer',
		'unit' : 'ml',
		'qunit' : 30,
		'nunit' : 'pro_nunit_flacon',
		'target' : ['bovin'],
		'composition' : {'pénéthamate' : 257}
	},
	{
		'name' : 'histacline',
		'type' : 'antibio',
		'labo' : 'ceva',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin'],
		'composition' : {'benzylpenicilline' : 114, 'dihydrostreptomycine' : 200}
	},
	{
		'name' : 'histabiosone',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'ml ',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'caprin', 'porcin'],
		'composition' : {'benzylpenicilline' : 113.6, 'dihydrostreptomycine' : 250}
	},
	{
		'name' : 'vetrimoxin 48h',
		'type' : 'antibio',
		'labo' : 'ceva',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'amoxycilline' : 150}
	},
	{
		'name' : 'shotapen',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin', 'canin'],
		'composition' : {'benzylpenicilline' : 131, 'dihydrostreptomycine' : 164}
	},
	{
		'name' : 'clamoxyl suspension',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'ovin', 'porcin', 'canin'],
		'composition' : {'amoxycilline' : 150}
	},
	{
		'name' : 'noroclav injectable',
		'type' : 'antibio',
		'labo' : 'bayer',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin'],
		'composition' : {'amoxycilline' : 140, 'acide clavulanique' : 35}
	},
	{
		'name' : 'amphoprim solution',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['équin', 'bovin', 'canin'],
		'composition' : {'sulfadimidine' : 200, 'triméthoprime' : 40}
	},
	{
		'name' : 'longicine',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'ovin', 'porcin'],
		'composition' : {'oxytétracycline' : 200}
	},
	{
		'name' : 'oxytetracycline 10%',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['équin', 'bovin', 'caprin', 'ovin', 'porcin'],
		'composition' : {'oxytétracycline' : 100}
	},
	{
		'name' : 'covunil',
		'type' : 'antibio',
		'labo' : 'merial',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin'],
		'composition' : {'oxytétracycline' : 300}
	},
	{
		'name' : 'g4',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'canin'],
		'composition' : {'gentamicine' : 40}
	},
	{
		'name' : 'colicilline',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'ampicilline' : 100, 'colistine' : '250000ui'}
	},
	{
		'name' : 'pangram 4%',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'canin'],
		'composition' : {'gentamicine' : 40}
	},
	{
		'name' : 'multibio',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['équin', 'bovin', 'ovin', 'porcin'],
		'composition' : {'ampicilline' : 100, 'colistine' : '250000ui'}
	},
	{
		'name' : 'zactran',
		'type' : 'antibio',
		'labo' : 'merial',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin'],
		'composition' : {'gamithromycine' : 150}
	},
	{
		'name' : 'draxxin',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'tulathromycine' : 100}
	},
	{
		'name' : 'kefloryl 300mg/ml',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'florfenicol' : 300}
	},
	{
		'name' : 'cefenil 50mg/ml',
		'type' : 'antibio',
		'labo' : 'ceva',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'ceftiofur' : 50}
	},
	{
		'name' : 'ceftiocyl 50mg/ml',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'ceftiofur' : 50}
	},
	{
		'name' : 'a 180',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin'],
		'composition' : {'danofloxacine' : 180}
	},
	{
		'name' : 'cobactan 2.5%',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'cefquinome' : 25}
	},
	{
		'name' : 'marbocyl 10%',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'marbofloxacine' : 100}
	},
	{
		'name' : 'marbocyl 2%',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'marbofloxacine' : 20}
	},
	{
		'name' : 'marbocyl bolus',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'mg',
		'qunit' : 1500,
		'nunit' : 'pro_nunit_pill',
		'target' : ['bovin', 'porcin'],
		'composition' : {'marbofloxacine' : 50}
	},
	{
		'name' : 'marbocyl f.d.',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['chien', 'chat'],
		'composition' : {'marbofloxacine' : 10}
	},
	{
		'name' : 'suanovil 20',
		'type' : 'antibio',
		'labo' : 'merial',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'porcin'],
		'composition' : {'spiramycine' : '600000ui'}
	},
	{
		'name' : 'tylan 200',
		'type' : 'antibio',
		'labo' : 'elanco',
		'unit' : 'ml',
		'qunit' : 1,
		'nunit' : 'vrac',
		'target' : ['bovin', 'ovin', 'caprin', 'porcin'],
		'composition' : {'tylosine' : 200}
	},
	{
		'name' : 'intestivo',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'mg',
		'qunit' : 2500,
		'nunit' : 'pro_nunit_pill',
		'target' : ['bovin', 'ovin', 'caprin'],
		'composition' : {'colistine' : '2500000ui', 'sulfaguanidine' : 1000}
	},
	{
		'name' : 'synulox 500mg ogivettes',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'mg',
		'qunit' : 2970,
		'nunit' : 'pro_nunit_pill',
		'target' : ['bovin'],
		'composition' : {'amoxicilline' : 400, 'acide clavulanique' : 100}
	},
	{
		'name' : 'mastiplan lc',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'mg',
		'qunit' : 8000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cefapirine' : 300}
	},
	{
		'name' : 'synulox intramammaire',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'mg',
		'qunit' : 3000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'amoxycilline' : 200, 'acide clavulanique' : 20}
	},
	{
		'name' : 'ampiclox ar',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'mg',
		'qunit' : 3000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cloxacilline' : 200, 'ampicilline' : 75}
	},
	{
		'name' : 'metricure',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'mg',
		'qunit' : 19000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cefapirine' : 500}
	},
	{
		'name' : 'aureomycine oblets',
		'type' : 'antibio',
		'labo' : 'merial',
		'unit' : 'mg',
		'qunit' : 6000,
		'nunit' : 'pro_nunit_pill',
		'target' : ['bovin'],
		'composition' : {'chlortétracycline' : 929.17}
	},
	{
		'name' : 'orospray',
		'type' : 'antibio',
		'labo' : 'vetoquinol',
		'unit' : 'mg',
		'qunit' : 1000,
		'nunit' : 'pro_nunit_aerosol',
		'target' : ['bovin', 'ovin', 'caprin', 'porcin', 'canin'],
		'composition' : {'sulfanilamide' : 500, 'chlortétracycline' : 28.50}
	},
	{
		'name' : 'ubrolexin',
		'type' : 'antibio',
		'labo' : 'boehringer',
		'unit' : 'mg',
		'qunit' : 10000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cefalexine' : 200, 'kanamycine' : '100000ui'}
	},
	{
		'name' : 'pathozone',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'ml',
		'qunit' : 10,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cefopérazone' : 250}
	},
	{
		'name' : 'cobactan lc',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'mg',
		'qunit' : 8000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cefquinome' : 75}
	},
	{
		'name' : 'lincocine intramammaire',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'ml',
		'qunit' : 10,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'lincomycine' : 330, 'néomycine' : 100}
	},
	{
		'name' : 'masti peni',
		'type' : 'antibio',
		'labo' : 'virbac',
		'unit' : 'ml',
		'qunit' : 10,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'benzylpenicilline' : 570, 'dihydrostreptomycine' : 410}
	},
	{
		'name' : 'nafpenzal t',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'mg',
		'qunit' : 3000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin', 'ovin', 'caprin'],
		'composition' : {'benzylpenicilline' : 300, 'dihydrostreptomycine' : 100, 'nafcilline' : 100}
	},
	{
		'name' : 'cepravin',
		'type' : 'antibio',
		'labo' : 'msd',
		'unit' : 'mg',
		'qunit' : 3000,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cefalonium' : 250}
	},
	{
		'name' : 'orbenor hl',
		'type' : 'antibio',
		'labo' : 'zoetis',
		'unit' : 'mg',
		'qunit' : 3600,
		'nunit' : 'pro_nunit_injector',
		'target' : ['bovin'],
		'composition' : {'cloxacilline' : 600}
	}
];