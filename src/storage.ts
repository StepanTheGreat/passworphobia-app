const hasStorage: boolean = typeof(Storage) !== "undefined";

export function loadItem(key: string): string {
    if (hasStorage) {
        return localStorage.getItem(key);
    } else {
        ""
    }
}

export function setItem(key: string, value: string) {
    if (hasStorage) {
        localStorage.setItem(key, value);
    }
}