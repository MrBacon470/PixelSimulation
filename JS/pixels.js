const particleCategories = ['Solids','Powders','Liquids','Gases','Explosives','Electronics','Special','Misc','Tools']

const particleTypes = [
    {
        name: 'Vacuum',
        desc: 'Literally Nothing',
        abbr: 'VACU',
        color: '#000000',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 0,
        defaultTemp: 0.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Special'
    },
    {
        name: 'Sand',
        desc: 'I hate sand! Its coarse and rough and gets everywhere!',
        abbr: 'SAND',
        color: '#FFD090',
        flammable: false,
        conductive: false,
        weight: 90,
        heatConductivity: 150,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:3090,type:9}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:9},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Water',
        desc: 'H2O what else do you want?',
        abbr: 'WATR',
        color: '#2030D0',
        flammable: false,
        conductive: true,
        weight: 30,
        heatConductivity: 29,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:212,type:5}, //-1 Indicates no change
        lowTemperatureChange: {temp:32,type:10},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    }, 
    {
        name: 'Metal',
        desc: 'Your basic conductive metallic metal',
        abbr: 'METL',
        color: '#8D918D',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 251,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:1273,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:2,id:34},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Fire',
        desc: 'Burns stuff',
        abbr: 'FIRE',
        color: '#e25822',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 88,
        defaultTemp: 2000.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Special'
    },
    {
        name: 'Water Vapor',
        desc: 'Gassy Water',
        abbr: 'WTRV',
        color: '#A0A0FF',
        flammable: false,
        conductive: false,
        weight: 1,
        heatConductivity: 48,
        defaultTemp: 212.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:211,type:2},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: true,
        isPowder: false,
        uiCategory: 'Gases'
    }, 
    {
        name: 'Wood',
        desc: 'Organic Wood burns!',
        abbr: 'WOOD',
        color: '#7C4700',
        flammable: true,
        conductive: false,
        weight: 10,
        heatConductivity: 0.1,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Smoke',
        desc: 'The gas byproduct of burning',
        abbr: 'SMKE',
        color: '#848884',
        flammable: false,
        conductive: false,
        weight: 20,
        heatConductivity: 88,
        defaultTemp: 2000.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:1000,type:0},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: true,
        isPowder: false,
        uiCategory: 'Gases'
    },
    {
        name: 'Sub Zero Flame',
        desc: 'A fire that freezes?',
        abbr: 'SFLM',
        color: '#8080FF',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 88,
        defaultTemp: -500.0,
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Special'
    },
    {
        name: 'Glass',
        desc: 'Molten Sand or Smthn idk',
        abbr: 'GLAS',
        color: '#AFDFE5',
        flammable: false,
        conductive: false,
        weight: 2,
        heatConductivity: 2,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:3090,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Ice',
        desc: 'Frozen Water :O',
        abbr: 'ICE',
        color: '#A0C0FF',
        flammable: false,
        conductive: false,
        weight: 100,
        heatConductivity: 29,
        defaultTemp: 32.0,
        highTemperatureChange: {temp:32.1,type:2},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Solids'
    },
    {
        name: 'Thermite',
        desc: 'Heat it up too much and itll combust (3:1 Al + Fe Oxide)',
        abbr: 'THRM',
        color: '#A08090',
        flammable: false,
        conductive: false,
        weight: 90,
        heatConductivity: 211,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas:false,
        isPowder:true,
        uiCategory: 'Explosives'
    },
    {
        name: 'Spark',
        desc: 'Electrifying!',
        abbr: 'SPRK',
        color: '#FFFF80',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 0,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Electronics'
    },
    {
        name: 'Clone',
        desc: 'Dupes Particles!',
        abbr: 'CLNE',
        color: '#FFD010',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Special'
    },
    {
        name: 'Void',
        desc: 'Destroys Particles!',
        abbr: 'VOID',
        color: '#790B0B',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Special'
    },
    {
        name: 'Tungsten',
        desc: 'Very High Melting Point and Brittle',
        abbr: 'TUNG',
        color: '#505050',
        flammable: false,
        conductive: true,
        weight: 0,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:3695,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:1,id:34},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Solids'
    },
    {
        name: 'Oil',
        desc: 'Smells like Freedom, Turns into GAS at higher temps',
        abbr: 'OIL',
        color: '#404010',
        flammable: true,
        conductive: false,
        weight: 20,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:333,type:17},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:17},
        isLiquid: true,
        isGas:false,
        isPowder:false,
        uiCategory: 'Liquids'
    },
    {
        name: 'Gas',
        desc: 'I swear its all natural. Highly Flammable',
        abbr: 'GAS',
        color: '#E0FF20',
        flammable: true,
        conductive: false,
        weight: 10,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:573,type:4},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas:true,
        isPowder:false,
        uiCategory: 'Gases'
    },
    {
        name: 'Plasma',
        desc: 'Insanely Hot',
        abbr: 'PLSM',
        color: '#BB99FF',
        flammable: false,
        conductive: false,
        weight: 1,
        heatConductivity: 5,
        defaultTemp: 7500,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:7499,type:0},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas:true,
        isPowder:false,
        uiCategory: 'Gases'
    },
    {
        name: 'Heat Conductor',
        desc: 'Conducts heat better than anything',
        abbr: 'HEAC',
        color: '#CB6351',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 255,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Solids'
    },
    {
        name: 'Liquid Nitrogen',
        desc: 'Brrrrrr',
        abbr: 'LN2',
        color: '#80A0DF',
        flammable: false,
        conductive: false,
        weight: 30,
        heatConductivity: 70,
        defaultTemp: -320.0,
        highTemperatureChange: {temp:-320.4,type:0},
        lowTemperatureChange: {temp:-346,type:21},
        explosiveChange: {strength:0,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    },
    {
        name: 'Nitrogen Ice',
        desc: 'How is it colder?!',
        abbr: 'NICE',
        color: '#C0E0FF',
        flammable: false,
        conductive: false,
        weight: 100,
        heatConductivity: 46,
        defaultTemp: -346.6,
        highTemperatureChange: {temp:-346,type:20},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Salt',
        desc: 'What purpose does salt that loses its saltiness have',
        abbr: 'SALT',
        color: '#FFFFFF',
        flammable: false,
        conductive: false,
        weight: 75,
        heatConductivity: 110,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1173),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Salt Water',
        desc: 'Salty Water',
        abbr: 'SLTW',
        color: '#4050F0',
        flammable: false,
        conductive: false,
        weight: 32,
        heatConductivity: 75,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:215.6,type:-1},
        lowTemperatureChange: {temp:28.4,type:10},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    },
    {
        name: 'Lava',
        desc: 'Molten Rock',
        abbr: 'LAVA',
        color: '#E05010',
        flammable: false,
        conductive: false,
        weight: 45,
        heatConductivity: 60,
        defaultTemp: 1100.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:1099,type:25},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    },
    {
        name: 'Stone',
        desc: 'Rock Solid',
        abbr: 'STNE',
        color: '#A0A0A0',
        flammable: false,
        conductive: false,
        weight: 90,
        heatConductivity: 150,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:1100,type:24},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:2,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Insulation',
        desc: 'Opposite of HEAC, Behaves sorta like VACU',
        abbr: 'INSL',
        color: '#9EA3B6',
        flammable: true,
        conductive: false,
        weight: 100,
        heatConductivity: 0,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Quartz',
        desc: 'A crystalline material, grows with SLTW',
        abbr: 'QRTZ',
        color: '#AADDDD',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 3,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(2573),type:24},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:2,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Silicon',
        desc: 'Can be used to create electronic things',
        abbr: 'SLCN',
        color: '#BCCDDF',
        flammable: false,
        conductive: true,
        weight: 90,
        heatConductivity: 100,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:2577.2,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Diesel',
        desc: 'Truck Food or smthn idk',
        abbr: 'DESL',
        color: '#440000',
        flammable: true,
        conductive: false,
        weight: 15,
        heatConductivity: 42,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(335.0),type:4},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    },
    {
        name: 'TNT',
        desc: 'Trinitrotoluene goes boom',
        abbr: 'TNT',
        color: '#C05050',
        flammable: false,
        conductive: false,
        weight: 100,
        heatConductivity: 88,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Explosives'
    },
    {
        name: 'Nitroglycerin',
        desc: 'Liquid Explosive?',
        abbr: 'NITR',
        color: '#20E010',
        flammable: false,
        conductive: false,
        weight: 23,
        heatConductivity: 50,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Explosives'
    },
    {
        name: 'Clay Dust',
        desc: 'Can be Mixed to make TNT',
        abbr: 'CLST',
        color: '#E4A4A4',
        flammable: false,
        conductive: false,
        weight: 55,
        heatConductivity: 70,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1256.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:0,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Iron',
        desc: 'SALT rusts it can electrolize water',
        abbr: 'IRON',
        color: '#707070',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1687.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:2,id:34},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Broken Metal',
        desc: 'Rust, Scrap whatever you want it to be',
        abbr: 'BRMT',
        color: '#705060',
        flammable: false,
        conductive: true,
        weight: 90,
        heatConductivity: 211,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1273.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Gunpowder',
        desc: 'Explosive Powder?',
        abbr: 'GUNP',
        color: '#C0C0D0',
        flammable: false,
        conductive: false,
        weight: 90,
        heatConductivity: 211,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(673.0),type:4},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Explosives'
    },
    {
        name: 'N-Type silicon',
        desc: 'Doesn\'t conduct to P-Type Silicon',
        abbr: 'NSCN',
        color: '#505080',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1687.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:1,id:38},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Electronics'
    },
    {
        name: 'P-Type silicon',
        desc: 'Conducts to everything',
        abbr: 'PSCN',
        color: '#805050',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1687.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:1,id:38},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Electronics'
    },
    {
        name: 'Broken Electronics',
        desc: 'Formed from exploded or melted electronics',
        abbr: 'BREL',
        color: '#707060',
        flammable: false,
        conductive: true,
        weight: 90,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1687.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Broken Electronics',
        desc: 'Formed from exploded or melted electronics',
        abbr: 'BREL',
        color: '#707060',
        flammable: false,
        conductive: true,
        weight: 90,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(1687.0),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Bizarre',
        desc: 'Acts very well... Bizarre',
        abbr: 'BIZR',
        color: '#00FF77',
        flammable: false,
        conductive: false,
        weight: 30,
        heatConductivity: 29,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(400.0),type:42},
        lowTemperatureChange: {temp:celsiusToFarenheit(100.0),type:41},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    },
    {
        name: 'Bizarre Gas',
        desc: 'Huh??',
        abbr: 'BIZG',
        color: '#00FFBB',
        flammable: false,
        conductive: false,
        weight: 30,
        heatConductivity: 29,
        defaultTemp: 100.0,
        highTemperatureChange: {temp:celsiusToFarenheit(100.0),type:40},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: true,
        isPowder: false,
        uiCategory: 'None'
    },
    {
        name: 'Solid Bizarre',
        desc: 'How??',
        abbr: 'BIZS',
        color: '#00E455',
        flammable: false,
        conductive: false,
        weight: 30,
        heatConductivity: 29,
        defaultTemp: 400.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:celsiusToFarenheit(400.1),type:40},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'None'
    },
    {
        name: 'Gold',
        desc: 'So Shiny',
        abbr: 'GOLD',
        color: '#DCAD2C',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 251,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:1948,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:1,id:34},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Diamond',
        desc: 'Indestructable',
        abbr: 'DMND',
        color: '#CCFFFF',
        flammable: false,
        conductive: false,
        weight: 100,
        heatConductivity: 186,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:-1,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Special'
    },
    {
        name: 'Ceramic',
        desc: 'Heat high tolerance and blast resistance',
        abbr: 'CRMC',
        color: '#D6D1D4',
        flammable: false,
        conductive: false,
        weight: 100,
        heatConductivity: 35,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:celsiusToFarenheit(2887.15),type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        explosiveChange: {strength:4,id:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
]
//Particle Type IDs for easy remebering
const VACU = 0
const WATR = 2
const FIRE = 4
const WTRV = 5
const SMKE = 7
const SFLM = 8
const SPRK = 12
const CLNE = 13
const VOID = 14

function updateParticle() {
    let row = getRandomInt(particleGrid.length)
    let col = getRandomInt(particleGrid[row].length)
    let currentParticle = getParticle(row,col)
    const particleType = getParticleType(row,col)
    particleConversions(row,col)
    heatTransfer(row,col)
    if(currentParticle.id === VACU) return
    updatePhase(row,col)
    updateSPRK(row,col)
    if(currentParticle.type === 'Powder') {
        let down = isInBounds(row+1,col) && (getParticle(row+1,col).id === VACU || (getParticle(row+1,col).type === 'Powder' && particleTypes[getParticle(row+1,col).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col).type === 'Liquid' || getParticle(row+1,col).type === 'Gas')
        let left = isInBounds(row+1,col-1) && (getParticle(row+1,col-1).id === VACU || (getParticle(row+1,col-1).type === 'Powder' && particleTypes[getParticle(row+1,col-1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col-1).type === 'Liquid' || getParticle(row+1,col-1).type === 'Gas')
        let right = isInBounds(row+1,col+1) && (getParticle(row+1,col+1).id === VACU || (getParticle(row+1,col+1).type === 'Powder' && particleTypes[getParticle(row+1,col+1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col+1).type === 'Liquid' || getParticle(row+1,col+1).type === 'Gas')
        if(!down && !left && !right) return //If it can't move don't waste time
        if(left && right) {
            const rand = Math.random()
            if(rand >= 0.5)
                right = false
            else
                left = false
        }
        let temp = getParticle(row,col)
        if(down) {
            setParticleObj(row,col,getParticle(row+1,col))
            setParticleObj(row+1,col,temp)
        }
        else if(left) {
            setParticleObj(row,col,getParticle(row+1,col-1))
            setParticleObj(row+1,col-1,temp)
        }
        else if(right) {
            setParticleObj(row,col,getParticle(row+1,col+1))
            setParticleObj(row+1,col+1,temp)
        }
    }
    else if(currentParticle.type === 'Liquid') {
        let rand = getRandomInt(3);
        if(rand === 0 && isInBounds(row+1,col)) {
            if(getParticle(row+1,col).id == VACU || (getParticle(row+1,col).type === 'Liquid' && particleTypes[getParticle(row+1,col).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col).type === 'Gas') {
                setParticleObj(row,col,getParticle(row+1,col)) 
                setParticleObj(row+1,col,currentParticle)
            }
        }
        else if(rand === 1 && isInBounds(row,col-1)) {
            if(getParticle(row,col-1).id == VACU || (getParticle(row,col-1).type === 'Liquid' && particleTypes[getParticle(row,col-1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row,col-1).type === 'Gas') {
                setParticleObj(row,col,getParticle(row,col-1)) 
                setParticleObj(row,col-1,currentParticle)
            }
        }
        else if(rand === 2 && isInBounds(row,col+1)) {
            if(getParticle(row,col+1).id == VACU || (getParticle(row,col+1).type === 'Liquid' && particleTypes[getParticle(row,col+1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row,col+1).type === 'Gas') {
                setParticleObj(row,col,getParticle(row,col+1)) 
                setParticleObj(row,col+1,currentParticle)
            }
        }
    }
    else if(currentParticle.type === 'Gas') {
        let rand = getRandomInt(3);
        if(rand === 0 && row-1 > -1) {
            if(getParticle(row-1,col).id == VACU || (getParticle(row-1,col).type === 'Gas' && particleTypes[getParticle(row-1,col).id].weight > particleTypes[getParticle(row,col).id].weight)) {
                setParticleObj(row,col,getParticle(row-1,col)) 
                setParticleObj(row-1,col,currentParticle)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(getParticle(row,col-1).id == VACU || (getParticle(row,col-1).type === 'Gas' && particleTypes[getParticle(row,col-1).id].weight > particleTypes[getParticle(row,col).id].weight)) {
                setParticleObj(row,col,getParticle(row,col-1)) 
                setParticleObj(row,col-1,currentParticle)
            }
        }
        else if(rand === 2 && col+1 < particleGrid[row].length) {
            if(getParticle(row,col+1).id == VACU || (getParticle(row,col+1).type === 'Gas' && particleTypes[getParticle(row,col+1).id].weight > particleTypes[getParticle(row,col).id].weight)) {
                setParticleObj(row,col,getParticle(row,col+1)) 
                setParticleObj(row,col+1,currentParticle)
            }
        }
    }
    //Special Particle Changes
    switch(particleType.abbr) {
        case 'FIRE':
            let up = row-1 > -1 && (particleTypes[getParticle(row-1,col).id].flammable || getParticle(row-1,col).id == WATR)
        let down = row+1 < particleGrid.length && (particleTypes[getParticle(row+1,col).id].flammable || getParticle(row+1,col).id == WATR)
        let left = col-1 > -1 && (particleTypes[getParticle(row,col-1).id].flammable || getParticle(row,col-1).id == WATR)
        let right = col+1 < particleGrid[row].length && (particleTypes[getParticle(row,col+1).id].flammable || getParticle(row,col+1).id == WATR)
        
        if(up) {
            if(getParticle(row-1,col).id != WATR)
                setParticle(row-1,col,FIRE)
            else {
                particleGrid[row-1][col] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row-1,col)
                    drawParticle(row,col)
                },200)
                return
            }
        } 
        if(down) {
            if(getParticle(row+1,col).id != WATR) 
                setParticle(row+1,col,FIRE)
            else {
                particleGrid[row+1][col] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row+1,col)
                    drawParticle(row,col)
                },200)
                return
            }
        }
        if(left) {
            if(getParticle(row,col-1).id != WATR)
                setParticle(row,col-1,FIRE)
            else {
                particleGrid[row][col-1] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row,col-1)
                    drawParticle(row,col)
                },200)
                return
            }
        }
        if(right) {
            if(getParticle(row,col+1).id != WATR)
                setParticle(row,col+1,FIRE)
            else {
                particleGrid[row][col+1] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row,col+1)
                    drawParticle(row,col)
                },200)
                return
            }
        }
        setTimeout(() => {
            setParticle(row,col,SMKE)
        },200)
            break
        case 'SFLM':
            setTimeout(()=>{
                setParticle(row,col,0)
            },200)
            break
        case 'CLNE':
            if(currentParticle.tmp === null) {
                const surroundingParticles = getSurroundingParticles(row,col)
                for(let i = 0; i < surroundingParticles.length; i++) {
                    if(surroundingParticles[i] !== -1 && surroundingParticles[i].id !== VACU && surroundingParticles[i].type !== 'Solid') {
                        setParticleTmpVar(row,col,surroundingParticles[i].id)
                        return
                    }
                }
            }
            else {
                const i = getRandomInt(4)
                switch(i) {
                    case 0:
                        if(isInBounds(row-1,col) && getParticle(row-1,col).id === VACU)
                            setParticle(row-1,col,currentParticle.tmp)
                        break
                    case 1:
                        if(isInBounds(row+1,col) && getParticle(row+1,col).id === VACU)
                            setParticle(row+1,col,currentParticle.tmp)
                        break
                    case 2:
                        if(isInBounds(row,col-1) && getParticle(row,col-1).id === VACU)
                            setParticle(row,col-1,currentParticle.tmp)
                        break
                    case 3:
                        if(isInBounds(row,col+1) && getParticle(row,col+1).id === VACU)
                            setParticle(row,col+1,currentParticle.tmp)
                        break
                    default:
                        return
                }
            }
            break
        case 'VOID':
            if(isInBounds(row-1,col) && getParticle(row-1,col).id !== VACU && getParticle(row-1,col).type !== 'Solid')
            setParticle(row-1,col,0)
        if(isInBounds(row+1,col) && getParticle(row+1,col).id !== VACU && getParticle(row+1,col).type !== 'Solid')
            setParticle(row+1,col,0)
        if(isInBounds(row,col-1) && getParticle(row,col-1).id !== VACU && getParticle(row,col-1).type !== 'Solid')
            setParticle(row,col-1,0)
        if(isInBounds(row,col+1) && getParticle(row,col+1).id !== VACU && getParticle(row,col+1).type !== 'Solid')
            setParticle(row,col+1,0)
            break
    }
}

