export interface Change {
    old_val: any;
    new_val: any;
}

export interface ChangesResult {
    changes: Change[];
}
