export interface Result {
    id: number,
    title: string,
    source: string,
    ingredients: string[],
    directions: string[],
}

export interface Filter {
    id: number,
    title: string,
    count: number,
}