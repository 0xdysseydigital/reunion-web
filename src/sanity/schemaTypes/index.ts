import { type SchemaTypeDefinition } from 'sanity'
import { menuItemType } from './menuItem'
import { eventType } from './event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuItemType, eventType],
}
