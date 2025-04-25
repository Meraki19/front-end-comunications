function createElement(elementname,elementprops) {
    let el =document.createElement(elementname);
    Object.assign(el, elementprops)
    return el
}