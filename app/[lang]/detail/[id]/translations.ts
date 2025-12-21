export const detailPageTranslations = {
  'en': {
    layout: {
      title: 'Shopping List',
    },
    loading: 'Loading...',
    newItem: {
      error: 'Error adding item.',
      success: 'Item "{itemName}" added!',
      placeholder: 'New item title',
      addButton: 'Add Item',
      adding: 'Adding...',
    },
    listHeader: {
      startEditing: 'Start editing',
      stopEditing: 'Stop editing',
      updating: 'Updating...',
      updateTitle: 'Update Title',
      updateMembers: 'Update Members',
      leaveList: 'Leave list',
      leaving: 'Leaving...',
    },
    activeFilter: {
      showAll: 'Show All Items',
      showActive: 'Show Active Items',
    },
    listItems: {
      removeItem: 'Remove Item',
    },
  },
  'cs': {
    layout: {
      title: 'Nákupní seznam',
    },
    loading: 'Načítání...',
    newItem: {
      error: 'Chyba při přidávání položky.',
      success: 'Položka "{itemName}" přidána!',
      placeholder: 'Název nové položky',
      addButton: 'Přidat položku',
      adding: 'Přidávání...',
    },
    listHeader: {
      startEditing: 'Začít úpravy',
      stopEditing: 'Ukončit úpravy',
      updating: 'Aktualizace...',
      updateTitle: 'Aktualizovat název',
      updateMembers: 'Aktualizovat členy',
      leaveList: 'Opustit seznam',
      leaving: 'Opouštění...',
    },
    activeFilter: {
      showAll: 'Zobrazit všechny položky',
      showActive: 'Zobrazit aktivní položky',
    },
    listItems: {
      removeItem: 'Odebrat položku',
    },
  },
  'de': {
    layout: {
      title: 'Einkaufsliste',
    },
    loading: 'Laden...',
    newItem: {
      error: 'Fehler beim Hinzufügen des Artikels.',
      success: 'Artikel "{itemName}" hinzugefügt!',
      placeholder: 'Neuer Artikeltitel',
      addButton: 'Artikel hinzufügen',
      adding: 'Wird hinzugefügt...',
    },
    listHeader: {
      startEditing: 'Bearbeitung starten',
      stopEditing: 'Bearbeitung beenden',
      updating: 'Wird aktualisiert...',
      updateTitle: 'Titel aktualisieren',
      updateMembers: 'Mitglieder aktualisieren',
      leaveList: 'Liste verlassen',
      leaving: 'Wird verlassen...',
    },
    activeFilter: {
      showAll: 'Alle Artikel anzeigen',
      showActive: 'Aktive Artikel anzeigen',
    },
    listItems: {
      removeItem: 'Artikel entfernen',
    },
  }
} as const;

export type DetailTranslation = typeof detailPageTranslations[keyof typeof detailPageTranslations];
