import { type SchemaTypeDefinition } from 'sanity'
import {archiveEntry} from './archiveEntry'
import {voice} from './voice'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [voice, archiveEntry],
}
