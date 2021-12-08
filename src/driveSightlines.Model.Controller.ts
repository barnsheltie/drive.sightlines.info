/**
 * 
 */
import { Injectable } from 'graphql-modules';

import debug from 'debug';
const debugLog: debug.IDebugger = process.env.NODE_ENV === 'debug' ? debug('googleSight.neo4j.provider') : debug('');

import { ne04jClass } from './helpers/ne04j.helper'

/**
 *  Off the ne04j based provider service
 */
@Injectable()
export class neo4jAuraProviderService extends ne04jClass  {

  async addFolder(node1Name: string, nType: string = 'FOLDER') {
    const aQ = `MERGE (p1:${nType} { name: $node1Name })
                RETURN p1`;
    const writeResult = await this.session.writeTransaction(tx =>
      tx.run(aQ, { node1Name })
    )
    writeResult.records.forEach(record => {
      const person1Node = record.get('p1')
      console.log(
        `Found: ${person1Node.properties.name}`
      )
    })
    return 'ok'
  }

        // Write transactions allow the driver to handle retries and transient errors
  constructor() {
    super();
    console.log('connected to Ne04j')

  }
}
