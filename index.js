function getPath(element) {
    let tags = [];
    while (element.tagName !== 'HTML') {
        if (element.hasAttribute('id')) {
            tags.push(`#${element.id}`);
        } else if (element.hasAttribute('class') && element.className) {
            tags.push('.' + element.className.split(' ').join('.'))
        } else {
            tags.push(element.tagName.toLowerCase());
        }
        element = element.parentElement
    }
    tags = tags.reverse()
    path = tags.join(' ')
    return document.querySelectorAll(path) > 0 ? null : path
}
