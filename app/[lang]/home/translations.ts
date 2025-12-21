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
    },
    shoppingLists: {
      noLists: 'No shopping lists available.',
      activeItems: 'Active items',
      totalItems: 'Total items',
      owner: 'Owner',
      youBadge: 'You',
    }
  },
  'cs': {
    home: {
      title: 'Nákupní seznamy',
      loading: 'Načítání...',
    },
    archiveButton: {
      archive: 'Archivovat',
      unarchive: 'Odarchivovat',
    },
    archiveToggle: {
      showAll: 'Zobrazit vše',
      showActive: 'Zobrazit pouze aktivní',
    },
    newList: {
      newList: 'Nový seznam',
      createNewShoppingList: 'Vytvořit nový nákupní seznam',
      listName: 'Název seznamu',
      members: 'Členové',
      multiselect: 'Podržte Ctrl/Cmd pro výběr více členů',
      cancel: 'Zrušit',
      createList: 'Vytvořit seznam',
      creating: 'Vytváření...',
    },
    shoppingLists: {
      noLists: 'Nejsou k dispozici žádné nákupní seznamy.',
      activeItems: 'Aktivní položky',
      totalItems: 'Celkem položek',
      owner: 'Vlastník',
      youBadge: 'Vy',
    }
  },
  'de': {
    home: {
      title: 'Einkaufslisten',
      loading: 'Laden...',
    },
    archiveButton: {
      archive: 'Archivieren',
      unarchive: 'Entarchivieren',
    },
    archiveToggle: {
      showAll: 'Alle anzeigen',
      showActive: 'Nur aktive anzeigen',
    },
    newList: {
      newList: 'Neue Liste',
      createNewShoppingList: 'Neue Einkaufsliste erstellen',
      listName: 'Listenname',
      members: 'Mitglieder',
      multiselect: 'Halten Sie Strg/Cmd, um mehrere Mitglieder auszuwählen',
      cancel: 'Abbrechen',
      createList: 'Liste erstellen',
      creating: 'Wird erstellt...',
    },
    shoppingLists: {
      noLists: 'Keine Einkaufslisten verfügbar.',
      activeItems: 'Aktive Artikel',
      totalItems: 'Gesamtanzahl Artikel',
      owner: 'Eigentümer',
      youBadge: 'Sie',
    }
  }
} as const;

export type Translation = typeof homePageTranslations[keyof typeof homePageTranslations];