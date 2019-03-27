export function generateTitle (title) {
    const hasKey = this.$te('m.' + title);
    const translateTitle = this.$t('m.' + title);

    if (hasKey) {
        return translateTitle
    }
    return title
}