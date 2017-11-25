export default function escapeHtmlTags(text) {
    const specialEntities = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;"
    };
    const textToSanitize = text.split("");
    const sanitizedText = textToSanitize.map((char) => {
        if (char in specialEntities) {
            return specialEntities[char];
        }

        return char;
    }).join("");

    return sanitizedText;
}