function particleConversions(r,c) {
    let particle = getParticle(r,c)
    let particleType = particleTypes[particle.id]
    switch(particleType.abbr) {
        case 'THRM':
            if(particle.temp >= 100) {
                setParticleObj(r,c,{id:3,temp:4000.0,type:'Liquid'})
            }
            break
        case 'SALT':
            if(isInBounds(r-1,c) && getParticle(r-1,c).id === WATR) {
                setParticleId(r-1,c,23)
                if(Math.random() <= 0.33) {
                    setParticleId(r,c,23)
                    return
                }
            }
            if(isInBounds(r+1,c) && getParticle(r+1,c).id === WATR) {
                setParticleId(r+1,c,23)
                if(Math.random() <= 0.33) {
                    setParticleId(r,c,23)
                    return
                }
            }
            if(isInBounds(r,c-1) && getParticle(r,c-1).id === WATR) {
                setParticleId(r,c-1,23)
                if(Math.random() <= 0.33) {
                    setParticleId(r,c,23)
                    return
                }
            }
            if(isInBounds(r,c+1) && getParticle(r,c+1).id === WATR) {
                setParticleId(r,c+1,23)
                if(Math.random() <= 0.33) {
                    setParticleId(r,c,23)
                    return
                }
            }
            break
        case 'SLTW': 
            if(particle.temp >= particleType.highTemperatureChange.temp) {
                const rng = Math.random()
                if(rng < 0.5)
                    setParticleId(r,c,22)
                else
                    setParticleId(r,c,5)
            }
            break
        case 'QRTZ':
            if(isInBounds(r-1,c) && getParticle(r-1,c).id === 23) {
                setParticleId(r-1,c,27)
            }
            if(isInBounds(r+1,c) && getParticle(r+1,c).id === 23) {
                setParticleId(r+1,c,27)
            }
            if(isInBounds(r,c-1) && getParticle(r,c-1).id === 23) {
                setParticleId(r,c-1,27)
            }
            if(isInBounds(r,c+1) && getParticle(r,c+1).id === 23) {
                setParticleId(r,c+1,27)
            }
            break
        case 'TNT':
            if(particle.temp >= celsiusToFarenheit(90) || checkSidesForParticle(r,c,'FIRE'))
                explodeParticle(r,c,3)
            break
        case 'NITR':
            if(particle.temp >= celsiusToFarenheit(50) || checkSidesForParticle(r,c,'FIRE')) 
                explodeParticle(r,c,4)
            break
        case 'CLST':
            if(isInBounds(r-1,c) && getParticle(r-1,c).id === 31) {
                setParticleId(r-1,c,VACU)
                setParticleId(r,c,30)
            }
            else if(isInBounds(r+1,c) && getParticle(r+1,c).id === 31) {
                setParticleId(r+1,c,VACU)
                setParticleId(r,c,30)
            }
            else if(isInBounds(r,c-1) && getParticle(r,c-1).id === 31) {
                setParticleId(r,c-1,VACU)
                setParticleId(r,c,30)
            }
            else if(isInBounds(r,c+1) && getParticle(r,c+1).id === 31) {
                setParticleId(r,c+1,VACU)
                setParticleId(r,c,30)
            }
            break
        case 'IRON': 
            if(isInBounds(r-1,c) && checkParticleAbbr(r-1,c,'SALT')) {
                setParticleId(r,c,34)
            }
            else if(isInBounds(r+1,c) && checkParticleAbbr(r+1,c,'SALT')) {
                setParticleId(r,c,34)
            }
            else if(isInBounds(r,c-1) && checkParticleAbbr(r,c-1,'SALT')) {
                setParticleId(r,c,34)
            }
            else if(isInBounds(r,c+1) && checkParticleAbbr(r,c+1,'SALT')) {
                setParticleId(r,c,34)
            }
            break
        case 'GUNP':
            if(particle.temp >= celsiusToFarenheit(464) || checkSidesForParticle(r,c,'FIRE'))
                explodeParticle(r,c,2)
            break
        default:
            //No Conversion
            break
    }
}

