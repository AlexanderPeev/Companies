import "jasmine";
import {Main} from "../src/main";

describe("Main", () => {
    it("can create", () => {
        expect(new Main()).toBeTruthy();
    });
});
