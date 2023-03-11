// interface JsonResult {
// 	key: number,
// 	value: string
// }

interface JsonResult {
	description: string
}

interface SuggestionsProps {
	searchTerm: string
	list: JsonResult[]
	onSugestionClick(value: string): void
}

interface ListItemProps {
	itemValue: string
}