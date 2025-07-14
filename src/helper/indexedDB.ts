// src/indexedDb.ts
import { openDB } from 'idb';
import { Friend } from '../components/FriendList';

const dbName = 'FriendDB';
const storeName = 'friends';

const initDB = async () => {
    return openDB(dbName, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const addFriend = async (friend: { name: string; phone: string }) => {
    const db = await initDB();
    return db.add(storeName, friend);
};

export const getAllFriends = async (): Promise<any[]> => {
    const db = await initDB();
    return db.getAll(storeName);
};

export const deleteFriend = async (id: string) => {
    const db = await initDB();
    return db.delete(storeName, id);
};

export const getFriendCount = async () => {
    const db = await initDB();
    return db.count(storeName);
}

export const updateFriend = async (updatedItem: Friend) => {
    const db = await initDB();
    return db.put(storeName, updatedItem);
}