import { type SchemaTypeDefinition } from 'sanity'
import { menuItemType } from './menuItem'
import { menuSectionType } from './menuSection'
import { eventType } from './event'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuItemType, menuSectionType, eventType, siteSettingsType],
}
