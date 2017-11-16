export default function closestParentClass(elm, elmClass) {
    let parent = elm;
    for(; parent && parent !== document.body; parent = parent.parentNode) {
        if (parent.classList.contains(elmClass)) {
            return parent;
        }
    }
    return false;
}
