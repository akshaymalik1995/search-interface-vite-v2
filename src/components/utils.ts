import { Filter, Result } from "../types"

export function createFiltersFromResults(results: Result[]): Filter[] {
    const filters = results.reduce((acc, result) => {
        result.ingredients.forEach(ingredient => {
            const existingFilter = acc.find(filter => filter.title === ingredient)
            if (existingFilter) {
                existingFilter.count++
            } else {
                acc.push({ id: acc.length + 1, title: ingredient, count: 1 })
            }
        })
        return acc
    }, [] as Filter[])
    return filters
}