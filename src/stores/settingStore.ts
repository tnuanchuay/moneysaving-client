import { create } from 'zustand';
import {HomeFilter, TimeRange} from "../app/common";

interface AppSettingContext {
    homePageRange: TimeRange,
    setHomePageRange: (range: TimeRange) => void
    homePageFilter: HomeFilter,
    setHomePageFilter: (filter: HomeFilter) => void
}

export const appSettingContext = create<AppSettingContext>((set) => ({
    homePageRange: "This week",
    setHomePageRange: (range: TimeRange) => set({ homePageRange: range }),
    homePageFilter: "All",
    setHomePageFilter: (filter: HomeFilter) => set({ homePageFilter: filter })
}))