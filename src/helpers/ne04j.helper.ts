/**
 * 
 */

import  neo4j, { Driver, Session } from 'neo4j-driver'

/**
NEO4J_URL= 'neo4j+s://14af9728.databases.neo4j.io'
NEO4J_USER='neo4j'
NEO4J_PASSWORD="ZMxpWkVvBWaExErcyFToDwXs3ljadgVB35PGODX3esw"
*/

/**
 * 
 */
export class ne04jClass {
  driver: Driver ;
  session: Session;
  sig:  string;

  /**
   * 
   */
  constructor (sig: string = 'ThisIsNeo4jSig') {
    this.sig = sig;
    this.driver = neo4j.driver(<string>process.env.NEO4J_URL, neo4j.auth.basic(<string> process.env.NEO4J_USER, <string> process.env.NEO4J_PASSWORD))
    this.session = this.driver.session();
  }
}


/**
(async() => {
    const neo4j = require('neo4j-driver')
    

    
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session = driver.session()
   
    const person1Name = 'Alice'
    const person2Name = 'David'
   
    try {
      // To learn more about the Cypher syntax, see https://neo4j.com/docs/cypher-manual/current/
      // The Reference Card is also a good resource for keywords https://neo4j.com/docs/cypher-refcard/current/
      const writeQuery = `MERGE (p1:Person { name: $person1Name })
                          MERGE (p2:Person { name: $person2Name })
                          MERGE (p1)-[:KNOWS]->(p2)
                          RETURN p1, p2`
   
      // Write transactions allow the driver to handle retries and transient errors
      const writeResult = await session.writeTransaction(tx =>
        tx.run(writeQuery, { person1Name, person2Name })
      )
      writeResult.records.forEach(record => {
        const person1Node = record.get('p1')
        const person2Node = record.get('p2')
        console.log(
          `Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`
        )
      })
   
      const readQuery = `MATCH (p:Person)
                         WHERE p.name = $personName
                         RETURN p.name AS name`
      const readResult = await session.readTransaction(tx =>
        tx.run(readQuery, { personName: person1Name })
      )
      readResult.records.forEach(record => {
        console.log(`Found person: ${record.get('name')}`)
      })
    } catch (error) {
      console.error('Something went wrong: ', error)
    } finally {
      await session.close()
    }
   
    // Don't forget to close the driver connection when you're finished with it
    await driver.close()
   })();

   */