/*
* [r-1,c-1][r-1,c][r-1,c+1]
* [r,c-1][r,c][r,c+1]
* [r+1,c-1][r+1,c][r+1,c+1]
*/
//Sets Fire to Everyparticle in the area
function explodeParticle(r,c,radius) {
    const particleType = getParticleType(r,c).abbr
    setParticle(r,c,FIRE)
    for(let rw = -(radius-1); rw < radius; rw++) {
        for(let cl = -(radius-1); cl < radius; cl++) {
            if(isInBounds(r+rw,c+cl) && getParticle(r+rw,c+cl).id !== FIRE && getParticleType(r+rw,c+cl).explosiveChange.strength <= radius && getParticleType(r+rw,c+cl).explosiveChange.strength !== -1) {
                const particleAbbr = getParticleType(r+rw,c+cl).abbr
                    if(particleAbbr === particleType) explodeParticle(r+rw,c+cl)
                    else if(getParticleType(r+rw,c+cl).explosiveChange.id !== -1) {
                        setParticle(r+rw,c+cl,getParticleType(r+rw,c+cl).explosiveChange.id)
                        particleGrid[r+rw][c+cl].temp = 2000
                    }
                    else setParticle(r+rw,c+cl,FIRE)
            }
        }
    }
}

function checkSidesForParticle(r,c,particleTargetAbbr) {
    if(isInBounds(r-1,c) && getParticleType(r-1,c).abbr === particleTargetAbbr) return true
    else if(isInBounds(r+1,c) && getParticleType(r+1,c).abbr === particleTargetAbbr) return true
    else if(isInBounds(r,c-1) && getParticleType(r,c-1).abbr === particleTargetAbbr) return true
    else if(isInBounds(r,c+1) && getParticleType(r,c+1).abbr === particleTargetAbbr) return true
    return false
}