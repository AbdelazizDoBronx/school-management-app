import { createSlice } from '@reduxjs/toolkit';

// Redux slice for sidebar
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false,
    items: [
      {
        label: 'Home',
        icon: 'Home',
        href: '/',
        isActive: true,
      },
      {
        label: 'Courses',
        icon: 'BookOpen',
        href: '/courses',
        count: 24,
        badge: 'New',
      },
      {
        label: 'Quiz',
        icon: 'BookOpenCheck',
        href: '/quizlist',
        count: 24,
        badge: 'New', 
      },
      {
        label: 'Schedule',
        icon: 'Calendar',
        href: '/schedule',
        count: 12,
      },
      {
        label: 'Reports',
        icon: 'BarChart',
        href: '/reports',
        count: 4,
      },
      { type: 'divider' },
      {
        label: 'Documents',
        icon: 'FileText',
        href: '/request-document',
      },
      {
        label: 'Settings',
        icon: 'Settings',
        href: '/settings',
      },
    ],
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    activateItem: (state, action) => {
      state.items.forEach((item) => {
        item.isActive = item.label === action.payload;
      });
    },
    updateQuizBadge: (state, action) => {
      const quizItem = state.items.find(item => item.label === 'Quiz');
      if (quizItem) {
        quizItem.badge = action.payload.badge;
        quizItem.count = action.payload.count;
      }
    },
  },
});

export const { toggleSidebar, closeSidebar, activateItem, updateQuizBadge } = sidebarSlice.actions;
export default sidebarSlice.reducer;
