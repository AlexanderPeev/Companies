import {StorageData} from "./storage.data";
import {connect, Connection, db, Db, dbCreate, dbList, Table} from 'rethinkdb';

const r = require('rethinkdb');

const databaseName = 'rethinkdb_ex';
const tableName = 'companies';

interface ConnectionAndDatabase {
    connection: Connection;
    database: Db;
}

export class StorageEngine {
    private connection: Connection | null = null;
    private database: Db | null = null;
    private table: Table | null = null;

    public prepare(): Promise<StorageData> {
        return this.connect().then(conn => this.createDatabaseIfMissing(conn)).then(conn => this.createTableIfMissing(conn)).then(data => this.getTable(data));
    }

    private connect(): Promise<Connection> {
        return connect({
            host: 'localhost',
            port: 28015,
            db: 'rethinkdb_ex'
        }).then(connection => {
            this.connection = connection;
            return connection;
        });
    }

    private createDatabaseIfMissing(connection: Connection): Promise<Connection> {
        return dbList().run(connection).then((databases: string[]) => {
            if (databases.some(element => element === databaseName)) {
                return Promise.resolve(connection);
            } else {
                return dbCreate(databaseName).run(connection).then(() => Promise.resolve(connection));
            }
        });
    }

    private createTableIfMissing(connection: Connection): Promise<ConnectionAndDatabase> {
        connection.use(databaseName);
        const database: Db = db(databaseName);
        this.database = database;
        return database.tableList().run(connection).then((tables: string[]) => {
            if (tables.some(element => element === tableName)) {
                return Promise.resolve({connection, database});
            } else {
                return database.tableCreate(databaseName).run(connection).then(() => Promise.resolve({connection, database}));
            }
        });
    }

    private getTable(data: ConnectionAndDatabase): StorageData {
        const connection = data.connection;
        const database: Db = data.database;
        const table = database.table(tableName);
        this.table = table;
        return {connection, database, table};
    }
}
