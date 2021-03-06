import {Rest} from "./rest/rest";
import {StorageEngine} from "./storage/storage.engine";
const execFile = require("child_process").execFile;

export class Main {
    public main(): void {
        const clientDir = process.argv[2] + '';
        const port = parseInt(process.env.PORT || '8081', 10);
        const dbStart = process.argv[3] || null;
        let started = false;
        console.log('Setting up REST interfaces with client dir: ' + clientDir);

        if(dbStart) {
            console.log('Starting DB: ' + dbStart);
            const dbProcess = execFile(dbStart);
            dbProcess.stdout.on('data', (data: any) => {
                console.log('DB stdout: ' + data);
                if(data.indexOf('Server ready') !== -1) {
                    if(!started) {
                        this.startRestService(clientDir, port);
                        started = true;
                    }
                }
            });
            dbProcess.stderr.on('data', (data: any) => {
                console.log('DB stderr: ' + data);
            });
        } else {
            this.startRestService(clientDir, port);
        }
    }

    private startRestService(clientDir: string, port: number): void {
        console.log('Starting REST Service and Client: ' + clientDir);
        new StorageEngine().prepare().then(storage => new Rest().setup(clientDir, storage, port)).catch(e => {
            console.error(e);
        });
    }
}


new Main().main();
