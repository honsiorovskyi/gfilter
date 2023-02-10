const { config } = require('./config')
const { create } = require('xmlbuilder2')

class Filter {
    constructor(config) {
        this.feed = create({version: '1.0', encoding: 'UTF-8'})
            .ele('feed', {
                'xmlns': 'http://www.w3.org/2005/Atom',
                'xmlns:apps': 'http://schemas.google.com/apps/2006'
            })

        if (!config) {
            return
        }

        for (let label in config) {
            this.add(label, config[label])
        }
    }

    add(label, options) {
        options = {
            ...options,
            from: options.from === undefined ? `*@${label}` : options.from,
        }

        let entry = this.feed.ele('entry')
        entry.ele('category', {term: 'filter'}).up()
            
        if (options.from) {
            entry.ele('apps:property', {name: 'from', value: options.from}).up()
        }
            
        if (options.match) {
            entry.ele('apps:property', {name: 'hasTheWord', value: options.match}).up()
        }

        if (options.neMatch) {
            entry.ele('apps:property', {name: 'doesNotHaveTheWord', value: options.neMatch}).up()
        }

        entry.ele('apps:property', {name: 'label', value: label}).up()
        entry.ele('apps:property', {name: 'shouldArchive', value: options.archive === false ? 'false' : 'true'}).up()
        entry.ele('apps:property', {name: 'shouldMarkAsRead', value: options.read === true ? 'true' : 'false'}).up()
        entry.up()

        if (options.labels) {
            for (let sublabel in options.labels) {
                this.add(`${label}/${sublabel}`, {
                    from: options.from,
                    match: options.match,
                    neMatch: options.neMatch,
                    ...options.labels[sublabel]
                })
            }
        }
    }

    end() {
        return this.feed.end({prettyPrint: true})
    }
}

console.log(new Filter(config).end())
