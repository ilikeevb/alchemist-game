export const state = () => ({
    levels: [
        {
            id: 1,
            record: 0,
            done: true,
            close: false,
            history: ["Твоё первое задание!", "Помоги Алхимику собрать металлы"],
            name: 'Металлы. Часть 1',
            stars: [{ active: true }, { active: false }, { active: false }],
            theory: [
                "Металлы: <span style = 'color: green' >Литий (Li)</span >, <span style = 'color: green' >Железо (Fe)</span >, <span style = 'color: green'>Серебро (Ag)</span >, <span style = 'color: green' >Золото (Au)</span >, <span style = 'color: green' >Свинец (Pb)</span >, <span style = 'color: green' >Вольфрам (W)</span >, <span style = 'color: green' >Алюминий (Al)</span > и др.",
                "Металлы (от лат. metallum — шахта, рудник) — группа элементов, в виде простых веществ обладающих характерными металлическими свойствами, такими как высокие тепло- и электропроводность, положительный температурный коэффициент сопротивления, высокая пластичность и металлический блеск.",
            ],
            target: 15,
            background: 'bg3',
            elements: [
                {
                    name: "Железо",
                    active: true,
                    good: true,
                    speed: 1,
                    xPos: 400,
                    yPos: 140,
                },
                {
                    name: "Водород",
                    active: true,
                    good: false,
                    speed: 1.25,
                    xPos: 120,
                    yPos: 100,
                },
                {
                    name: "Неон",
                    active: true,
                    good: false,
                    speed: 1,
                    xPos: 600,
                    yPos: 220,
                },
            ],
            good: ["Литий",
                "Железо",
                "Серебро",
                "Золото",
                "Свинец",
                "Вольфрам",
                "Алюминий"],
            bad: ["Водород", "Азот", "Неон", "Гелий", "Хлор", "Аргон", "Селен"],
        },
        {
            id: 2,
            record: 0,
            done: false,
            close: true,
            history: ["В прошлый раз ты отлично справился!", "В этот раз будет посложнее.", "Помоги Алхимику собрать металлы"],
            name: 'Металлы. Часть 2',
            stars: [{ active: true }, { active: true }, { active: false }],
            theory: [
                "Металлы: <span style = 'color: green' >Li</span >, <span style = 'color: green' >Fe</span >, <span style = 'color: green' >Ag</span >, <span style = 'color: green' >Au</span >, <span style = 'color: green' >Pb</span >, <span style = 'color: green' >W</span >, <span style = 'color: green' >Al</span > и др.",
                "Металлы (от лат. metallum — шахта, рудник) — группа элементов, в виде простых веществ обладающих характерными металлическими свойствами, такими как высокие тепло- и электропроводность, положительный температурный коэффициент сопротивления, высокая пластичность и металлический блеск.",
            ],
            target: 15,
            background: 'bg4',
            elements: [
                {
                    name: "Железо",
                    active: true,
                    good: true,
                    speed: 1,
                    xPos: 400,
                    yPos: 140,
                },
                {
                    name: "Водород",
                    active: true,
                    good: false,
                    speed: 1.25,
                    xPos: 120,
                    yPos: 100,
                },
                {
                    name: "Неон",
                    active: true,
                    good: false,
                    speed: 1,
                    xPos: 600,
                    yPos: 220,
                },
            ],
            good: ["Li",
                "Fe",
                "Ag",
                "Au",
                "Pb",
                "W",
                "Al"],
            bad: ["H", "N", "Ne", "He", "Cl", "Ar", "Se"],
        },
        {
            id: 3,
            record: 0,
            done: false,
            close: true,
            history: [],
            name: 'Газы. Часть 1',
            stars: [{ active: true }, { active: true }, { active: false }],
            theory: [
            ],
        },
        {
            id: 4,
            record: 0,
            done: false,
            close: true,
            history: [],
            name: 'Газы. Часть 2',
            stars: [{ active: true }, { active: true }, { active: false }],
            theory: [
            ],
        },
        {
            id: 5,
            record: 0,
            done: false,
            close: true,
            history: [],
            name: 'Оксиды. Часть 1',
            stars: [{ active: true }, { active: true }, { active: false }],
            theory: [
            ],
        },
        {
            id: 6,
            record: 0,
            done: false,
            close: true,
            history: [],
            name: 'Оксиды. Часть 2',
            stars: [{ active: true }, { active: true }, { active: true }],
            theory: [
            ],
        },
        {
            id: 7,
            record: 0,
            done: false,
            close: true,
            history: [],
            name: 'Кислоты. Часть 1',
            stars: [{ active: true }, { active: true }, { active: false }],
            theory: [
            ],
        },
        {
            id: 8,
            record: 0,
            done: false,
            close: true,
            history: [],
            name: 'Кислоты. Часть 2',
            stars: [{ active: true }, { active: true }, { active: true }],
            theory: [
            ],
        }
    ]

})

export const getters = {
    getLevels(state) {
        return state.levels;
    },
    getLevelsLen(state) {
        return state.levels.length;
    }
}

export const mutations = {
    SET_DONE(state, data) {
        state.levels.forEach(element => {
            if (Number(element.id) == Number(data.id)) {
                element.done = true;
                element.record = Number(data.score);
            }
            if (Number(element.id) == (Number(data.id) + 1)) {
                element.close = false;
            }
        });
    },
    SET_RECORD(state, data) {
        let level = state.find(x => { return x.id == data.id });
        if (Number(level.record) < Number(data.score)) {
            level.record = Number(data.score);
        }
    }
}

export const actions = {
    async DONE_LEVEL({ commit, state }, data) {
        commit('SET_DONE', data);
    },
    async RECORD_LEVEL({ commit, state }, data) {
        commit('SET_RECORD', data);
    },
}
