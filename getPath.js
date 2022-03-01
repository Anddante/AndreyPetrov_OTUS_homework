module.exports = function getPath(element) {
    let tags = []
    let Selector
    if (!(element instanceof Element)) {
        throw new TypeError('Expected a valid DOM element as an argument')
    }

    while (element.tagName !== 'HTML') {
        if (element.id.length > 0) {
            tags.unshift(`#${element.id}`)
            break
        }
        Selector = element.tagName.toLowerCase()
        let classSelector = Array.prototype.join.call(element.classList, '.')
        if (classSelector.length > 0) {
            Selector += `.${classSelector}`
        }

        let childElementCount = element.parentNode.childElementCount
        if (childElementCount > 1 && element.tagName !== 'BODY') {
            let elemPosition = Array.prototype.indexOf.call(element.parentNode.children, element) + 1
            if (elemPosition === 1) {
                Selector += ':first-child'
            } else if (elemPosition === childElementCount) {
                Selector += ':last-child'
            } else {
                Selector += `:nth-child(${elemPosition})`
            }
        }
        tags.unshift(Selector)
        element = element.parentNode
    }
    return tags.join(' ')
}
