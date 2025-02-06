import Signal from './signal'
import { Filter, Result } from './types'
export const $results: Signal<Result[]> = new Signal<Result[]>([])
export const $filters: Signal<Filter[]> = new Signal<Filter[]>([])
export const $selectedFilters: Signal<string[]> = new Signal<string[]>([])
export const $isSearchOn: Signal<boolean> = new Signal<boolean>(false)
export const $suggestions: Signal<string[]> = new Signal<string[]>([])