/**
 * JOTAI STATE MANAGEMENT STORE
 */

import { atom } from 'jotai';

export const userAtom = atom(null);
export const flashcardsAtom = atom([]);
export const flippedCardsAtom = atom({});
