import { create } from 'zustand';

export const useThemeStore = create((set, get) => ({
    // state
    isDark: false,

    toggleTheme: () => {
        const nowIsDark = !get().isDark;

        if (nowIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        // update state
        set({ isDark: nowIsDark });
    },

    // initialize theme
    initTheme: () => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches; // trick of "intuition"
        const isDark = saved === 'dark' || (!saved && prefersDark);

        if (isDark)
            document.documentElement.classList.add('dark');

        set({ isDark });
    }
}));

// automatically initialize this on load
if (typeof window !== 'undefined') {
    useThemeStore.getState().initTheme();
}