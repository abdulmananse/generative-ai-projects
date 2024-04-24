"use client"

import { create } from 'zustand';

const useTodoStore = create((set) => ({
    tasks: []
}));

export default useTodoStore;