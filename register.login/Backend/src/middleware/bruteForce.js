import expressBrute from 'express-brute';

// In-memory store for Brute Force protection
const memoryStore = new expressBrute.MemoryStore();
const bruteforce = new expressBrute(memoryStore, {
    freeRetries: 5,
    minWait: 5000,
    maxWait: 60000,
    lifetime: 3600,
});

export default bruteforce;
