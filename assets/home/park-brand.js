(() => {
  const section = document.getElementById('brand-in-park');
  if (!section) return;

  const dialog = section.querySelector('[data-park-photo-dialog]');
  const stage = section.querySelector('[data-park-photo-stage]');
  const title = section.querySelector('[data-park-photo-title]');
  const note = section.querySelector('[data-park-photo-note]');
  const closeButton = section.querySelector('[data-park-photo-close]');
  let returnFocus = null;

  const closeDialog = () => {
    if (dialog.open) dialog.close();
  };

  section.querySelectorAll('[data-park-photo]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      returnFocus = trigger;
      const preview = document.createElement('div');
      preview.className = 'park-photo-slot';
      preview.innerHTML = trigger.innerHTML;
      stage.replaceChildren(preview);
      title.textContent = trigger.dataset.photoTitle || 'Увеличенный просмотр';
      note.textContent = trigger.dataset.photoNote || '';
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => {
    stage.replaceChildren();
    returnFocus?.focus();
  });
})();
