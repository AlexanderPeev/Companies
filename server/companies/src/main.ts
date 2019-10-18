import {Rest} from "./rest/rest";
import {StorageEngine} from "./storage/storage.engine";
const execFile = require("child_process").execFile;

export class Main {
    public main(): void {
        const clientDir = process.argv[2];
        const port = parseInt(process.argv[3], 10);
        const dbStart = process.argv[4] || null;
        console.log('Setting up REST interfaces with client dir: ' + clientDir);

        if(dbStart) {
            execFile(dbStart);
        }
        new StorageEngine().prepare().then(storage => new Rest().setup(clientDir, storage, port)).catch(e => {
            console.error(e);
        });
    }
}


new Main().main();
