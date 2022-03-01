const getPath = require('./getPath.js')

describe('getPath', () => {
    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('throws error when called with invalid argument', () => {
        expect(() => getPath('')).toThrow()
    })

    it('returns valid selector', () => {
        let div = document.createElement('div')
        div.className = 'foo'
        let div2 = document.createElement('div')
        document.body.appendChild(div)
        document.body.appendChild(div2)

        let result = getPath(div)
        expect(() => document.querySelectorAll(result)).not.toThrow()
    })

    it('returns selector that gives single element', () => {
        let div = document.createElement('div')
        div.className = 'foo'
        let div2 = document.createElement('div')
        document.body.appendChild(div)
        document.body.appendChild(div2)

        let result = getPath(div)
        expect(document.querySelectorAll(result)).toHaveLength(1)
    })

    it('returns selector by id if id exists', () => {
        let div = document.createElement('div')
        div.className = 'foo'
        div.id = 'bar'
        let p = document.createElement('p')
        div.appendChild(p)
        document.body.appendChild(div)

        let result = getPath(p)
        expect(document.querySelector(result)).toBe(p)
    })

    it('handles multiple CSS classes correctly', () => {
        let div = document.createElement('div')
        div.className = 'foo bar'
        document.body.appendChild(div)

        let result = getPath(div)
        expect(document.querySelector(getPath(div))).toBe(div)
    })

    it('returns correct selector if element is first among siblings', () => {
        let ul = document.createElement('ul')
        let li1 = document.createElement('li')
        let li2 = document.createElement('li')
        ul.appendChild(li1)
        ul.appendChild(li2)
        document.body.appendChild(ul)

        let result = getPath(li1)
        expect(document.querySelector(result)).toBe(li1)
        expect(result).toContain(':first-child')
    })

    it('returns correct selector if element is last among siblings', () => {
        let ul = document.createElement('ul')
        let li1 = document.createElement('li')
        let li2 = document.createElement('li')
        ul.appendChild(li1)
        ul.appendChild(li2)
        document.body.appendChild(ul)

        let result = getPath(li2)
        expect(document.querySelector(result)).toBe(li2)
        expect(result).toContain(':last-child')
    })

    it('returns correct selector if element is between first and last siblibg', () => {
        let ul = document.createElement('ul')
        let li1 = document.createElement('li')
        let li2 = document.createElement('li')
        let li3 = document.createElement('li')
        ul.appendChild(li1)
        ul.appendChild(li2)
        ul.appendChild(li3)
        document.body.appendChild(ul)

        let result = getPath(li2)
        expect(document.querySelector(result)).toBe(li2)
        expect(result).toContain(':nth-child(2)')
    })
})