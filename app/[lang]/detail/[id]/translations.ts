export const detailPageTranslations = {
  'en': {
    layout: {
      title: 'Shopping List',
    },
    loading: 'Loading...',
    error: {
      title: 'Something went wrong.',
      tryAgain: 'Try again',
    },
    notFound: {
      title: 'Item Not Found',
      message: 'The item you are looking for does not exist.',
    },
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
    stats: {
      title: 'Items Statistics',
      completed: 'Completed',
      notCompleted: 'Not Completed',
    },
  },
  'cs': {
    layout: {
      title: 'Nákupní seznam',
    },
    loading: 'Načítání...',
    error: {
      title: 'Něco se pokazilo.',
      tryAgain: 'Zkusit znovu',
    },
    notFound: {
      title: 'Položka nenalezena',
      message: 'Položka, kterou hledáte, neexistuje.',
    },
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
    stats: {
      title: 'Statistika položek',
      completed: 'Dokončeno',
      notCompleted: 'Nedokončeno',
    },
  },
  'de': {
    layout: {
      title: 'Einkaufsliste',
    },
    loading: 'Laden...',
    error: {
      title: 'Etwas ist schief gelaufen.',
      tryAgain: 'Erneut versuchen',
    },
    notFound: {
      title: 'Artikel nicht gefunden',
      message: 'Der gesuchte Artikel existiert nicht.',
    },
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
    stats: {
      title: 'Artikelstatistik',
      completed: 'Abgeschlossen',
      notCompleted: 'Nicht abgeschlossen',
    },
  }
} as const;

export type DetailTranslation = typeof detailPageTranslations[keyof typeof detailPageTranslations];
