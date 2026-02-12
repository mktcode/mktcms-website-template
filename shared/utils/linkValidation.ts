const linkPattern = /https?\s*:|www\s*\./i

export const linkErrorMessage = 'Links sind in diesem Formular nicht erlaubt.'

export const disallowLinks = (value: string) => !linkPattern.test(value)
