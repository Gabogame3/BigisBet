import items from './ItemTable.json'
import stores from './StoreTable.json'

//Combat Tables
import loot from './combat/LootTable.json'
import { attacks } from './combat/AttackTable.js'
import * as consumeText from './combat/ConsumeTextTable.js'
import skills from './combat/SkillTable.json'

//Character Tables
import * as measurements from './character/MeasurementTable'
import { species, speciesDesc } from './character/SpeciesTable'
import { genders, pronouns } from './character/Genders'

//City Tables
import * as cityText from './cityTable'

import settings from './SettingsTable.json'

import statTypes from './StatType.json'
import stats from './StatTable.json'

export {
        items,
        loot,
        stores,
        attacks,
        skills,
        consumeText,
        measurements,
        species,
        speciesDesc,
        genders,
        pronouns,
        settings,
        cityText,
        statTypes,
        stats
}