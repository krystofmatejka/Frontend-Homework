export const homePageTranslations = {
  'en': {
    home: {
      title: 'Shopping Lists',
      loading: 'Loading...',
    },
    archiveButton: {
      archive: 'Archive',
      unarchive: 'Unarchive',
    },
    archiveToggle: {
      showAll: 'Show All',
      showActive: 'Show Active Only',
    },
    newList: {
      newList: 'New List',
      createNewShoppingList: 'Create New Shopping List',
      listName: 'List Name',
      members: 'Members',
      multiselect: 'Hold Ctrl/Cmd to select multiple members',
      cancel: 'Cancel',
      createList: 'Create List',
      creating: 'Creating...',
    }
  }
} as const;

export type Translation = typeof homePageTranslations[keyof typeof homePageTranslations];