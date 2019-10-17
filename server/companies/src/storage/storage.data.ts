import {Connection, Db, Table} from 'rethinkdb';

export interface StorageData {
    connection: Connection;
    database: Db;
    table: Table;
}
