module.exports = menu_items = 
[
{ url: '/', title: 'Home'},
{ url: '/stats/index', title: 'Stats',
  children: [
    { url: '/stats/str', title: 'Strength' },
    { url: '/stats/dex', title: 'Dexterity' },
    { url: '/stats/con', title: 'Constitution' },
    { url: '/stats/int', title: 'Intelligence' },
    { url: '/stats/wis', title: 'Wisdom' },
    { url: '/stats/cha', title: 'Charisma' }
  ]
},
{ url: '/def/index', title: 'Defenses',
  children: [
    { url: '/def/ac', title: 'Armor Class' },
    { url: '/def/ref', title: 'Reflex' },
    { url: '/def/fort', title: 'Fortitude' },
    { url: '/def/will', title: 'Will' },
    { url: '/def/hp', title: 'Hit Points' },
    { url: '/def/spell', title: 'Spell Protection' },
    { url: '/def/resistance', title: 'Resistance / Immunity' }
  ]
},
{ url: '/combat/index', title: 'Combat',
  children: [
    { url: '/combat/base', title: 'Base Attack Bonus'},
    { url: '/combat/maneuvers', title: 'Combat Maneuvers' }
  ]
},
{ url: '/spells/index', title: 'Spells',
  children: [
    { url: '/spells/magic_item_slots', title: 'Magic Item Slots' },
    { url: '/spells/common_spells', title: 'Common Spells' },
    { url: '/spells/common_magic_items', title: 'Common Magic Items' },
  ]
},
{ url: '/feats/index', title: 'Feats' },
{ url: '/skills/index', title: 'Skills' }
]

